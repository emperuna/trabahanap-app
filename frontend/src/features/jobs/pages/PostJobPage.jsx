import React, { useState } from 'react';
import {
  Box, Heading, VStack, FormControl, FormLabel,
  Input, Textarea, Button, useToast, Text, Image, 
  useColorModeValue, FormErrorMessage, Select,
  NumberInput, NumberInputField, NumberInputStepper,
  NumberIncrementStepper, NumberDecrementStepper,
  InputGroup, InputLeftElement
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { jobsAPI } from '../../../shared/api';
import FolderIllustration from '../../../assets/images/FolderIllustration.svg';

const EmployerPostJob = () => {
  const toast = useToast();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    jobType: '',
    description: '',
    requirements: '',
    salary: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Job type options
  const jobTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Freelance',
    'Internship',
    'Remote',
  ];

  // Validation rules
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'title':
        if (!value.trim()) {
          error = 'Job title is required';
        } else if (value.trim().length < 3) {
          error = 'Job title must be at least 3 characters';
        } else if (value.trim().length > 100) {
          error = 'Job title must be less than 100 characters';
        }
        break;

      case 'company':
        if (!value.trim()) {
          error = 'Company name is required';
        } else if (value.trim().length < 2) {
          error = 'Company name must be at least 2 characters';
        } else if (value.trim().length > 100) {
          error = 'Company name must be less than 100 characters';
        }
        break;

      case 'location':
        if (!value.trim()) {
          error = 'Location is required';
        } else if (value.trim().length < 2) {
          error = 'Location must be at least 2 characters';
        }
        break;

      case 'jobType':
        if (!value) {
          error = 'Job type is required';
        }
        break;

      case 'description':
        if (!value.trim()) {
          error = 'Job description is required';
        } else if (value.trim().length < 50) {
          error = 'Description must be at least 50 characters';
        } else if (value.trim().length > 255) {
          error = 'Description must be less than 255 characters';
        }
        break;

      case 'requirements':
        if (!value.trim()) {
          error = 'Job requirements are required';
        } else if (value.trim().length < 20) {
          error = 'Requirements must be at least 20 characters';
        } else if (value.trim().length > 255) {
          error = 'Requirements must be less than 255 characters';
        }
        break;

      case 'salary':
        const salaryNum = parseFloat(value);
        if (!value) {
          error = 'Salary is required';
        } else if (isNaN(salaryNum)) {
          error = 'Salary must be a valid number';
        } else if (salaryNum < 0) {
          error = 'Salary cannot be negative';
        } else if (salaryNum > 10000000) {
          error = 'Salary seems unreasonably high';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Validate field on change if it was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleNumberChange = (name, valueString) => {
    setForm({ ...form, [name]: valueString });

    // Validate field on change if it was touched
    if (touched[name]) {
      const error = validateField(name, valueString);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    // Validate on blur
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = {};
    Object.keys(form).forEach((field) => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    // Validate all fields
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix all errors before submitting',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await jobsAPI.createJob(form);
      
      toast({
        title: 'Success!',
        description: 'Job posted successfully!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      // Reset form
      setForm({
        title: '',
        company: '',
        location: '',
        jobType: '',
        description: '',
        requirements: '',
        salary: '',
      });
      setErrors({});
      setTouched({});

      // Navigate after short delay
      setTimeout(() => {
        navigate('/employer-dashboard');
      }, 1000);

    } catch (err) {
      console.error('Error posting job:', err);
      toast({
        title: 'Failed to post job',
        description: err.message || 'An error occurred while posting the job',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const headerBg = useColorModeValue('blue.500', 'blue.500');
  const headerText = useColorModeValue('white', 'white');

  return (
    <Box minH="100vh" bg="transparent" py={10}>
      <Box
        maxW="1200px"
        mx="auto"
        borderRadius="40px"
        overflow="hidden"
        boxShadow="lg"
        bg="white"
      >
        {/* Header */}
        <Box
          bg={headerBg}
          color={headerText}
          px={0}
          py={0}
          minH={{ base: '180px', md: '180px' }}
          display="flex"
          flexDir={{ base: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          position="relative"
        >
          <Box mb={{ base: 4, md: 0 }} zIndex={1} pl={{ base: 6, md: 10 }} pr={{ base: 6, md: 10 }}>
            <Heading
              size="4xl"
              fontWeight="800"
              letterSpacing="-0.025em"
              lineHeight="1"
              color="white"
              mb={2}
            >
              Post a Job
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="medium">
              Easily post your job openings and connect with top talent. Find and hire professionals quickly to grow your business!
            </Text>
          </Box>
          <Box
            flexShrink={0}
            h={{ base: '150px', md: '220px', lg: '270px' }}
            w={{ base: '220px', md: '380px', lg: '480px' }}
            position="relative"
            overflow="hidden"
            borderTopRightRadius="40px"
            borderBottomRightRadius="40px"
            ml={{ md: 4, lg: 8 }}
            pr={{ base: 6, md: 10 }}
            pl={{ base: 6, md: 10 }}
            zIndex={0}
          >
            <Image
              src={FolderIllustration}
              alt="Post Job Illustration"
              h="100%"
              w="100%"
              objectFit="cover"
              objectPosition="80% 20%"
              position="absolute"
              top={0}
              left={-16}
            />
          </Box>
        </Box>

        {/* Form Section */}
        <Box px={{ base: 6, md: 10 }} py={{ base: 8, md: 10 }}>
          <form onSubmit={handleSubmit}>
            <Box 
              display={{ base: 'block', md: 'grid' }} 
              gridTemplateColumns={{ md: '1fr 1fr' }} 
              gap={5}
            >
              {/* Job Title */}
              <FormControl isRequired isInvalid={touched.title && errors.title}>
                <FormLabel>Job Title</FormLabel>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Senior Frontend Developer"
                />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              </FormControl>

              {/* Company */}
              <FormControl isRequired isInvalid={touched.company && errors.company}>
                <FormLabel>Company</FormLabel>
                <Input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Tech Corp Inc."
                />
                <FormErrorMessage>{errors.company}</FormErrorMessage>
              </FormControl>

              {/* Location */}
              <FormControl isRequired isInvalid={touched.location && errors.location}>
                <FormLabel>Location</FormLabel>
                <Input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Manila, Philippines"
                />
                <FormErrorMessage>{errors.location}</FormErrorMessage>
              </FormControl>

              {/* Job Type */}
              <FormControl isRequired isInvalid={touched.jobType && errors.jobType}>
                <FormLabel>Job Type</FormLabel>
                <Select
                  name="jobType"
                  value={form.jobType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Select job type"
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.jobType}</FormErrorMessage>
              </FormControl>
            </Box>

            <VStack spacing={5} mt={5} align="stretch">
              {/* Description */}
              <FormControl isRequired isInvalid={touched.description && errors.description}>
                <FormLabel>
                  Description 
                  <Text as="span" fontSize="sm" color="gray.500" ml={2}>
                    ({form.description.length}/255 characters)
                  </Text>
                </FormLabel>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Describe the job role, responsibilities, and what you're looking for..."
                  minH="150px"
                  maxLength={255}
                />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>

              {/* Requirements */}
              <FormControl isRequired isInvalid={touched.requirements && errors.requirements}>
                <FormLabel>
                  Requirements
                  <Text as="span" fontSize="sm" color="gray.500" ml={2}>
                    ({form.requirements.length}/255 characters)
                  </Text>
                </FormLabel>
                <Textarea
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="List the qualifications, skills, and experience required..."
                  minH="120px"
                  maxLength={255}
                />
                <FormErrorMessage>{errors.requirements}</FormErrorMessage>
              </FormControl>

              {/* Salary */}
              <FormControl isRequired isInvalid={touched.salary && errors.salary}>
                <FormLabel>Salary (Monthly)</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    fontSize="1.2em"
                    children="₱"
                  />
                  <NumberInput
                    w="full"
                    min={0}
                    max={10000000}
                    value={form.salary}
                    onChange={(valueString) => handleNumberChange('salary', valueString)}
                    onBlur={handleBlur}
                  >
                    <NumberInputField
                      pl={10}
                      name="salary"
                      placeholder="e.g. 50000"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
                <FormErrorMessage>{errors.salary}</FormErrorMessage>
              </FormControl>

              {/* Submit Button */}
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                alignSelf="flex-end"
                isLoading={isSubmitting}
                loadingText="Posting Job..."
                px={12}
                mt={4}
              >
                Post Job
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployerPostJob;