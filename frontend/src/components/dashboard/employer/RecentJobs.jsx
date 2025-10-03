import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Badge,
  Box,
  useColorModeValue,
  Spinner,
  useToast,
  Icon,
  Tooltip
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HiRefresh, HiEye, HiCalendar, HiUsers } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { jobManagementAPI } from '../../../services/api';

const JobCard = ({ job, onRefresh }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently posted';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Negotiable';
    return `₱${salary.toLocaleString()}`;
  };

  return (
    <Box 
      w="full" 
      p={4} 
      bg="gray.50" 
      borderRadius="xl" 
      border="1px" 
      borderColor="gray.100"
      _hover={{
        bg: 'gray.100',
        transform: 'translateY(-1px)',
        boxShadow: 'sm'
      }}
      transition="all 0.2s ease"
    >
      <VStack spacing={3} align="stretch">
        {/* Job Title and Basic Info */}
        <HStack justify="space-between" align="start">
          <VStack align="start" spacing={1} flex={1}>
            <Text fontWeight="semibold" color="gray.800" noOfLines={1}>
              {job.title}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {job.jobType} • {job.location}
            </Text>
          </VStack>
          <Badge 
            colorScheme="green"
            variant="subtle"
            fontSize="xs"
          >
            Active
          </Badge>
        </HStack>

        {/* Stats Row */}
        <HStack spacing={4} fontSize="xs" color="gray.500">
          <HStack spacing={1}>
            <Icon as={HiUsers} />
            <Text>{job.applicationCount || 0} applications</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={HiCalendar} />
            <Text>{formatDate(job.createdAt)}</Text>
          </HStack>
        </HStack>

        {/* Action Button */}
        <HStack justify="space-between" align="center">
          <Text fontSize="xs" color="green.600" fontWeight="medium">
            {formatSalary(job.salary)}
          </Text>
          <Button 
            as={Link}
            to={`/employer/jobs/${job.id}`}
            size="xs" 
            colorScheme="blue"
            variant="outline"
            _hover={{
              transform: 'scale(1.05)'
            }}
          >
            Manage
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

const RecentJobs = ({ refreshTrigger = 0 }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  // ✅ Fetch recent jobs from database
  const fetchRecentJobs = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      console.log('📋 Fetching recent jobs...');
      const response = await jobManagementAPI.getRecentEmployerJobs();
      console.log('✅ Recent jobs fetched:', response);
      
      setJobs(response);

      if (isRefresh) {
        toast({
          title: 'Jobs refreshed',
          description: `Updated ${response.length} recent jobs`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }

    } catch (error) {
      console.error('❌ Error fetching recent jobs:', error);
      toast({
        title: 'Error fetching recent jobs',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ✅ Fetch on component mount
  useEffect(() => {
    fetchRecentJobs();
  }, []);

  // ✅ Refresh when external trigger changes (e.g., new job posted)
  useEffect(() => {
    if (refreshTrigger > 0) {
      fetchRecentJobs(true);
    }
  }, [refreshTrigger]);

  // ✅ Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRecentJobs(true);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    fetchRecentJobs(true);
  };

  if (loading) {
    return (
      <Card bg={cardBg} w="full" borderRadius="2xl">
        <CardBody p={8} textAlign="center">
          <VStack spacing={3}>
            <Spinner size="md" color="blue.500" />
            <Text fontSize="sm" color="gray.500">Loading recent jobs...</Text>
          </VStack>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card bg={cardBg} w="full" borderRadius="2xl">
      <CardHeader>
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
          <Heading size="md" color={textColor}>
            Recent Job Posts
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Your latest {jobs.length} job listings {/* This will show "3" when you have jobs */}
          </Text>
        </VStack>
          <HStack spacing={2}>
            <Tooltip label="Refresh jobs" hasArrow>
              <Button
                onClick={handleManualRefresh}
                variant="ghost"
                size="sm"
                isLoading={refreshing}
                _hover={{
                  transform: 'rotate(90deg)'
                }}
                transition="transform 0.2s ease"
              >
                <HiRefresh />
              </Button>
            </Tooltip>
            <Button
              as={Link}
              to="/employer/jobs"
              variant="ghost"
              colorScheme="blue"
              size="sm"
              _hover={{
                transform: 'translateX(2px)'
              }}
            >
              View All
            </Button>
          </HStack>
        </HStack>
      </CardHeader>
      
      <CardBody pt={0}>
        <VStack spacing={4}>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job}
                onRefresh={handleManualRefresh}
              />
            ))
          ) : (
            <Box 
              w="full" 
              p={8} 
              textAlign="center" 
              bg="gray.50" 
              borderRadius="xl"
              border="2px dashed"
              borderColor="gray.200"
            >
              <VStack spacing={3}>
                <Text fontSize="2xl">📝</Text>
                <Text color="gray.500" fontWeight="medium">
                  No job posts yet
                </Text>
                <Text fontSize="sm" color="gray.400">
                  Create your first job posting to get started
                </Text>
                <Button
                  as={Link}
                  to="/employer/post-job"
                  mt={2}
                  size="sm"
                  colorScheme="blue"
                >
                  Post Your First Job
                </Button>
              </VStack>
            </Box>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    applicationCount: PropTypes.number,
    createdAt: PropTypes.string.isRequired,
    salary: PropTypes.number,
  }).isRequired,
  onRefresh: PropTypes.func
};

RecentJobs.propTypes = {
  refreshTrigger: PropTypes.number
};

export default RecentJobs;