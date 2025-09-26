import React from 'react';
import { Flex, VStack, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ApplicationsHeader = ({ applicationsCount, textColor, mutedColor }) => {
  return (
    <Flex justify="space-between" align="center">
      <VStack align="start" spacing={1}>
        <Heading size="lg" color={textColor}>My Job Applications</Heading>
        <Text color={mutedColor}>
          Track the status of your {applicationsCount} job applications
        </Text>
      </VStack>
      <Button as={Link} to="/find-jobs" colorScheme="purple" variant="outline">
        Browse More Jobs
      </Button>
    </Flex>
  );
};

export default ApplicationsHeader;