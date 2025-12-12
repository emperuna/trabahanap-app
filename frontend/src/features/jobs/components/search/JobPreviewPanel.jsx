import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  IconButton,
  Divider,
  Avatar,
  Heading,
  useColorModeValue,
  Icon,
  List,
  ListItem,
  ListIcon,
  Card,
  CardBody,
  useToast,
} from '@chakra-ui/react';
import {
  HiLocationMarker,
  HiBriefcase,
  HiCurrencyDollar,
  HiClock,
  HiHeart,
  HiOutlineHeart,
  HiExternalLink,
  HiCheckCircle,
  HiOfficeBuilding,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { savedJobsAPI } from '../../../../shared/api';
import { useAuth } from '../../../auth/context/AuthContext';

const JobPreviewPanel = ({ job }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuthenticated } = useAuth();

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const sectionBg = useColorModeValue('gray.50', 'gray.700');

  // Check if job is saved on mount and when job changes
  useEffect(() => {
    if (isAuthenticated && job?.id) {
      checkSavedStatus();
    }
  }, [job?.id, isAuthenticated]);

  const checkSavedStatus = async () => {
    try {
      const saved = await savedJobsAPI.isJobSaved(job.id);
      setIsSaved(saved);
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };
  
  const handleApply = () => {
    navigate(`/jobs/${job.id}`);
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      toast({
        title: 'Please log in',
        description: 'You need to be logged in to save jobs',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoadingSave(true);

      if (isSaved) {
        // Remove from saved
        await savedJobsAPI.removeSavedJob(job.id);
        setIsSaved(false);
        
        // Dispatch event for real-time updates
        window.dispatchEvent(new CustomEvent('savedJobRemoved', { 
          detail: { jobId: job.id, action: 'removed' }
        }));
        
        toast({
          title: 'Job removed',
          description: 'Job removed from your saved list',
          status: 'info',
          duration: 2000,
          isClosable: true,
        });
      } else {
        // Add to saved
        await savedJobsAPI.saveJob(job.id);
        setIsSaved(true);
        
        // Dispatch event for real-time updates
        window.dispatchEvent(new CustomEvent('savedJobAdded', { 
          detail: { jobId: job.id, action: 'added' }
        }));
        
        toast({
          title: 'Job saved!',
          description: 'Job added to your saved list',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }

    } catch (error) {
      console.error('❌ Error saving/removing job:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save job',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoadingSave(false);
    }
  };

  // Format salary - handle multiple data structures
  const formatSalary = () => {
    // Check for salary object with min/max
    if (job.salary?.min || job.salary?.max) {
      const min = job.salary.min;
      const max = job.salary.max;
      if (min && max) return `₱${min.toLocaleString()} - ₱${max.toLocaleString()}`;
      if (min) return `₱${min.toLocaleString()}+`;
      if (max) return `Up to ₱${max.toLocaleString()}`;
    }

    // Check for direct salaryMin/salaryMax fields
    if (job.salaryMin || job.salaryMax) {
      const min = job.salaryMin;
      const max = job.salaryMax;
      if (min && max) return `₱${min.toLocaleString()} - ₱${max.toLocaleString()}`;
      if (min) return `₱${min.toLocaleString()}+`;
      if (max) return `Up to ₱${max.toLocaleString()}`;
    }

    // Check for single salary value
    if (job.salary && typeof job.salary === 'number') {
      return `₱${job.salary.toLocaleString()}`;
    }

    return 'Competitive Salary';
  };

  // Format posted date - handle multiple formats
  const formatPostedDate = () => {
    // Check for postedDate field
    if (job.postedDate) {
      return job.postedDate;
    }

    // Check for createdAt field
    if (job.createdAt) {
      const date = new Date(job.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffMinutes = Math.floor(diffTime / (1000 * 60));

      if (diffDays === 0) {
        if (diffHours === 0) {
          if (diffMinutes === 0) return 'Just now';
          return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        }
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      } else if (diffDays === 1) {
        return 'Yesterday';
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months > 1 ? 's' : ''} ago`;
      } else {
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
      }
    }

    // Check for datePosted field
    if (job.datePosted) {
      const date = new Date(job.datePosted);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }

    return 'Recently posted';
  };

  // Helper function to convert string to array (split by newlines or bullet points)
  const parseToArray = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === 'string') {
      // Split by newlines, bullets, or numbered lists
      return data
        .split(/\n|•|[\d]+\./)
        .map(item => item.trim())
        .filter(item => item.length > 0);
    }
    return [];
  };

  // Parse responsibilities and requirements
  const responsibilitiesList = parseToArray(job.responsibilities);
  const requirementsList = parseToArray(job.requirements);
  const skillsList = parseToArray(job.skills);

  return (
    <Card
      bg={cardBg}
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={borderColor}
      overflow="hidden"
      h="full"
      display="flex"
      flexDirection="column"
    >
      <CardBody
        p={0}
        display="flex"
        flexDirection="column"
        h="full"
      >
        {/* Scrollable Content */}
        <Box
          overflowY="auto"
          flex={1}
          css={{
            '&::-webkit-scrollbar': { width: '8px' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': {
              background: '#CBD5E0',
              borderRadius: '4px',
            },
          }}
        >
          <VStack spacing={0} align="stretch">
            {/* Header Section */}
            <Box bg={sectionBg} p={6} borderBottom="1px" borderColor={borderColor}>
              <VStack spacing={4} align="stretch">
                {/* Company & Title */}
                <HStack justify="space-between" align="start">
                  <HStack spacing={4}>
                    <Avatar
                      size="lg"
                      name={job.company?.name || job.companyName}
                      src={job.company?.logo || job.companyLogo}
                      bg="blue.500"
                    />
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" color={mutedColor} fontWeight="medium">
                        {job.company?.name || job.companyName || 'Company Name'}
                      </Text>
                      <Heading size="lg" color={textColor} lineHeight="1.2">
                        {job.title}
                      </Heading>
                    </VStack>
                  </HStack>

                  <IconButton
                    icon={isSaved ? <HiHeart /> : <HiOutlineHeart />}
                    variant="ghost"
                    colorScheme={isSaved ? 'red' : 'gray'}
                    onClick={handleSave}
                    isLoading={loadingSave}
                    aria-label={isSaved ? 'Remove from saved' : 'Save job'}
                    size="lg"
                    _hover={{
                      bg: isSaved ? 'red.50' : 'gray.100',
                      transform: 'scale(1.05)',
                    }}
                    transition="all 0.2s"
                  />
                </HStack>

                {/* Key Info Grid */}
                <VStack spacing={3} align="stretch">
                  <HStack spacing={6} flexWrap="wrap">
                    <HStack fontSize="sm" color={textColor}>
                      <Icon as={HiLocationMarker} color="blue.500" boxSize={5} />
                      <Text fontWeight="medium">{job.location || 'Remote'}</Text>
                    </HStack>
                    <HStack fontSize="sm" color={textColor}>
                      <Icon as={HiBriefcase} color="blue.500" boxSize={5} />
                      <Text fontWeight="medium">{job.type || job.jobType || 'Full-time'}</Text>
                    </HStack>
                  </HStack>

                  <HStack spacing={6} flexWrap="wrap">
                    <HStack fontSize="sm" color={textColor}>
                      <Icon as={HiCurrencyDollar} color="green.500" boxSize={5} />
                      <Text fontWeight="semibold" color="green.600">
                        {formatSalary()}
                      </Text>
                    </HStack>
                    <HStack fontSize="sm" color={mutedColor}>
                      <Icon as={HiClock} boxSize={5} />
                      <Text>{formatPostedDate()}</Text>
                    </HStack>
                  </HStack>
                </VStack>

                {/* Badges */}
                <HStack spacing={2} flexWrap="wrap">
                  <Badge
                    colorScheme="blue"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="semibold"
                  >
                    {job.type || job.jobType || 'Full-time'}
                  </Badge>
                  {(job.remote || job.workType === 'Remote') && (
                    <Badge
                      colorScheme="green"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="semibold"
                    >
                      🏠 Remote
                    </Badge>
                  )}
                  <Badge
                    colorScheme="purple"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="semibold"
                  >
                    {job.experienceLevel || job.experience || 'Mid-Level'}
                  </Badge>
                  {(job.classification || job.category) && (
                    <Badge
                      colorScheme="orange"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="semibold"
                    >
                      {job.classification || job.category}
                    </Badge>
                  )}
                </HStack>
              </VStack>
            </Box>

            {/* Job Description Section */}
            <Box p={6}>
              <VStack spacing={6} align="stretch">
                {/* Description */}
                <Box>
                  <Heading size="sm" mb={3} color={textColor}>
                    Job Description
                  </Heading>
                  <Text fontSize="sm" color={mutedColor} lineHeight="tall" whiteSpace="pre-line">
                    {job.description || 'No description provided.'}
                  </Text>
                </Box>

                <Divider />

                {/* Responsibilities */}
                {responsibilitiesList.length > 0 && (
                  <>
                    <Box>
                      <Heading size="sm" mb={3} color={textColor}>
                        Key Responsibilities
                      </Heading>
                      <List spacing={2}>
                        {responsibilitiesList.map((item, index) => (
                          <ListItem key={index} fontSize="sm" color={mutedColor}>
                            <HStack align="start" spacing={3}>
                              <ListIcon as={HiCheckCircle} color="blue.500" mt={0.5} boxSize={5} />
                              <Text>{item}</Text>
                            </HStack>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    <Divider />
                  </>
                )}

                {/* Requirements */}
                {requirementsList.length > 0 && (
                  <>
                    <Box>
                      <Heading size="sm" mb={3} color={textColor}>
                        Requirements
                      </Heading>
                      <List spacing={2}>
                        {requirementsList.map((item, index) => (
                          <ListItem key={index} fontSize="sm" color={mutedColor}>
                            <HStack align="start" spacing={3}>
                              <ListIcon as={HiCheckCircle} color="green.500" mt={0.5} boxSize={5} />
                              <Text>{item}</Text>
                            </HStack>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    <Divider />
                  </>
                )}

                {/* Skills */}
                {skillsList.length > 0 && (
                  <>
                    <Box>
                      <Heading size="sm" mb={3} color={textColor}>
                        Required Skills
                      </Heading>
                      <HStack spacing={2} flexWrap="wrap">
                        {skillsList.map((skill, index) => (
                          <Badge
                            key={index}
                            colorScheme="blue"
                            variant="subtle"
                            px={3}
                            py={1}
                            borderRadius="md"
                            fontSize="xs"
                            fontWeight="medium"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </HStack>
                    </Box>
                    <Divider />
                  </>
                )}

                {/* Company Info */}
                <Box bg={sectionBg} p={4} borderRadius="xl">
                  <VStack spacing={4} align="stretch">
                    <HStack spacing={4}>
                      <Icon as={HiOfficeBuilding} color="blue.500" boxSize={6} />
                      <VStack align="start" spacing={0}>
                        <Heading size="sm" color={textColor}>
                          About {job.company?.name || job.companyName}
                        </Heading>
                        <Text fontSize="xs" color={mutedColor}>
                          {job.company?.industry || job.industry || 'Technology'}
                        </Text>
                      </VStack>
                    </HStack>

                    <Text fontSize="sm" color={mutedColor} lineHeight="tall">
                      {job.company?.description || job.companyDescription || 'No company description available.'}
                    </Text>

                    {(job.company?.website || job.companyWebsite) && (
                      <Button
                        as="a"
                        href={job.company?.website || job.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        rightIcon={<HiExternalLink />}
                        variant="outline"
                        size="sm"
                        colorScheme="blue"
                      >
                        Visit Company Website
                      </Button>
                    )}
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </VStack>
        </Box>

        {/* Fixed Footer - Apply Buttons */}
        <Box
          p={6}
          borderTop="2px"
          borderColor={borderColor}
          bg={cardBg}
          mt="auto"
        >
          <VStack spacing={3}>
            <Button
              colorScheme="blue"
              size="lg"
              w="full"
              onClick={handleApply}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Apply for this Position
            </Button>
          </VStack>
        </Box>
      </CardBody>
    </Card>
  );
};

export default JobPreviewPanel;