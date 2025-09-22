import React from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Text,
  Button,
  Icon,
} from '@chakra-ui/react';
import { HiPlus } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const ActionAlert = () => {
  return (
    <Alert 
      status="info" 
      borderRadius="xl" 
      bg="blue.50" 
      border="1px" 
      borderColor="blue.200"
      p={6}
    >
      <AlertIcon color="blue.500" />
      <Box flex="1">
        <Text fontWeight="semibold" color="blue.800">
          Ready to hire top talent?
        </Text>
        <Text fontSize="sm" color="blue.600" mt={1}>
          Post your first job and start receiving applications from qualified candidates.
        </Text>
      </Box>
      <Button
        as={Link}
        to="/employer/post-job"
        size="sm"
        colorScheme="blue"
        variant="solid"
        ml={4}
        leftIcon={<Icon as={HiPlus} />}
        _hover={{
          transform: 'translateY(-1px)',
          boxShadow: 'md'
        }}
        transition="all 0.2s ease"
      >
        Post Job
      </Button>
    </Alert>
  );
};

export default ActionAlert;