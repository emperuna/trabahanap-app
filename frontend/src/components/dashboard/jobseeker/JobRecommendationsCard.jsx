import React, { useState, useEffect } from 'react';
import {
  Card,
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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { jobsAPI } from '../../../services/api';
// ✅ Add Poppins font imports
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

const JobRecommendationsCard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    fetchRecommendedJobs();
  }, []);

  const fetchRecommendedJobs = async () => {
    try {
      setLoading(true);
      const response = await jobsAPI.getAllJobs({ limit: 3 }); // Get latest 3 jobs
      setJobs(response.slice(0, 3)); // Limit to 3 jobs for the card
    } catch (error) {
      console.error('Error fetching recommended jobs:', error);
      toast({
        title: 'Error fetching job recommendations',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Salary not specified';
    if (salary >= 1000) {
      const salaryInK = Math.floor(salary / 1000);
      return `₱${salaryInK}K`;
    }
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
      <Card 
        bg={cardBg} 
        borderRadius="xl" 
        border="1px" 
        borderColor={borderColor} 
        w="full"
        fontFamily="'Poppins', sans-serif" // ✅ Apply Poppins font
      >
        <CardBody p={6}>
          <VStack spacing={4}>
            <Spinner color="blue.500" />
            <Text fontSize="sm" color={mutedColor}>Loading job recommendations...</Text>
          </VStack>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card 
      bg={cardBg} 
      borderRadius="xl" 
      border="1px" 
      borderColor={borderColor} 
      w="full"
      fontFamily="'Poppins', sans-serif" // ✅ Apply Poppins font to entire card
    >
      <CardBody p={6}>
        <HStack justify="space-between" mb={4}>
          <Heading size="md" color={textColor}>Recommended Jobs</Heading>
          <Badge colorScheme="green" variant="subtle" borderRadius="full">
            {jobs.length} Available
          </Badge>
        </HStack>
        
        <VStack spacing={4} align="stretch">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Box key={job.id} p={4} border="1px" borderColor={borderColor} borderRadius="lg">
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" fontWeight="semibold" color={textColor} noOfLines={1}>
                    {job.title}
                  </Text>
                  <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                    {job.jobType || 'Full-time'}
                  </Badge>
                </HStack>
                <Text fontSize="xs" color={mutedColor} mb={2}>
                  {job.company} • {job.location}
                </Text>
                <Text fontSize="xs" color={mutedColor} noOfLines={2} mb={3}>
                  {job.description}
                </Text>
                <HStack justify="space-between">
                  <Text fontSize="xs" color={mutedColor}>
                    {formatDate(job.createdAt)}
                  </Text>
                  <Button
                    as={Link}
                    to={`/jobs/${job.id}`}
                    size="xs"
                    colorScheme="blue"
                    variant="outline"
                    borderRadius="md" // ✅ More rectangular buttons
                  >
                    View
                  </Button>
                </HStack>
              </Box>
            ))
          ) : (
            <Box textAlign="center" py={6}>
              <Text fontSize="sm" color={mutedColor}>
                No job recommendations available at the moment.
              </Text>
              <Button
                as={Link}
                to="/jobs"
                size="sm"
                colorScheme="blue"
                variant="outline"
                borderRadius="md" // ✅ More rectangular
                mt={3}
              >
                Browse All Jobs
              </Button>
            </Box>
          )}
        </VStack>

        {jobs.length > 0 && (
          <Button
            as={Link}
            to="/find-jobs"
            w="full"
            mt={4}
            size="sm"
            colorScheme="blue"
            variant="outline"
            borderRadius="md" // ✅ More rectangular
          >
            View All Jobs
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default JobRecommendationsCard;
