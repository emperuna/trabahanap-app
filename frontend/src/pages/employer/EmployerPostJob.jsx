import React, { useState } from 'react';
import {
  Box, Container, Heading, VStack, FormControl, FormLabel,
  Input, Textarea, Button, useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { jobsAPI } from '../../services/api';

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

  return (
    <Box py={10}>
      <Container maxW="3xl">
        <Heading size="lg" mb={6}>Post a Job</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
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
            <Button type="submit" colorScheme="purple">Post Job</Button>
          </VStack>
        </form>
      </Container>
    </Box>
  );
};

export default PostJob;