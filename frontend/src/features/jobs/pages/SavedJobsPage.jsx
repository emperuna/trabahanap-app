import React, { useState, useEffect } from 'react';
import {
  Box, Container, VStack, HStack, Text, Heading, Card, CardBody,
  SimpleGrid, Spinner, useToast, Button, Badge, Avatar,
  useColorModeValue, Icon, Divider, Menu, MenuButton, MenuList,
  MenuItem, IconButton, useBreakpointValue
} from '@chakra-ui/react';
import { 
  HiOutlineHeart, HiHeart, HiCalendar, HiLocationMarker, HiOfficeBuilding,
  HiCurrencyDollar, HiDotsVertical, HiExternalLink, HiTrash,
  HiRefresh, HiSearch, HiBookmark, HiSparkles, HiClock
} from 'react-icons/hi';
import { Link as RouterLink } from 'react-router-dom';
import { savedJobsAPI } from '../../../shared/api';
import SaveJobButton from '../components/SaveJobButton';
import JobSeekerLayout from '../../../shared/components/layout/JobSeekerLayout';

const JobSeekerSavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

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
      <JobSeekerLayout>
        <VStack spacing={4} py={20}>
          <Spinner size="xl" color="purple.500" thickness="4px" />
          <Text color={mutedColor}>Loading your saved jobs...</Text>
        </VStack>
      </JobSeekerLayout>
    );
  }

  return (
    <JobSeekerLayout>
      <VStack spacing={8} align="stretch">
        {/* Premium Header with Gradient */}
        <Box
          bg="purple.600"
          borderRadius={{ base: 'xl', md: '2xl' }}
          overflow="hidden"
          position="relative"
        >
          {/* Gradient Background */}
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            bgGradient="linear(120deg, purple.600 0%, purple.500 50%, pink.500 100%)"
            zIndex={0}
          />
          
          {/* Decorative circles */}
          <Box
            position="absolute"
            top="-20%"
            right="-5%"
            w="200px"
            h="200px"
            borderRadius="full"
            bg="whiteAlpha.100"
            zIndex={0}
          />
          <Box
            position="absolute"
            bottom="-30%"
            left="10%"
            w="150px"
            h="150px"
            borderRadius="full"
            bg="whiteAlpha.50"
            zIndex={0}
          />

          <HStack 
            justify="space-between" 
            align="center"
            p={{ base: 6, md: 8 }}
            position="relative"
            zIndex={1}
            flexWrap="wrap"
            gap={4}
          >
            <VStack align="start" spacing={2}>
              <HStack spacing={2}>
                <HiBookmark color="white" size={24} />
                <Heading 
                  size={{ base: 'lg', md: 'xl' }}
                  fontWeight="800"
                  letterSpacing="-0.025em"
                  color="white"
                >
                  Saved Jobs
                </Heading>
              </HStack>
              <Text 
                fontSize={{ base: 'sm', md: 'md' }}
                color="whiteAlpha.900"
                fontWeight="400"
              >
                {savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved for later
              </Text>
            </VStack>

            <HStack spacing={3}>
              <Button
                leftIcon={<HiRefresh />}
                onClick={fetchSavedJobs}
                variant="solid"
                bg="whiteAlpha.200"
                color="white"
                isLoading={loading}
                _hover={{ bg: 'whiteAlpha.300' }}
                size={isMobile ? 'sm' : 'md'}
              >
                Refresh
              </Button>
              <Button
                colorScheme="yellow"
                size={isMobile ? 'sm' : 'md'}
                leftIcon={<HiSearch />}
                as={RouterLink}
                to="/find-jobs"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                {isMobile ? 'Find Jobs' : 'Find More Jobs'}
              </Button>
            </HStack>
          </HStack>
        </Box>

        {/* Saved Jobs Grid */}
        {savedJobs.length === 0 ? (
          <EmptyState />
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
    </JobSeekerLayout>
  );
};

// Empty State Component
const EmptyState = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      borderRadius="2xl"
      border="2px dashed"
      borderColor={borderColor}
      position="relative"
      overflow="hidden"
    >
      {/* Gradient Background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="150px"
        bgGradient="linear(180deg, purple.50 0%, transparent 100%)"
        zIndex={0}
        _dark={{
          bgGradient: "linear(180deg, gray.700 0%, transparent 100%)",
        }}
      />

      <VStack spacing={6} py={16} px={8} position="relative" zIndex={1}>
        <Box
          w={24}
          h={24}
          borderRadius="full"
          bg={useColorModeValue('purple.100', 'purple.900')}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Icon as={HiHeart} boxSize={12} color="purple.500" />
          <Box
            position="absolute"
            top="-2"
            right="-2"
            bg="yellow.400"
            borderRadius="full"
            p={1.5}
          >
            <Icon as={HiSparkles} boxSize={4} color="white" />
          </Box>
        </Box>

        <VStack spacing={3}>
          <Text 
            fontSize="2xl" 
            fontWeight="700" 
            color={useColorModeValue('gray.800', 'white')}
            textAlign="center"
          >
            No Saved Jobs Yet
          </Text>
          <Text 
            fontSize="md" 
            color={useColorModeValue('gray.600', 'gray.400')} 
            textAlign="center" 
            maxW="lg"
            lineHeight="tall"
          >
            Discover your next opportunity! Save jobs you're interested in 
            to review and apply later.
          </Text>
        </VStack>

        <Button
          colorScheme="purple"
          size="lg"
          leftIcon={<HiSearch />}
          as={RouterLink}
          to="/find-jobs"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          transition="all 0.2s"
        >
          Browse Jobs
        </Button>
      </VStack>
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
  const labelColor = useColorModeValue('gray.400', 'gray.500');

  return (
    <Card
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      _hover={{ 
        shadow: 'lg', 
        transform: 'translateY(-4px)',
        borderColor: 'purple.300'
      }}
      transition="all 0.3s ease"
    >
      {/* Purple accent bar at top */}
      <Box h="4px" bgGradient="linear(to-r, purple.400, pink.400)" />

      <CardBody p={5}>
        <VStack spacing={4} align="stretch">
          {/* Header with Company Avatar */}
          <HStack justify="space-between" align="start">
            <HStack spacing={3} flex={1}>
              <Avatar 
                size="md" 
                name={job.company} 
                bg="purple.500"
                color="white"
                fontWeight="700"
                borderRadius="lg"
              />
              <VStack align="start" spacing={0} flex={1}>
                <Text 
                  fontSize="md" 
                  fontWeight="700" 
                  color={textColor} 
                  noOfLines={1}
                  _hover={{ color: 'purple.500' }}
                  cursor="pointer"
                  as={RouterLink}
                  to={`/jobs/${job.id}`}
                >
                  {job.title}
                </Text>
                <Text fontSize="sm" color={mutedColor} noOfLines={1}>
                  {job.company}
                </Text>
              </VStack>
            </HStack>

            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HiDotsVertical />}
                variant="ghost"
                size="sm"
                color={mutedColor}
                borderRadius="md"
              />
              <MenuList>
                <MenuItem 
                  as={RouterLink} 
                  to={`/jobs/${job.id}`}
                  icon={<HiExternalLink />}
                >
                  View Job Details
                </MenuItem>
                <Divider />
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

          {/* Job Badges */}
          <HStack spacing={2} flexWrap="wrap">
            <Badge colorScheme="purple" borderRadius="full" px={2}>
              {job.jobType}
            </Badge>
            {job.workType && (
              <Badge colorScheme="blue" borderRadius="full" px={2}>
                {job.workType}
              </Badge>
            )}
          </HStack>

          {/* Job Details */}
          <VStack spacing={2} align="stretch">
            <HStack spacing={1} fontSize="sm">
              <Icon as={HiLocationMarker} color={labelColor} boxSize={4} />
              <Text color={mutedColor}>{job.location}</Text>
            </HStack>
            <HStack spacing={1} fontSize="sm">
              <Icon as={HiCurrencyDollar} color="green.500" boxSize={4} />
              <Text fontWeight="600" color="green.500">
                {formatSalary(job.salary)}
              </Text>
            </HStack>
          </VStack>

          <Divider />

          {/* Footer */}
          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={0}>
              <HStack spacing={1} fontSize="xs" color={labelColor}>
                <Icon as={HiBookmark} boxSize={3} />
                <Text>Saved {formatDate(savedJob.savedAt)}</Text>
              </HStack>
              <HStack spacing={1} fontSize="xs" color={labelColor}>
                <Icon as={HiClock} boxSize={3} />
                <Text>Posted {getDaysAgo(job.postedAt)} days ago</Text>
              </HStack>
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
                colorScheme="purple"
                variant="solid"
                borderRadius="md"
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