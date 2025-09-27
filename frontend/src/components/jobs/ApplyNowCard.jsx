import React from 'react';
import { Card, CardBody, VStack, Heading, Text, Button, Badge, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ApplyNowCard = ({ company, onApply, hasApplied, loading = false }) => (
  <Card bg="white" borderRadius="2xl" shadow="md">
    <CardBody p={8}>
      <VStack spacing={4} textAlign="center">
        {/* Dynamic Header based on application status */}
        <VStack spacing={2}>
          <Heading size="md" color="gray.800">
            {hasApplied ? 'Application Submitted' : 'Apply Now'}
          </Heading>
          {hasApplied && (
            <Badge colorScheme="green" variant="solid" borderRadius="full" px={3} py={1}>
              ✓ Applied Successfully
            </Badge>
          )}
        </VStack>

        {/* Dynamic Description */}
        <Text color="gray.600" fontSize="sm" textAlign="justify">
          {hasApplied 
            ? `Your application for this position at ${company} has been submitted successfully. The employer will review your application and contact you if selected.`
            : `Please let ${company} know that you found this position on our job board. That's a great way to support us, so we can keep posting amazing jobs every week.`
          }
        </Text>
        
        {/* Dynamic Action Buttons */}
        <VStack spacing={3} w="full">
          {hasApplied ? (
            <>
              <Button 
                colorScheme="green" 
                size="lg" 
                w="full"
                isDisabled
                variant="solid"
              >
                ✓ Application Submitted
              </Button>
              
              <HStack spacing={2} w="full">
                <Button 
                  as={Link} 
                  to="/dashboard/applications" 
                  colorScheme="blue"
                  variant="outline" 
                  size="md"
                  flex={1}
                >
                  View Applications
                </Button>
                <Button 
                  as={Link} 
                  to="/find-jobs" 
                  variant="outline" 
                  size="md"
                  flex={1}
                >
                  Find More Jobs
                </Button>
              </HStack>
            </>
          ) : (
            <>
              <Button 
                colorScheme="purple" 
                size="lg" 
                onClick={onApply} 
                w="full"
                isLoading={loading}
                loadingText="Opening Application..."
              >
                Apply Now
              </Button>
              
              <Button 
                as={Link} 
                to="/find-jobs" 
                variant="outline" 
                size="lg" 
                w="full"
              >
                View Other Jobs
              </Button>
            </>
          )}
        </VStack>

        {/* Application Status Info */}
        {hasApplied && (
          <Text fontSize="xs" color="gray.500" textAlign="center">
            You can track your application status in your dashboard
          </Text>
        )}
      </VStack>
    </CardBody>
  </Card>
);

export default ApplyNowCard;