import React from 'react';
import { 
  SimpleGrid, VStack, Text, Spinner, useColorModeValue, Box, Icon 
} from '@chakra-ui/react';
import { HiDocumentText } from 'react-icons/hi';
import EmployerApplicationCard from './EmployerApplicationCard';

const EmployerApplicationsList = ({ 
  applications, 
  formatDate, 
  onStatusUpdate,
  onViewPDF,
  loading = false
}) => {
  const primaryColor = '#153CF5';
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const bgColor = useColorModeValue('white', 'gray.800');

  if (loading) {
    return (
      <Box 
        bg={bgColor} 
        borderRadius="xl" 
        border="1px" 
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        p={12}
      >
        <VStack spacing={4}>
          <Spinner size="xl" color={primaryColor} thickness="4px" />
          <VStack spacing={2}>
            <Text fontSize="lg" fontWeight="semibold" color={mutedColor}>
              Loading Applications
            </Text>
            <Text fontSize="sm" color={mutedColor}>
              Please wait while we fetch the latest applications...
            </Text>
          </VStack>
        </VStack>
      </Box>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <Box 
        bg={bgColor} 
        borderRadius="xl" 
        border="1px" 
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        p={12}
      >
        <VStack spacing={4}>
          <Box
            w={16}
            h={16}
            borderRadius="full"
            bg={useColorModeValue('gray.100', 'gray.700')}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={HiDocumentText} boxSize={8} color={mutedColor} />
          </Box>
          <VStack spacing={2}>
            <Text fontSize="lg" fontWeight="semibold" color={mutedColor}>
              No Applications Found
            </Text>
            <Text fontSize="sm" color={mutedColor} textAlign="center">
              Applications that match your current filters will appear here.
            </Text>
          </VStack>
        </VStack>
      </Box>
    );
  }

  return (
    <Box>
      <VStack spacing={4} align="stretch" mb={6}>
        <Text fontSize="sm" color={mutedColor}>
          Showing {applications.length} application{applications.length !== 1 ? 's' : ''}
        </Text>
      </VStack>
      
      <SimpleGrid 
        columns={{ base: 1, md: 2, xl: 3 }} 
        spacing={6}
        minChildWidth="320px"
      >
        {applications.map((application) => (
          <EmployerApplicationCard 
            key={application.id} 
            application={application}
            formatDate={formatDate}
            onStatusUpdate={onStatusUpdate}
            onViewPDF={onViewPDF}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default EmployerApplicationsList;