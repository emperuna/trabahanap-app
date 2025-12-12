import React from 'react';
import { Card, CardBody, VStack, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const AboutCompanyCard = ({ company, companyDescription }) => (
  <Card bg="white" borderRadius="2xl" shadow="md">
    <CardBody p={8}>
      <VStack spacing={4} textAlign="center">
        <Heading size="md" color="gray.800" mb={2}>About {company}</Heading>
        <Text color="gray.600" fontSize="sm">
          {companyDescription || 'Fusce ultricies ornare suspendisse sed nisi lacus, volutpat est venenatis tellus.'}
        </Text>
        <Button as={Link} to="#" colorScheme="blue" size="md" w="full">
          View company
        </Button>
      </VStack>
    </CardBody>
  </Card>
);

export default AboutCompanyCard;