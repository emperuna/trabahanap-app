import React, { useState, useEffect } from 'react';
import {
  Box, Container, VStack, HStack, Text, Heading, Card, CardBody,
  SimpleGrid, Spinner, useToast, Button, Badge, Avatar,
  useColorModeValue, Icon, Divider, Menu, MenuButton, MenuList,
  MenuItem, IconButton
} from '@chakra-ui/react';
import { 
  HiOutlineHeart, HiCalendar, HiLocationMarker, HiOfficeBuilding,
  HiCurrencyDollar, HiDotsVertical, HiExternalLink, HiTrash,
  HiRefresh
} from 'react-icons/hi';
import { Link as RouterLink } from 'react-router-dom';
import { savedJobsAPI } from '../../services/api';
import SaveJobButton from '../../components/jobs/SaveJobButton';

const JobSeekerSavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Theme colors
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const data = await savedJobsAPI.getMySavedJobs();
      setSavedJobs(data);
    } catch (error) {
      toast({
        title: 'Error fetching saved jobs',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJobRemoved = (jobId) => {
    setSavedJobs(prev => prev.filter(savedJob => savedJob.job.id !== jobId));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Salary not specified';
    return `₱${salary.toLocaleString()}`;
  };

  const getDaysAgo = (dateString) => {
    const days = Math.ceil((new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24));
    return days;
  };

  if (loading) {
    return (
      <Box bg={bgColor} minH="100vh" py={8}>
        <Container maxW="6xl">
          <VStack spacing={4} py={20}>
            <Spinner size="xl" color="blue.500" />
            <Text color={mutedColor}>Loading your saved jobs...</Text>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="6xl">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={2}>
              <Heading size="xl" color={textColor}>
                💾 Saved Jobs
              </Heading>
              <Text color={mutedColor} fontSize="lg">
                {savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved for later
              </Text>
            </VStack>
            
            <Button
              leftIcon={<HiRefresh />}
              onClick={fetchSavedJobs}
              variant="outline"
              isLoading={loading}
            >
              Refresh
            </Button>
          </HStack>

          {/* Saved Jobs Grid */}
          {savedJobs.length === 0 ? (
            <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor}>
              <CardBody p={12} textAlign="center">
                <VStack spacing={4}>
                  <Box
                    w={16}
                    h={16}
                    borderRadius="full"
                    bg={useColorModeValue('red.100', 'red.900')}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={HiOutlineHeart} boxSize={8} color="red.500" />
                  </Box>
                  <VStack spacing={2}>
                    <Text fontSize="xl" fontWeight="semibold" color={textColor}>
                      No saved jobs yet
                    </Text>
                    <Text color={mutedColor} textAlign="center">
                      Start saving jobs you're interested in to keep track of them easily.
                    </Text>
                  </VStack>
                  <Button 
                    as={RouterLink} 
                    to="/find-jobs" 
                    colorScheme="blue" 
                    size="lg"
                  >
                    Browse Jobs
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          ) : (
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {savedJobs.map((savedJob) => (
                <SavedJobCard
                  key={savedJob.id}
                  savedJob={savedJob}
                  onJobRemoved={handleJobRemoved}
                  formatDate={formatDate}
                  formatSalary={formatSalary}
                  getDaysAgo={getDaysAgo}
                  cardBg={cardBg}
                  borderColor={borderColor}
                  textColor={textColor}
                  mutedColor={mutedColor}
                />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

// Saved Job Card Component
const SavedJobCard = ({
  savedJob,
  onJobRemoved,
  formatDate,
  formatSalary,
  getDaysAgo,
  cardBg,
  borderColor,
  textColor,
  mutedColor
}) => {
  const { job } = savedJob;

  return (
    <Card
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      borderRadius="xl"
      _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
      transition="all 0.3s ease"
    >
      <CardBody p={6}>
        <VStack spacing={4} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={1}>
              <Text fontSize="lg" fontWeight="bold" color={textColor} noOfLines={2}>
                {job.title}
              </Text>
              <HStack spacing={2}>
                <Avatar size="xs" name={job.company} bg="blue.500" />
                <Text fontSize="sm" color={mutedColor}>
                  {job.company}
                </Text>
              </HStack>
            </VStack>

            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HiDotsVertical />}
                variant="ghost"
                size="sm"
                color={mutedColor}
              />
              <MenuList>
                <MenuItem 
                  as={RouterLink} 
                  to={`/jobs/${job.id}`}
                  icon={<HiExternalLink />}
                >
                  View Job Details
                </MenuItem>
                <MenuItem 
                  icon={<HiTrash />}
                  color="red.500"
                  onClick={() => onJobRemoved(job.id)}
                >
                  Remove from Saved
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>

          {/* Job Details */}
          <VStack spacing={2} align="stretch">
            <HStack spacing={4} flexWrap="wrap">
              <HStack spacing={1}>
                <Icon as={HiLocationMarker} color={mutedColor} boxSize={4} />
                <Text fontSize="sm" color={mutedColor}>
                  {job.location}
                </Text>
              </HStack>
              <Badge colorScheme="blue" borderRadius="full">
                {job.jobType}
              </Badge>
            </HStack>

            <HStack spacing={1}>
              <Icon as={HiCurrencyDollar} color="green.500" boxSize={4} />
              <Text fontSize="sm" fontWeight="medium" color="green.500">
                {formatSalary(job.salary)}
              </Text>
            </HStack>
          </VStack>

          <Divider />

          {/* Footer */}
          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Text fontSize="xs" color={mutedColor}>
                Saved {formatDate(savedJob.savedAt)}
              </Text>
              <Text fontSize="xs" color={mutedColor}>
                Posted {getDaysAgo(job.postedAt)} days ago
              </Text>
            </VStack>

            <HStack spacing={2}>
              <SaveJobButton
                jobId={job.id}
                size="sm"
                onSaveChange={(jobId, isSaved) => {
                  if (!isSaved) {
                    onJobRemoved(jobId);
                  }
                }}
              />
              <Button
                as={RouterLink}
                to={`/jobs/${job.id}`}
                size="sm"
                colorScheme="blue"
                variant="solid"
              >
                View Details
              </Button>
            </HStack>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default JobSeekerSavedJobs;