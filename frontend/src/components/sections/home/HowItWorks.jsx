import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Icon,
  Circle,
} from '@chakra-ui/react';
import { HiSearch, HiUserAdd, HiBriefcase } from 'react-icons/hi';

const HowItWorks = () => {
  const steps = [
    {
      icon: HiSearch,
      title: 'Search & Discover',
      description: 'Browse thousands of job opportunities from top companies across the Philippines.',
      color: 'purple.500'
    },
    {
      icon: HiUserAdd,
      title: 'Create Profile',
      description: 'Build your professional profile and let employers find you with ease.',
      color: 'blue.500'
    },
    {
      icon: HiBriefcase,
      title: 'Get Hired',
      description: 'Apply to jobs, interview with confidence, and land your dream career.',
      color: 'green.500'
    }
  ];

  return (
    <Box py={20} bg="white">
      <Container maxW="7xl">
        <VStack spacing={16} textAlign="center">
          <VStack spacing={4}>
            <Heading size="xl" color="gray.800">
              How It Works
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl">
              Get hired in just 3 simple steps
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12}>
            {steps.map((step, index) => (
              <VStack key={index} spacing={6} textAlign="center">
                <Circle
                  size={20}
                  bg={`${step.color.split('.')[0]}.50`}
                  position="relative"
                >
                  <Icon as={step.icon} boxSize={8} color={step.color} />
                  <Circle
                    size={8}
                    bg={step.color}
                    color="white"
                    fontSize="sm"
                    fontWeight="bold"
                    position="absolute"
                    top={-2}
                    right={-2}
                  >
                    {index + 1}
                  </Circle>
                </Circle>
                
                <VStack spacing={3}>
                  <Heading size="md" color="gray.800">
                    {step.title}
                  </Heading>
                  <Text color="gray.600" maxW="300px">
                    {step.description}
                  </Text>
                </VStack>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default HowItWorks;