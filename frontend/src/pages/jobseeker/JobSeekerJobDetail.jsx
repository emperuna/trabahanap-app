import React, { useState, useEffect } from 'react';
import {
  Box, 
  Container, 
  VStack, 
  HStack, 
  Heading, 
  Text, 
  Button, 
  Badge, 
  Spinner, 
  useToast, 
  useColorModeValue, 
  Divider, 
  Card, 
  CardBody,
  Stack, 
  Icon, 
  Flex, 
  Grid, 
  GridItem, 
  Avatar, 
  useDisclosure
} from '@chakra-ui/react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  HiLocationMarker, 
  HiOfficeBuilding, 
  HiClock, 
  HiCurrencyDollar,
  HiUser, 
  HiArrowLeft, 
  HiHeart, 
  HiShare
} from 'react-icons/hi';
import { jobsAPI, applicationsAPI } from '../../services/api';
import ApplyNowCard from '../../components/jobs/ApplyNowCard';
import AboutCompanyCard from '../../components/jobs/AboutCompanyCard';
import JobDetailCard from '../../components/jobs/JobDetailCard';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    fetchJobDetail();
    checkApplicationStatus();
  }, [id]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      const response = await jobsAPI.getJobById(id);
      setJob(response);
    } catch (error) {
      toast({
        title: 'Error fetching job details',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const checkApplicationStatus = async () => {
    try {
      const applied = await applicationsAPI.checkApplication(id);
      setHasApplied(applied);
    } catch (error) {
      console.error('Error checking application status:', error);
    }
  };

  const handleApply = async () => {
    try {
      setApplying(true);
      await applicationsAPI.applyForJob(id, coverLetter);
      
      toast({
        title: 'Application Submitted!',
        description: 'Your application has been submitted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      setHasApplied(true);
      setCoverLetter('');
      onClose();
      
    } catch (error) {
      toast({
        title: 'Application Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setApplying(false);
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Salary not specified';
    return `₱${salary.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently posted';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <Box bg={bgColor} minH="100vh" display="flex" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="purple.500" />
          <Text color={mutedColor}>Loading job details...</Text>
        </VStack>
      </Box>
    );
  }

  if (!job) {
    return (
      <Box bg={bgColor} minH="100vh" display="flex" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="lg" color={mutedColor}>Job not found</Text>
          <Button onClick={() => navigate('/find-jobs')} colorScheme="purple">
            Back to Jobs
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="7xl">
        {/* View Other Jobs Button */}
        <Box mb={4}>
          <Button as={Link} to="/find-jobs" colorScheme="blue" variant="ghost" leftIcon={<HiArrowLeft />}>
            See all jobs
          </Button>
        </Box>
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          {/* Main Job Card */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              <JobDetailCard
                job={job}
                cardBg={cardBg}
                textColor={textColor}
                mutedColor={mutedColor}
                formatSalary={formatSalary}
                formatDate={formatDate}
              />
            </VStack>
          </GridItem>

          {/* Sidebar */}
          <GridItem display={{ base: 'none', lg: 'block' }}>
            <VStack spacing={8} align="stretch" position="sticky" top="8">
              <ApplyNowCard company={job.company} onApply={handleApply} />
              <AboutCompanyCard company={job.company} companyDescription={job.companyDescription} />
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default JobDetail;