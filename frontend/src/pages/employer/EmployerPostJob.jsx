import React, { useState } from 'react';
import {
  Box, Heading, VStack, FormControl, FormLabel,
  Input, Textarea, Button, useToast, Text, Image, useColorModeValue
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { jobsAPI } from '../../services/api';
import FolderIllustration from '../../assets/images/FolderIllustration.svg';

const PostJob = () => {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await jobsAPI.createJob(form);
      toast({ title: 'Job posted successfully!', status: 'success' });
      navigate('/employer-dashboard');
    } catch (err) {
      toast({ title: 'Failed to post job', description: err.message, status: 'error' });
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
            <Box display={{ base: 'block', md: 'grid' }} gridTemplateColumns={{ md: '1fr 1fr' }} gap={5}>
              <FormControl isRequired>
                <FormLabel>Job Title</FormLabel>
                <Input name="title" value={form.title} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Company</FormLabel>
                <Input name="company" value={form.company} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input name="location" value={form.location} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Job Type</FormLabel>
                <Input name="jobType" value={form.jobType} onChange={handleChange} />
              </FormControl>
            </Box>
            <VStack spacing={5} mt={5} align="stretch">
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" value={form.description} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Requirements</FormLabel>
                <Textarea name="requirements" value={form.requirements} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Salary</FormLabel>
                <Input name="salary" type="number" value={form.salary} onChange={handleChange} />
              </FormControl>
              <Button type="submit" colorScheme="blue" alignSelf="flex-end">Post Job</Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default PostJob;