import React from 'react';
import { VStack, Heading, Text, HStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const EmployerApplicationsHeader = ({ 
  applicationsCount, 
  textColor, 
  mutedColor 
}) => {
  return (
    <HStack justify="space-between" align="start" w="full" wrap="wrap">
      <VStack align="start" spacing={2}>
        <Heading size="lg" color={textColor}>
          Job Applications
        </Heading>
        <Text color={mutedColor}>
          Manage and review {applicationsCount} applications from job seekers
        </Text>
      </VStack>
      
      <HStack spacing={3}>
        <Button 
          as={Link} 
          to="/employer-dashboard?section=postJob" 
          colorScheme="blue" 
          variant="outline"
        >
          Post New Job
        </Button>
        <Button 
          as={Link} 
          to="/employer-dashboard" 
          variant="ghost"
        >
          Dashboard
        </Button>
      </HStack>
    </HStack>
  );
};

export default EmployerApplicationsHeader;