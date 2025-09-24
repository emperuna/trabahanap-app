import React from 'react';
import {
  Box, VStack, Text, Button, Badge, HStack,
  useColorModeValue, Card, CardBody, Divider
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

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
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      borderRadius="xl"
      _hover={{ 
        boxShadow: 'lg', 
        transform: 'translateY(-2px)',
        borderColor: 'blue.200'
      }}
      transition="all 0.3s ease"
      h="fit-content"
    >
      <CardBody p={5}>
        <VStack align="start" spacing={4}>
          {/* Job Title & Company */}
          <VStack align="start" spacing={1} w="full">
            <Text 
              fontWeight="bold" 
              fontSize="lg" 
              color={textColor}
              noOfLines={2}
              lineHeight="1.3"
            >
              {job.title || 'Job Title'}
            </Text>
            <Text color={mutedColor} fontSize="md" fontWeight="medium">
              {job.company || 'Company Name'}
            </Text>
            <Text fontSize="sm" color={mutedColor}>
              📍 {job.location || 'Location not specified'}
            </Text>
          </VStack>

          {/* Badges */}
          <HStack spacing={2} flexWrap="wrap">
            <Badge colorScheme="blue" variant="subtle" borderRadius="full">
              {job.jobType || 'Full-time'}
            </Badge>
            {job.salary && (
              <Badge colorScheme="green" variant="outline" borderRadius="full">
                {formatSalary(job.salary)}
              </Badge>
            )}
          </HStack>

          {/* Description */}
          {job.description && (
            <Text 
              fontSize="sm" 
              color={mutedColor} 
              noOfLines={3}
              lineHeight="1.5"
            >
              {job.description}
            </Text>
          )}

          <Divider />

          {/* Footer */}
          <HStack justify="space-between" w="full">
            <VStack align="start" spacing={0}>
              <Text fontSize="xs" color={mutedColor}>
                Posted by {job.postedByUsername || 'Recruiter'}
              </Text>
              <Text fontSize="xs" color={mutedColor}>
                {formatDate(job.createdAt)}
              </Text>
            </VStack>
            
            <Button
              as={Link}
              to={`/jobs/${job.id}`}
              size="sm"
              colorScheme="blue"
              variant="solid"
              borderRadius="full"
              _hover={{ transform: 'scale(1.05)' }}
            >
              View Details
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default JobCard;