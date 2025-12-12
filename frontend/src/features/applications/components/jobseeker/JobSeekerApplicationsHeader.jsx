import React from 'react';
import {
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

const JobSeekerApplicationsHeader = ({ applicationsCount }) => {
  return (
    <HStack justify="space-between" align="start">
      <VStack align="start" spacing={2}>
        <Heading size="xl" color={useColorModeValue('gray.800', 'white')}>
          My Applications
        </Heading>
        <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
          {applicationsCount} {applicationsCount === 1 ? 'Application' : 'Applications'}
        </Text>
      </VStack>
    </HStack>
  );
};

export default JobSeekerApplicationsHeader;