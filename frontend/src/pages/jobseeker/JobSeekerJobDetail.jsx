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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  FormControl,
  FormLabel,
  FormHelperText
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
  HiShare,
  HiDocumentText
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

  const handleModalClose = () => {
    onClose();
    setCoverLetter(''); // Clear cover letter when modal is closed without submitting
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
                <ApplyNowCard 
                  company={job.company} 
                  onApply={hasApplied ? null : onOpen}
                  hasApplied={hasApplied}
                />
                <AboutCompanyCard company={job.company} companyDescription={job.companyDescription} />
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Cover Letter Modal */}
      <Modal isOpen={isOpen} onClose={handleModalClose} size="xl" isCentered>
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
        <ModalContent mx={4}>
          <ModalHeader>
            <VStack align="start" spacing={2}>
              <HStack spacing={3}>
                <Icon as={HiDocumentText} color="purple.500" boxSize={6} />
                <Heading size="md">Apply for {job?.title}</Heading>
              </HStack>
              <Text fontSize="sm" color={mutedColor} fontWeight="normal">
                at {job?.company}
              </Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody pb={6}>
            <VStack spacing={6} align="stretch">
              {/* Job Summary Card */}
              <Card bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
                <CardBody p={4}>
                  <VStack spacing={3} align="start">
                    <HStack spacing={3}>
                      <Avatar 
                        name={job?.company} 
                        size="sm" 
                        bg="purple.500"
                      />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="semibold">{job?.title}</Text>
                        <Text fontSize="xs" color={mutedColor}>{job?.company}</Text>
                      </VStack>
                    </HStack>
                    
                    <HStack spacing={4} fontSize="xs" color={mutedColor}>
                      <HStack spacing={1}>
                        <Icon as={HiLocationMarker} />
                        <Text>{job?.location}</Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Icon as={HiCurrencyDollar} />
                        <Text>{formatSalary(job?.salary)}</Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>

              {/* Cover Letter Form */}
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="semibold">
                  Cover Letter <Text as="span" color="red.500">*</Text>
                </FormLabel>
                <Textarea
                  placeholder={`Dear Hiring Manager at ${job?.company},

I am writing to express my interest in the ${job?.title} position. I believe my skills and experience make me a strong candidate for this role.

[Tell them about your relevant experience, skills, and why you want to work for their company]

I am excited about the opportunity to contribute to your team and would welcome the chance to discuss how my background aligns with your needs.

Thank you for your consideration.

Best regards,
[Your name]`}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={10}
                  resize="vertical"
                  fontSize="sm"
                  borderRadius="lg"
                />
                <FormHelperText fontSize="xs">
                  Write a compelling cover letter that highlights your qualifications and enthusiasm for this position.
                  <Text as="span" color={mutedColor} ml={2}>
                    ({coverLetter.length}/2000 characters)
                  </Text>
                </FormHelperText>
              </FormControl>

              {/* Application Tips */}
              <Card bg={useColorModeValue('blue.50', 'blue.900')} borderRadius="lg" border="1px" borderColor="blue.200">
                <CardBody p={4}>
                  <VStack spacing={2} align="start">
                    <Text fontSize="sm" fontWeight="semibold" color="blue.700">
                      💡 Tips for a great cover letter:
                    </Text>
                    <VStack spacing={1} align="start" fontSize="xs" color="blue.600">
                      <Text>• Personalize it for this specific role and company</Text>
                      <Text>• Highlight your most relevant skills and experience</Text>
                      <Text>• Show enthusiasm for the position and company</Text>
                      <Text>• Keep it concise and professional</Text>
                      <Text>• Proofread for any errors before submitting</Text>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack spacing={3} w="full">
              <Button 
                variant="ghost" 
                onClick={handleModalClose}
                flex={1}
              >
                Cancel
              </Button>
              <Button 
                colorScheme="purple" 
                onClick={handleApply}
                isLoading={applying}
                loadingText="Submitting..."
                isDisabled={!coverLetter.trim() || coverLetter.length > 2000}
                flex={2}
                leftIcon={<Icon as={HiDocumentText} />}
              >
                Submit Application
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JobDetail;