import React, { useState, useEffect } from 'react';
import {
  Box, Container, VStack, HStack, Text, Button, Card, CardBody,
  Heading, Badge, useToast, SimpleGrid, Avatar, Divider, Flex,
  useColorModeValue, Table, Thead, Tbody, Tr, Th, Td, IconButton,
  TableContainer, useDisclosure, Tag, Menu, MenuButton, MenuList,
  MenuItem, Stat, StatLabel, StatNumber, StatHelpText, Icon,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader,
  AlertDialogContent, AlertDialogOverlay, Spinner
} from '@chakra-ui/react';
import { 
  HiEye, HiDocumentText, HiUser, HiMail, HiCalendar, HiDownload,
  HiFilter, HiSearch, HiRefresh, HiChevronDown, HiOutlineEye,
  HiOutlineDocumentText, HiOutlineMail, HiCheck, HiX
} from 'react-icons/hi';
import { applicationsAPI } from '../../services/api';
import PDFViewerModal from '../../components/common/PDFViewerModal';
import EmployerApplicationActions from '../../components/employer-applications/EmployerApplicationActions';
import ApplicationStatusBadge from '../../components/applications/ApplicationStatusBadge';

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [pdfTitle, setPdfTitle] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState({});
  const [confirmAction, setConfirmAction] = useState(null);
  
  const { isOpen: pdfIsOpen, onOpen: pdfOnOpen, onClose: pdfOnClose } = useDisclosure();
  const { isOpen: confirmIsOpen, onOpen: confirmOnOpen, onClose: confirmOnClose } = useDisclosure();
  const toast = useToast();

  // Design system colors
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const primaryColor = '#153CF5';

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationsAPI.getEmployerApplications();
      setApplications(data);
    } catch (error) {
      toast({
        title: 'Error fetching applications',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Enhanced status update with optimistic UI updates
  const handleStatusUpdate = async (applicationId, newStatus, skipConfirmation = false) => {
    if (!skipConfirmation && (newStatus === 'ACCEPTED' || newStatus === 'REJECTED')) {
      setConfirmAction({
        applicationId,
        newStatus,
        applicantName: applications.find(app => app.id === applicationId)?.applicantUsername
      });
      confirmOnOpen();
      return;
    }

    try {
      setUpdatingStatus(prev => ({ ...prev, [applicationId]: true }));

      // Optimistic update - immediately update UI
      const previousApplications = [...applications];
      setApplications(prevApplications =>
        prevApplications.map(app =>
          app.id === applicationId
            ? { ...app, status: newStatus, updatedAt: new Date().toISOString() }
            : app
        )
      );

      // Make API call
      await applicationsAPI.updateApplicationStatus(applicationId, newStatus);

      // Show success toast
      const statusText = newStatus.toLowerCase();
      const applicant = previousApplications.find(app => app.id === applicationId);
      
      toast({
        title: `Application ${statusText}`,
        description: `${applicant?.applicantUsername}'s application has been ${statusText}.`,
        status: newStatus === 'ACCEPTED' ? 'success' : newStatus === 'REJECTED' ? 'warning' : 'info',
        duration: 4000,
        isClosable: true,
      });

      // Refresh data to ensure consistency (optional)
      setTimeout(() => {
        fetchApplications();
      }, 1000);

    } catch (error) {
      // Revert optimistic update on error
      setApplications(prevApplications =>
        prevApplications.map(app =>
          app.id === applicationId
            ? { ...app, status: applications.find(a => a.id === applicationId)?.status }
            : app
        )
      );

      toast({
        title: 'Error updating status',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setUpdatingStatus(prev => ({ ...prev, [applicationId]: false }));
      setConfirmAction(null);
      confirmOnClose();
    }
  };

  const handleConfirmAction = () => {
    if (confirmAction) {
      handleStatusUpdate(confirmAction.applicationId, confirmAction.newStatus, true);
    }
  };

  // Bulk status update
  const handleBulkStatusUpdate = async (applicationIds, newStatus) => {
    try {
      setLoading(true);
      
      // Optimistic update for multiple applications
      setApplications(prevApplications =>
        prevApplications.map(app =>
          applicationIds.includes(app.id)
            ? { ...app, status: newStatus, updatedAt: new Date().toISOString() }
            : app
        )
      );

      await Promise.all(
        applicationIds.map(id => applicationsAPI.updateApplicationStatus(id, newStatus))
      );

      toast({
        title: 'Bulk update successful',
        description: `${applicationIds.length} applications updated to ${newStatus.toLowerCase()}.`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      // Refresh data
      await fetchApplications();

    } catch (error) {
      toast({
        title: 'Bulk update failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      // Refresh to get correct state
      await fetchApplications();
    }
  };

  const handleViewPDF = async (applicationId, fileType, title) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: 'Authentication Error',
          description: 'Please log in to view documents',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const apiUrl = window.location.origin.includes('localhost') 
        ? 'http://localhost:8080' 
        : window.location.origin;
      
      const response = await fetch(`${apiUrl}/api/applications/view/${applicationId}/${fileType}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/pdf'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);
      
      setSelectedPDF(pdfUrl);
      setPdfTitle(title);
      pdfOnOpen();

    } catch (error) {
      console.error('Error loading PDF:', error);
      toast({
        title: 'Error loading PDF',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStats = () => {
    const total = applications.length;
    const pending = applications.filter(app => app.status === 'PENDING').length;
    const reviewed = applications.filter(app => app.status === 'REVIEWED').length;
    const accepted = applications.filter(app => app.status === 'ACCEPTED').length;
    const rejected = applications.filter(app => app.status === 'REJECTED').length;

    return { total, pending, reviewed, accepted, rejected };
  };

  const filteredApplications = statusFilter
    ? applications.filter(app => app.status === statusFilter)
    : applications;

  const stats = getStats();

  return (
    <>
      <Box bg={bgColor} minH="100vh">
        <Container maxW="8xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Header Section */}
            <Box>
              <VStack spacing={4} align="start">
                <HStack justify="space-between" w="full">
                  <VStack align="start" spacing={2}>
                    <Heading 
                      size="xl" 
                      color={textColor}
                      fontWeight="bold"
                    >
                      Job Applications
                    </Heading>
                    <Text color={mutedColor} fontSize="lg">
                      Manage and review candidate applications
                    </Text>
                  </VStack>
                  
                  <HStack spacing={3}>
                    <IconButton
                      icon={<HiRefresh />}
                      onClick={fetchApplications}
                      isLoading={loading}
                      colorScheme="blue"
                      variant="outline"
                      aria-label="Refresh applications"
                    />
                    <Menu>
                      <MenuButton as={Button} rightIcon={<HiChevronDown />} variant="outline">
                        <HStack spacing={2}>
                          <Icon as={HiFilter} />
                          <Text>Filter</Text>
                        </HStack>
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => setStatusFilter('')}>All Applications</MenuItem>
                        <MenuItem onClick={() => setStatusFilter('PENDING')}>Pending</MenuItem>
                        <MenuItem onClick={() => setStatusFilter('REVIEWED')}>Under Review</MenuItem>
                        <MenuItem onClick={() => setStatusFilter('ACCEPTED')}>Accepted</MenuItem>
                        <MenuItem onClick={() => setStatusFilter('REJECTED')}>Rejected</MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>
                </HStack>
              </VStack>
            </Box>

            {/* Stats Grid */}
            <SimpleGrid columns={{ base: 2, md: 5 }} spacing={6}>
              <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor}>
                <CardBody>
                  <Stat>
                    <StatLabel color={mutedColor} fontSize="sm">Total</StatLabel>
                    <StatNumber color={primaryColor} fontSize="2xl">{stats.total}</StatNumber>
                    <StatHelpText fontSize="xs">Applications</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>

              <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor}>
                <CardBody>
                  <Stat>
                    <StatLabel color={mutedColor} fontSize="sm">Pending</StatLabel>
                    <StatNumber color="orange.500" fontSize="2xl">{stats.pending}</StatNumber>
                    <StatHelpText fontSize="xs">Awaiting review</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>

              <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor}>
                <CardBody>
                  <Stat>
                    <StatLabel color={mutedColor} fontSize="sm">Reviewed</StatLabel>
                    <StatNumber color="blue.500" fontSize="2xl">{stats.reviewed}</StatNumber>
                    <StatHelpText fontSize="xs">Under review</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>

              <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor}>
                <CardBody>
                  <Stat>
                    <StatLabel color={mutedColor} fontSize="sm">Accepted</StatLabel>
                    <StatNumber color="green.500" fontSize="2xl">{stats.accepted}</StatNumber>
                    <StatHelpText fontSize="xs">Hired</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>

              <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor}>
                <CardBody>
                  <Stat>
                    <StatLabel color={mutedColor} fontSize="sm">Rejected</StatLabel>
                    <StatNumber color="red.500" fontSize="2xl">{stats.rejected}</StatNumber>
                    <StatHelpText fontSize="xs">Not selected</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </SimpleGrid>

            {/* Applications Table */}
            {loading ? (
              <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor}>
                <CardBody p={12} textAlign="center">
                  <VStack spacing={4}>
                    <Spinner size="xl" color={primaryColor} />
                    <Text fontSize="xl" color={mutedColor}>Loading applications...</Text>
                  </VStack>
                </CardBody>
              </Card>
            ) : filteredApplications.length === 0 ? (
              <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor}>
                <CardBody p={12} textAlign="center">
                  <VStack spacing={4}>
                    <Box
                      w={16}
                      h={16}
                      borderRadius="full"
                      bg={useColorModeValue('gray.100', 'gray.700')}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={HiDocumentText} color={mutedColor} boxSize={8} />
                    </Box>
                    <VStack spacing={2}>
                      <Text fontSize="xl" color={textColor} fontWeight="semibold">
                        {statusFilter ? 'No applications found' : 'No applications yet'}
                      </Text>
                      <Text color={mutedColor} textAlign="center">
                        {statusFilter 
                          ? `No applications with status "${statusFilter}" found.`
                          : 'Applications for your job postings will appear here.'
                        }
                      </Text>
                    </VStack>
                    {statusFilter && (
                      <Button
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => setStatusFilter('')}
                        size="sm"
                      >
                        Clear Filter
                      </Button>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            ) : (
              <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor} overflow="hidden">
                <Box p={6} borderBottom="1px" borderColor={borderColor}>
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                        Application Reviews
                      </Text>
                      <Text fontSize="sm" color={mutedColor}>
                        {filteredApplications.length} of {applications.length} applications
                        {statusFilter && ` (filtered by ${statusFilter})`}
                      </Text>
                    </VStack>
                    
                    {statusFilter && (
                      <Tag colorScheme="blue" borderRadius="full">
                        {statusFilter}
                      </Tag>
                    )}
                  </HStack>
                </Box>

                <TableContainer>
                  <Table variant="simple">
                    <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
                      <Tr>
                        <Th color={mutedColor} fontWeight="semibold" textTransform="none" fontSize="sm">
                          Candidate
                        </Th>
                        <Th color={mutedColor} fontWeight="semibold" textTransform="none" fontSize="sm">
                          Position
                        </Th>
                        <Th color={mutedColor} fontWeight="semibold" textTransform="none" fontSize="sm">
                          Applied
                        </Th>
                        <Th color={mutedColor} fontWeight="semibold" textTransform="none" fontSize="sm">
                          Status
                        </Th>
                        <Th color={mutedColor} fontWeight="semibold" textTransform="none" fontSize="sm">
                          Documents
                        </Th>
                        <Th color={mutedColor} fontWeight="semibold" textTransform="none" fontSize="sm">
                          Actions
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredApplications.map((application) => (
                        <Tr 
                          key={application.id} 
                          _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                          opacity={updatingStatus[application.id] ? 0.7 : 1}
                          transition="opacity 0.2s"
                        >
                          <Td py={4}>
                            <HStack spacing={3}>
                              <Avatar 
                                size="md" 
                                name={application.applicantUsername}
                                bg={primaryColor}
                                color="white"
                              />
                              <VStack align="start" spacing={1}>
                                <Text fontWeight="semibold" color={textColor} fontSize="sm">
                                  {application.applicantUsername}
                                </Text>
                                <HStack spacing={1}>
                                  <Icon as={HiOutlineMail} color={mutedColor} boxSize={3} />
                                  <Text fontSize="xs" color={mutedColor}>
                                    {application.applicantEmail}
                                  </Text>
                                </HStack>
                              </VStack>
                            </HStack>
                          </Td>
                          
                          <Td py={4}>
                            <VStack align="start" spacing={1}>
                              <Text fontWeight="semibold" color={textColor} fontSize="sm">
                                {application.jobTitle}
                              </Text>
                              <Text fontSize="xs" color={mutedColor}>
                                {application.company}
                              </Text>
                            </VStack>
                          </Td>
                          
                          <Td py={4}>
                            <VStack align="start" spacing={1}>
                              <Text fontSize="sm" color={textColor}>
                                {formatDate(application.appliedAt)}
                              </Text>
                              <HStack spacing={1}>
                                <Icon as={HiCalendar} color={mutedColor} boxSize={3} />
                                <Text fontSize="xs" color={mutedColor}>
                                  {Math.ceil((new Date() - new Date(application.appliedAt)) / (1000 * 60 * 60 * 24))} days ago
                                </Text>
                              </HStack>
                            </VStack>
                          </Td>
                          
                          <Td py={4}>
                            <HStack spacing={2}>
                              <ApplicationStatusBadge status={application.status} />
                              {updatingStatus[application.id] && (
                                <Spinner size="sm" color={primaryColor} />
                              )}
                            </HStack>
                          </Td>
                          
                          <Td py={4}>
                            <HStack spacing={2}>
                              {/* Resume Button */}
                              {application.resumePath && (
                                <Button
                                  size="xs"
                                  variant="outline"
                                  colorScheme="blue"
                                  leftIcon={<HiOutlineDocumentText />}
                                  onClick={() => handleViewPDF(
                                    application.id, 
                                    'resume', 
                                    `${application.applicantUsername}'s Resume`
                                  )}
                                  borderRadius="md"
                                  fontSize="xs"
                                  fontWeight="medium"
                                >
                                  Resume
                                </Button>
                              )}
                              
                              {/* Cover Letter Button */}
                              {application.coverLetterPath && (
                                <Button
                                  size="xs"
                                  variant="outline"
                                  colorScheme="purple"
                                  leftIcon={<HiOutlineDocumentText />}
                                  onClick={() => handleViewPDF(
                                    application.id, 
                                    'cover-letter', 
                                    `${application.applicantUsername}'s Cover Letter`
                                  )}
                                  borderRadius="md"
                                  fontSize="xs"
                                  fontWeight="medium"
                                >
                                  Cover Letter
                                </Button>
                              )}

                              {/* Text Cover Letter */}
                              {!application.coverLetterPath && application.coverLetter && (
                                <Button
                                  size="xs"
                                  variant="outline"
                                  colorScheme="gray"
                                  leftIcon={<HiOutlineEye />}
                                  onClick={() => {
                                    toast({
                                      title: 'Cover Letter',
                                      description: application.coverLetter,
                                      status: 'info',
                                      duration: 10000,
                                      isClosable: true,
                                    });
                                  }}
                                  borderRadius="md"
                                  fontSize="xs"
                                  fontWeight="medium"
                                >
                                  Text
                                </Button>
                              )}
                            </HStack>
                          </Td>
                          
                          <Td py={4}>
                            <HStack spacing={2}>
                              {/* Quick Accept/Reject Buttons */}
                              <Button
                                size="xs"
                                colorScheme="green"
                                variant="outline"
                                leftIcon={<HiCheck />}
                                onClick={() => handleStatusUpdate(application.id, 'ACCEPTED')}
                                isLoading={updatingStatus[application.id]}
                                isDisabled={application.status === 'ACCEPTED'}
                                borderRadius="md"
                                fontSize="xs"
                                fontWeight="medium"
                              >
                                Accept
                              </Button>
                              <Button
                                size="xs"
                                colorScheme="red"
                                variant="outline"
                                leftIcon={<HiX />}
                                onClick={() => handleStatusUpdate(application.id, 'REJECTED')}
                                isLoading={updatingStatus[application.id]}
                                isDisabled={application.status === 'REJECTED'}
                                borderRadius="md"
                                fontSize="xs"
                                fontWeight="medium"
                              >
                                Reject
                              </Button>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Card>
            )}
          </VStack>
        </Container>
      </Box>

      {/* PDF Viewer Modal */}
      <PDFViewerModal
        isOpen={pdfIsOpen}
        onClose={pdfOnClose}
        pdfUrl={selectedPDF}
        title={pdfTitle}
      />

      {/* Confirmation Dialog */}
      <AlertDialog
        isOpen={confirmIsOpen}
        onClose={confirmOnClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Action
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to {confirmAction?.newStatus?.toLowerCase()} {confirmAction?.applicantName}'s application?
              This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={confirmOnClose}>
                Cancel
              </Button>
              <Button 
                colorScheme={confirmAction?.newStatus === 'ACCEPTED' ? 'green' : 'red'} 
                onClick={handleConfirmAction} 
                ml={3}
              >
                {confirmAction?.newStatus === 'ACCEPTED' ? 'Accept' : 'Reject'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default EmployerApplications;