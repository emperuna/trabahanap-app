import React, { useState, useEffect } from 'react';
import {
  Box, Container, VStack, HStack, Text, Button, Card, CardBody,
  Heading, Badge, useToast, SimpleGrid, Avatar, Divider,
  useColorModeValue, Table, Thead, Tbody, Tr, Th, Td,
  TableContainer, IconButton, useDisclosure
} from '@chakra-ui/react';
import { 
  HiEye, HiDocumentText, HiUser, HiMail, HiCalendar, HiDownload
} from 'react-icons/hi';
import { applicationsAPI } from '../../services/api';
import PDFViewerModal from '../../components/common/PDFViewerModal';

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [pdfTitle, setPdfTitle] = useState('');
  
  const { isOpen: pdfIsOpen, onOpen: pdfOnOpen, onClose: pdfOnClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
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

  const handleViewPDF = (applicationId, fileType, title) => {
    const token = localStorage.getItem('token');
    const pdfUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/applications/view/${applicationId}/${fileType}?Authorization=Bearer ${token}`;
    
    setSelectedPDF(pdfUrl);
    setPdfTitle(title);
    pdfOnOpen();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <Box minH="100vh" py={8}>
        <Container maxW="7xl">
          <VStack spacing={6} align="stretch">
            <Heading size="lg">Job Applications</Heading>

            {applications.length === 0 ? (
              <Card>
                <CardBody p={12} textAlign="center">
                  <Text fontSize="xl" color="gray.500">No applications yet</Text>
                </CardBody>
              </Card>
            ) : (
              <Card>
                <CardBody p={0}>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
                        <Tr>
                          <Th>Applicant</Th>
                          <Th>Job</Th>
                          <Th>Applied Date</Th>
                          <Th>Status</Th>
                          <Th>Documents</Th>
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {applications.map((application) => (
                          <Tr key={application.id}>
                            <Td>
                              <HStack spacing={3}>
                                <Avatar 
                                  size="sm" 
                                  name={application.applicantUsername}
                                />
                                <VStack align="start" spacing={0}>
                                  <Text fontWeight="medium">
                                    {application.applicantUsername}
                                  </Text>
                                  <Text fontSize="sm" color="gray.500">
                                    {application.applicantEmail}
                                  </Text>
                                </VStack>
                              </HStack>
                            </Td>
                            <Td>
                              <VStack align="start" spacing={0}>
                                <Text fontWeight="medium">{application.jobTitle}</Text>
                                <Text fontSize="sm" color="gray.500">
                                  {application.company}
                                </Text>
                              </VStack>
                            </Td>
                            <Td>{formatDate(application.appliedAt)}</Td>
                            <Td>
                              <Badge 
                                colorScheme={
                                  application.status === 'PENDING' ? 'orange' :
                                  application.status === 'ACCEPTED' ? 'green' : 'red'
                                }
                              >
                                {application.status}
                              </Badge>
                            </Td>
                            <Td>
                              <HStack spacing={2}>
                                {/* Resume Button */}
                                {application.resumePath && (
                                  <Button
                                    size="xs"
                                    variant="outline"
                                    colorScheme="blue"
                                    leftIcon={<HiDocumentText />}
                                    onClick={() => handleViewPDF(
                                      application.id, 
                                      'resume', 
                                      `${application.applicantUsername}'s Resume`
                                    )}
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
                                    leftIcon={<HiDocumentText />}
                                    onClick={() => handleViewPDF(
                                      application.id, 
                                      'cover-letter', 
                                      `${application.applicantUsername}'s Cover Letter`
                                    )}
                                  >
                                    Cover Letter
                                  </Button>
                                )}

                                {/* Show cover letter text if no PDF */}
                                {!application.coverLetterPath && application.coverLetter && (
                                  <Button
                                    size="xs"
                                    variant="outline"
                                    colorScheme="gray"
                                    leftIcon={<HiEye />}
                                    onClick={() => {
                                      // You can create a text modal for this
                                      alert(application.coverLetter);
                                    }}
                                  >
                                    Text
                                  </Button>
                                )}
                              </HStack>
                            </Td>
                            <Td>
                              <HStack spacing={2}>
                                <Button size="sm" colorScheme="green" variant="outline">
                                  Accept
                                </Button>
                                <Button size="sm" colorScheme="red" variant="outline">
                                  Reject
                                </Button>
                              </HStack>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </CardBody>
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
    </>
  );
};

export default EmployerApplications;