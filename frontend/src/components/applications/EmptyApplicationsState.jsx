import React from 'react';
import { Card, CardBody, VStack, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const EmptyApplicationsState = ({ cardBg, textColor, mutedColor }) => {
  return (
    <Card bg={cardBg} borderRadius="xl">
      <CardBody p={12}>
        <VStack spacing={4} textAlign="center">
          <Text fontSize="4xl">📋</Text>
          <Heading size="md" color={textColor}>No Applications Yet</Heading>
          <Text color={mutedColor} maxW="md" textAlign="center">
            You haven't applied to any jobs yet. Start browsing and applying to jobs that match your skills and interests.
          </Text>
          <VStack spacing={3}>
            <Button as={Link} to="/find-jobs" colorScheme="purple" size="lg">
              Browse Jobs
            </Button>
            <Text fontSize="sm" color={mutedColor}>
              Over 1000+ jobs waiting for you
            </Text>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default EmptyApplicationsState;