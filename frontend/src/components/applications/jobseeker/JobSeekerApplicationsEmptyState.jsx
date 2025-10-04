import React from 'react';
import {
  Box,
  VStack,
  Text,
  Icon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { HiDocumentText } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const JobSeekerApplicationsEmptyState = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <Box
      bg={bgColor}
      borderRadius="xl"
      border="2px dashed"
      borderColor={borderColor}
      p={16}
    >
      <VStack spacing={6}>
        <Box
          w={20}
          h={20}
          borderRadius="full"
          bg={useColorModeValue('blue.50', 'gray.700')}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={HiDocumentText} boxSize={10} color={accentColor} />
        </Box>
        <VStack spacing={2}>
          <Text fontSize="xl" fontWeight="700" color={mutedColor}>
            No Applications Yet
          </Text>
          <Text fontSize="md" color={mutedColor} textAlign="center" maxW="md">
            You haven't applied to any jobs yet. Start exploring opportunities and apply!
          </Text>
        </VStack>
        <Button
          colorScheme="blue"
          size="lg"
          onClick={() => navigate('/jobseeker/find-jobs')}
        >
          Find Jobs
        </Button>
      </VStack>
    </Box>
  );
};

export default JobSeekerApplicationsEmptyState;