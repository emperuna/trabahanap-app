import React, { useState, useEffect, useRef } from 'react';
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
  FormHelperText,
  Input
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
  
  // Add file upload state
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const resumeFileRef = useRef();
  const coverLetterFileRef = useRef();

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

  const handleFileChange = (file, type) => {
    if (file && file.type === 'application/pdf') {
      if (type === 'resume') {
        setResumeFile(file);
      } else if (type === 'coverLetter') {
        setCoverLetterFile(file);
      }
    } else {
      toast({
        title: 'Invalid File',
        description: 'Please select a PDF file only.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleApply = async () => {
    try {
      setApplying(true);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('jobId', id);
      formData.append('coverLetterText', coverLetter);
      
      if (resumeFile) {
        formData.append('resumePdf', resumeFile);
      }
      
      if (coverLetterFile) {
        formData.append('coverLetterPdf', coverLetterFile);
      }

      await applicationsAPI.applyForJobWithFiles(formData);
      
      toast({
        title: 'Application Submitted!',
        description: 'Your application has been submitted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      setHasApplied(true);
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
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
        <ModalContent mx={4}>
          <ModalHeader>Submit Application</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <VStack spacing={6} align="stretch">
              {/* Resume Upload */}
              <FormControl>
                <FormLabel>Resume (PDF)</FormLabel>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e.target.files[0], 'resume')}
                  ref={resumeFileRef}
                  display="none"
                />
                <Button
                  onClick={() => resumeFileRef.current?.click()}
                  variant="outline"
                  w="full"
                  h="50px"
                >
                  {resumeFile ? resumeFile.name : 'Upload Resume (PDF)'}
                </Button>
              </FormControl>

              {/* Cover Letter Upload (Optional) */}
              <FormControl>
                <FormLabel>Cover Letter (PDF) - Optional</FormLabel>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e.target.files[0], 'coverLetter')}
                  ref={coverLetterFileRef}
                  display="none"
                />
                <Button
                  onClick={() => coverLetterFileRef.current?.click()}
                  variant="outline"
                  w="full"
                  h="50px"
                >
                  {coverLetterFile ? coverLetterFile.name : 'Upload Cover Letter (PDF)'}
                </Button>
              </FormControl>

              {/* Text Cover Letter */}
              <FormControl>
                <FormLabel>Cover Letter Text</FormLabel>
                <Textarea
                  placeholder="Write your cover letter here..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={8}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="blue" 
              onClick={handleApply}
              isLoading={applying}
              loadingText="Submitting..."
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