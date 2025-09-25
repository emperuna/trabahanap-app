import React, { useState, useEffect } from 'react';
import {
  Box, Container, VStack, HStack, Heading, Text, Button, Badge, 
  Spinner, useToast, useColorModeValue, Divider, Card, CardBody,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, 
  ModalBody, ModalCloseButton, Textarea, useDisclosure, Icon
} from '@chakra-ui/react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  HiLocationMarker, HiOfficeBuilding, HiClock, HiCurrencyDollar,
  HiUser, HiArrowLeft, HiHeart, HiShare
} from 'react-icons/hi';
import { jobsAPI, applicationsAPI } from '../../services/api';

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
    <>
      <Box bg={bgColor} minH="100vh" py={8}>
        <Container maxW="4xl">
          <VStack spacing={6} align="stretch">
            {/* Back Button */}
            <Button
              leftIcon={<HiArrowLeft />}
              variant="ghost"
              alignSelf="flex-start"
              onClick={() => navigate(-1)}
              color={mutedColor}
            >
              Back to Jobs
            </Button>

            {/* Job Header */}
            <Card bg={cardBg} borderRadius="xl" shadow="md">
              <CardBody p={8}>
                <VStack spacing={6} align="stretch">
                  {/* Title and Company */}
                  <VStack align="start" spacing={2}>
                    <Heading size="lg" color={textColor}>
                      {job.title}
                    </Heading>
                    <HStack spacing={4} flexWrap="wrap">
                      <HStack spacing={1}>
                        <Icon as={HiOfficeBuilding} color={mutedColor} />
                        <Text color={mutedColor} fontWeight="medium">
                          {job.company}
                        </Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Icon as={HiLocationMarker} color={mutedColor} />
                        <Text color={mutedColor}>
                          {job.location}
                        </Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Icon as={HiClock} color={mutedColor} />
                        <Text color={mutedColor}>
                          {formatDate(job.createdAt)}
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>

                  {/* Job Details */}
                  <HStack spacing={4} flexWrap="wrap">
                    <Badge colorScheme="purple" variant="subtle" p={2} borderRadius="full">
                      {job.jobType || 'Full-time'}
                    </Badge>
                    {job.salary && (
                      <Badge colorScheme="green" variant="outline" p={2} borderRadius="full">
                        <HStack spacing={1}>
                          <Icon as={HiCurrencyDollar} boxSize={3} />
                          <Text>{formatSalary(job.salary)}</Text>
                        </HStack>
                      </Badge>
                    )}
                    {job.postedByUsername && (
                      <Badge colorScheme="blue" variant="subtle" p={2} borderRadius="full">
                        <HStack spacing={1}>
                          <Icon as={HiUser} boxSize={3} />
                          <Text>Posted by {job.postedByUsername}</Text>
                        </HStack>
                      </Badge>
                    )}
                  </HStack>

                  {/* Action Buttons */}
                  <HStack spacing={3}>
                    {hasApplied ? (
                      <Button 
                        colorScheme="green" 
                        size="lg" 
                        flex={1}
                        isDisabled
                      >
                        ✓ Applied
                      </Button>
                    ) : (
                      <Button 
                        colorScheme="purple" 
                        size="lg" 
                        onClick={onOpen}
                        flex={1}
                      >
                        Apply Now
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      leftIcon={<HiHeart />}
                    >
                      Save
                    </Button>
                    <Button 
                      variant="outline" 
                      leftIcon={<HiShare />}
                    >
                      Share
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Job Description */}
            <Card bg={cardBg} borderRadius="xl" shadow="sm">
              <CardBody p={8}>
                <VStack spacing={6} align="stretch">
                  <Heading size="md" color={textColor}>Job Description</Heading>
                  <Text color={textColor} lineHeight="1.8" whiteSpace="pre-line">
                    {job.description || 'No description provided.'}
                  </Text>
                </VStack>
              </CardBody>
            </Card>

            {/* Requirements */}
            {job.requirements && (
              <Card bg={cardBg} borderRadius="xl" shadow="sm">
                <CardBody p={8}>
                  <VStack spacing={6} align="stretch">
                    <Heading size="md" color={textColor}>Requirements</Heading>
                    <Text color={textColor} lineHeight="1.8" whiteSpace="pre-line">
                      {job.requirements}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            )}

            {/* Apply Section */}
            <Card bg={cardBg} borderRadius="xl" shadow="sm" borderWidth="2px" borderColor="purple.200">
              <CardBody p={8}>
                <VStack spacing={4} textAlign="center">
                  <Heading size="md" color={textColor}>
                    Interested in this position?
                  </Heading>
                  <Text color={mutedColor}>
                    Apply now and take the next step in your career!
                  </Text>
                  <HStack spacing={3}>
                    <Button 
                      colorScheme="purple" 
                      size="lg" 
                      onClick={handleApply}
                    >
                      Apply for this Job
                    </Button>
                    <Button 
                      as={Link}
                      to="/find-jobs"
                      variant="outline"
                      size="lg"
                    >
                      Browse More Jobs
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Container>
      </Box>

      {/* Apply Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apply for {job?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text color={mutedColor}>
                Write a cover letter to introduce yourself and explain why you're interested in this position.
              </Text>
              <Textarea
                placeholder="Dear Hiring Manager,

I am writing to express my interest in the [job title] position at [company name]. I believe my skills and experience make me a strong candidate for this role...

Best regards,
[Your name]"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={8}
                resize="vertical"
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="purple" 
              onClick={handleApply}
              isLoading={applying}
              loadingText="Submitting..."
              isDisabled={!coverLetter.trim()}
            >
              Submit Application
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JobDetail;