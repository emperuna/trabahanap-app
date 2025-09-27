import React, { useState, useEffect } from 'react';
import {
  Box, Container, VStack, HStack, Text, Button, useToast, 
  SimpleGrid, Heading, Card, CardBody, Badge, IconButton, 
  Menu, MenuButton, MenuList, MenuItem, Stat, StatLabel, 
  StatNumber, Divider, AlertDialog, AlertDialogBody, 
  AlertDialogFooter, AlertDialogHeader, AlertDialogContent, 
  AlertDialogOverlay, useDisclosure, Spinner, Input, 
  InputGroup, InputLeftElement
} from '@chakra-ui/react';
import { 
  HiPlus, HiDotsVertical, HiEye, HiPencil, HiTrash, 
  HiLocationMarker, HiCurrencyDollar, HiClock, HiUsers,
  HiSearch
} from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { jobManagementAPI } from '../../services/api';

const EmployerManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobToDelete, setJobToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployerJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm]);

  const fetchEmployerJobs = async () => {
    try {
      setLoading(true);
      const response = await jobManagementAPI.getEmployerJobs();
      setJobs(response);
    } catch (error) {
      toast({
        title: 'Error fetching jobs',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  const handleDeleteJob = async () => {
    if (!jobToDelete) return;

    try {
      await jobManagementAPI.deleteJob(jobToDelete.id);
      setJobs(prev => prev.filter(job => job.id !== jobToDelete.id));
      toast({
        title: 'Job Deleted',
        description: 'Job has been deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting job',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setJobToDelete(null);
      onClose();
    }
  };

  const confirmDelete = (job) => {
    setJobToDelete(job);
    onOpen();
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Not specified';
    return `₱${Number(salary).toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <Box minH="100vh" display="flex" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text color="gray.600">Loading your jobs...</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <>
      <Box minH="100vh" py={8}>
        <Container maxW="7xl">
          <VStack spacing={6} align="stretch">
            {/* Header */}
            <HStack justify="space-between" align="start" wrap="wrap">
              <VStack align="start" spacing={1}>
                <Heading size="lg">Manage Jobs</Heading>
                <Text color="gray.600">
                  Manage your {jobs.length} job postings and track applications
                </Text>
              </VStack>
              <Button 
                as={Link} 
                to="/employer/post-job" 
                colorScheme="blue" 
                leftIcon={<HiPlus />}
              >
                Post New Job
              </Button>
            </HStack>

            {/* Stats */}
            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
              <Card>
                <CardBody>
                  <Stat>
                    <StatLabel>Total Jobs</StatLabel>
                    <StatNumber color="blue.500">{jobs.length}</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody>
                  <Stat>
                    <StatLabel>Total Applications</StatLabel>
                    <StatNumber color="purple.500">
                      {jobs.reduce((sum, job) => sum + (job.applicationCount || 0), 0)}
                    </StatNumber>
                  </Stat>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Stat>
                    <StatLabel>Average Applications</StatLabel>
                    <StatNumber color="green.500">
                      {jobs.length > 0 
                        ? Math.round(jobs.reduce((sum, job) => sum + (job.applicationCount || 0), 0) / jobs.length)
                        : 0
                      }
                    </StatNumber>
                  </Stat>
                </CardBody>
              </Card>
            </SimpleGrid>

            {/* Search */}
            <Card>
              <CardBody>
                <HStack spacing={4}>
                  <InputGroup maxW="400px">
                    <InputLeftElement>
                      <HiSearch color="gray.400" />
                    </InputLeftElement>
                    <Input
                      placeholder="Search jobs by title or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                  <Badge colorScheme="blue" variant="outline" ml="auto">
                    {filteredJobs.length} of {jobs.length} jobs
                  </Badge>
                </HStack>
              </CardBody>
            </Card>

            {/* Jobs List */}
            {filteredJobs.length === 0 ? (
              <Card>
                <CardBody p={12}>
                  <VStack spacing={4} textAlign="center">
                    <Text fontSize="4xl">📝</Text>
                    <Heading size="md">
                      {jobs.length === 0 ? 'No Jobs Posted Yet' : 'No Matching Jobs'}
                    </Heading>
                    <Text color="gray.600" maxW="md" textAlign="center">
                      {jobs.length === 0
                        ? 'Start by posting your first job to attract talented candidates.'
                        : 'Try adjusting your search to find the jobs you\'re looking for.'
                      }
                    </Text>
                    {jobs.length === 0 && (
                      <Button 
                        as={Link} 
                        to="/employer/post-job" 
                        colorScheme="blue" 
                        size="lg"
                        leftIcon={<HiPlus />}
                      >
                        Post Your First Job
                      </Button>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            ) : (
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onDelete={confirmDelete}
                    formatSalary={formatSalary}
                    formatDate={formatDate}
                  />
                ))}
              </SimpleGrid>
            )}
          </VStack>
        </Container>
      </Box>

      {/* Delete Confirmation Dialog */}
      <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
        <AlertDialogOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
        <AlertDialogContent mx={4}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Job
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete <strong>"{jobToDelete?.title}"</strong>?
            <br /><br />
            <Text color="red.600" fontSize="sm">
              This action cannot be undone. All job data will be permanently removed.
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="red" onClick={handleDeleteJob} ml={3}>
              Delete Job
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

// Job Card Component
const JobCard = ({ job, onDelete, formatSalary, formatDate }) => {
  const navigate = useNavigate();

  return (
    <Card 
      borderRadius="xl" 
      shadow="sm"
      _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
      transition="all 0.3s ease"
    >
      <CardBody p={6}>
        <VStack spacing={4} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={1} flex={1}>
              <Heading size="md" noOfLines={2}>
                {job.title}
              </Heading>
              
              <HStack spacing={4} fontSize="sm" color="gray.600">
                <HStack spacing={1}>
                  <HiLocationMarker />
                  <Text>{job.location}</Text>
                </HStack>
                <HStack spacing={1}>
                  <HiCurrencyDollar />
                  <Text>{formatSalary(job.salary)}</Text>
                </HStack>
              </HStack>
            </VStack>

            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HiDotsVertical />}
                variant="ghost"
                size="sm"
              />
              <MenuList>
                <MenuItem 
                  icon={<HiEye />}
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  View Job
                </MenuItem>
                <MenuItem 
                  icon={<HiUsers />}
                  onClick={() => navigate(`/employer/applications?jobId=${job.id}`)}
                >
                  View Applications ({job.applicationCount || 0})
                </MenuItem>
                <Divider />
                <MenuItem 
                  icon={<HiTrash />}
                  color="red.500"
                  onClick={() => onDelete(job)}
                  isDisabled={job.applicationCount > 0}
                >
                  Delete Job
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>

          {/* Description */}
          <Text fontSize="sm" noOfLines={3}>
            {job.description}
          </Text>

          {/* Stats */}
          <HStack spacing={6} fontSize="sm" color="gray.600">
            <HStack spacing={1}>
              <HiUsers />
              <Text>{job.applicationCount || 0} applications</Text>
            </HStack>
            <HStack spacing={1}>
              <HiClock />
              <Text>Posted {formatDate(job.createdAt)}</Text>
            </HStack>
          </HStack>

          <Divider />

          {/* Footer Actions */}
          <HStack justify="space-between" align="center">
            <Badge colorScheme="blue" variant="outline">
              {job.jobType || 'Full-time'}
            </Badge>

            <HStack spacing={2}>
              <Button 
                size="sm" 
                colorScheme="blue"
                onClick={() => navigate(`/employer/applications?jobId=${job.id}`)}
              >
                View Applications
              </Button>
            </HStack>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default EmployerManageJobs;