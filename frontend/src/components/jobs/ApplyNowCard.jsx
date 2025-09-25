import React from 'react';
import { Card, CardBody, VStack, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ApplyNowCard = ({ company, onApply }) => (
  <Card bg="white" borderRadius="2xl" shadow="md">
    <CardBody p={8}>
      <VStack spacing={4} textAlign="center">
        <Heading size="md" color="gray.800" mb={2}>Apply now</Heading>
        <Text color="gray.600" fontSize="sm" textAlign="justify">
          Please let {company} know that you found this position on our job board, that is a great way to support us, so we can keep posting cool jobs every week.
        </Text>
        <Button colorScheme="purple" size="lg" onClick={onApply} w="full">
          Apply now
        </Button>
        <Button as={Link} to="/find-jobs" variant="outline" size="lg" w="full">
          View Other Jobs
        </Button>
      </VStack>
    </CardBody>
  </Card>
);

export default ApplyNowCard;