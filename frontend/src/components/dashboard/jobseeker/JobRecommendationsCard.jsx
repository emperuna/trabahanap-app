import React from 'react';
import {
  Card,
  CardBody,
  HStack,
  VStack,
  Box,
  Heading,
  Badge,
  Button,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const JobRecommendationsCard = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const jobs = [
    { title: 'Senior React Developer', company: 'TechStart Inc.', match: '95%' },
    { title: 'Frontend Engineer', company: 'Digital Solutions', match: '88%' },
    { title: 'Full Stack Developer', company: 'Innovation Labs', match: '82%' },
  ];

  return (
    <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor} w="full">
      <CardBody p={6}>
        <HStack justify="space-between" mb={4}>
          <Heading size="md" color={textColor}>Recommended Jobs</Heading>
          <Badge colorScheme="green" variant="subtle" borderRadius="full">
            3 New
          </Badge>
        </HStack>
        
        <VStack spacing={4} align="stretch">
          {jobs.map((job, index) => (
            <Box key={index} p={4} border="1px" borderColor={borderColor} borderRadius="lg">
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                  {job.title}
                </Text>
                <Badge colorScheme="green" variant="subtle" fontSize="xs">
                  {job.match} match
                </Badge>
              </HStack>
              <Text fontSize="xs" color={mutedColor} mb={3}>
                {job.company}
              </Text>
              <Button size="xs" colorScheme="purple" variant="outline" w="full">
                View Details
              </Button>
            </Box>
          ))}
        </VStack>

        <Button
          as={Link}
          to="/jobs"
          variant="ghost"
          size="sm"
          w="full"
          mt={4}
          colorScheme="purple"
        >
          View All Jobs
        </Button>
      </CardBody>
    </Card>
  );
};

export default JobRecommendationsCard;
