import React from 'react';
import { Card, CardBody, VStack, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const EmptyEmployerApplicationsState = ({ 
  cardBg, 
  textColor, 
  mutedColor, 
  hasApplications, 
  isFiltered 
}) => {
  return (
    <Card bg={cardBg} borderRadius="xl">
      <CardBody p={12}>
        <VStack spacing={4} textAlign="center">
          <Text fontSize="4xl">
            {isFiltered ? '🔍' : '📋'}
          </Text>
          <Heading size="md" color={textColor}>
            {isFiltered ? 'No Matching Applications' : 'No Applications Yet'}
          </Heading>
          <Text color={mutedColor} maxW="md" textAlign="center">
            {isFiltered 
              ? 'Try adjusting your filters to see more applications.'
              : hasApplications
                ? 'No applications match your current filters.'
                : 'When job seekers apply for your jobs, their applications will appear here.'
            }
          </Text>
          {!hasApplications && (
            <VStack spacing={3}>
              <Button 
                as={Link} 
                to="/employer/post-job" 
                colorScheme="blue" 
                size="lg"
              >
                Post Your First Job
              </Button>
              <Text fontSize="sm" color={mutedColor}>
                Start attracting talented candidates
              </Text>
            </VStack>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default EmptyEmployerApplicationsState;