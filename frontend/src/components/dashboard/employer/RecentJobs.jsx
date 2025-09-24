import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Badge,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const JobCard = ({ job }) => {
  return (
    <Box 
      w="full" 
      p={4} 
      bg="gray.50" 
      borderRadius="xl" 
      border="1px" 
      borderColor="gray.100"
      _hover={{
        bg: 'gray.100',
        transform: 'translateY(-1px)',
        boxShadow: 'sm'
      }}
      transition="all 0.2s ease"
    >
      <HStack justify="space-between">
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold" color="gray.800">
            {job.title}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {job.type} • {job.location}
          </Text>
          <HStack spacing={4}>
            <Badge 
              colorScheme={job.status === 'Active' ? 'green' : 'gray'}
            >
              {job.status}
            </Badge>
            <Text fontSize="xs" color="gray.500">
              {job.applications} applications
            </Text>
          </HStack>
        </VStack>
        <VStack align="end" spacing={1}>
          <Text fontSize="sm" color="gray.500">
            Posted {job.postedDate}
          </Text>
          <Button 
            size="xs" 
            colorScheme="blue"
            _hover={{
              transform: 'scale(1.05)'
            }}
          >
            Manage
          </Button>
        </VStack>
      </HStack>
    </Box>
  );
};

const RecentJobs = ({ jobs = [] }) => {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Card bg={cardBg} w="full" borderRadius="2xl">
      <CardHeader>
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Heading size="md" color="gray.800">
              Recent Job Posts
            </Heading>
            <Text fontSize="sm" color="gray.600">
              Your latest job listings
            </Text>
          </VStack>
          <Button
            as={Link}
            to="/employer/jobs"
            variant="ghost"
            colorScheme="blue"
            size="sm"
            _hover={{
              transform: 'translateX(2px)'
            }}
          >
            View All
          </Button>
        </HStack>
      </CardHeader>
      <CardBody pt={0}>
        <VStack spacing={4}>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <Box 
              w="full" 
              p={8} 
              textAlign="center" 
              bg="gray.50" 
              borderRadius="xl"
              border="2px dashed"
              borderColor="gray.200"
            >
              <Text color="gray.500" fontWeight="medium">
                No job posts yet
              </Text>
              <Text fontSize="sm" color="gray.400" mt={1}>
                Create your first job posting to get started
              </Text>
              <Button
                as={Link}
                to="/employer/post-job"
                mt={4}
                size="sm"
                colorScheme="blue"
              >
                Post Your First Job
              </Button>
            </Box>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    applications: PropTypes.number.isRequired,
    postedDate: PropTypes.string.isRequired,
  }).isRequired,
};

RecentJobs.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    applications: PropTypes.number.isRequired,
    postedDate: PropTypes.string.isRequired,
  })),
};

export default RecentJobs;