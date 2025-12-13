import React from 'react';
import {
  Box,
  VStack,
  Text,
  Icon,
  Button,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { HiDocumentText, HiSearch, HiSparkles } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const JobSeekerApplicationsEmptyState = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      borderRadius="2xl"
      border="2px dashed"
      borderColor={borderColor}
      position="relative"
      overflow="hidden"
    >
      {/* Gradient Background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="150px"
        bgGradient="linear(180deg, blue.50 0%, transparent 100%)"
        zIndex={0}
        _dark={{
          bgGradient: "linear(180deg, gray.700 0%, transparent 100%)",
        }}
      />

      <VStack spacing={6} py={16} px={8} position="relative" zIndex={1}>
        {/* Animated Icon */}
        <Box
          w={24}
          h={24}
          borderRadius="full"
          bg={useColorModeValue('blue.100', 'blue.900')}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Icon as={HiDocumentText} boxSize={12} color="blue.500" />
          {/* Sparkle decorations */}
          <Box
            position="absolute"
            top="-2"
            right="-2"
            bg="yellow.400"
            borderRadius="full"
            p={1.5}
          >
            <Icon as={HiSparkles} boxSize={4} color="white" />
          </Box>
        </Box>

        <VStack spacing={3}>
          <Text 
            fontSize="2xl" 
            fontWeight="700" 
            color={useColorModeValue('gray.800', 'white')}
            textAlign="center"
          >
            No Applications Yet
          </Text>
          <Text 
            fontSize="md" 
            color={useColorModeValue('gray.600', 'gray.400')} 
            textAlign="center" 
            maxW="lg"
            lineHeight="tall"
          >
            Your job search journey starts here! Browse through exciting opportunities 
            and take the first step towards your dream career.
          </Text>
        </VStack>

        <HStack spacing={4}>
          <Button
            colorScheme="blue"
            size="lg"
            leftIcon={<HiSearch />}
            onClick={() => navigate('/jobseeker/find-jobs')}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            transition="all 0.2s"
          >
            Find Jobs
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default JobSeekerApplicationsEmptyState;