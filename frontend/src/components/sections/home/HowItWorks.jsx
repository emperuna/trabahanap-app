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
  useColorModeValue,
} from '@chakra-ui/react';
import { HiSearch, HiUserAdd, HiBriefcase } from 'react-icons/hi';

const HowItWorks = () => {
  const bgGradient = useColorModeValue(
    'linear(135deg, white 0%, gray.50 100%)',
    'linear(135deg, gray.800 0%, gray.900 100%)'
  );
  
  const headingColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const stepTitleColor = useColorModeValue('gray.800', 'white');

  const steps = [
    {
      icon: HiSearch,
      title: 'Search & Discover',
      description: 'Browse thousands of job opportunities from top companies across the Philippines.',
      color: 'blue.500',
      bgColor: useColorModeValue('blue.50', 'blue.900'),
    },
    {
      icon: HiUserAdd,
      title: 'Create Profile', 
      description: 'Build your professional profile and let employers find you with ease.',
      color: 'green.500',
      bgColor: useColorModeValue('green.50', 'green.900'),
    },
    {
      icon: HiBriefcase,
      title: 'Get Hired',
      description: 'Apply to jobs, interview with confidence, and land your dream career.',
      color: 'purple.500',
      bgColor: useColorModeValue('purple.50', 'purple.900'),
    }
  ];

  return (
    <Box py={20} bgGradient={bgGradient}>
      <Container maxW="7xl">
        <VStack spacing={16} textAlign="center">
          <VStack spacing={4}>
            <Heading size="xl" color={headingColor}>
              How It Works
            </Heading>
            <Text fontSize="lg" color={textColor} maxW="2xl">
              Get hired in just 3 simple steps
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12}>
            {steps.map((step, index) => (
              <VStack key={index} spacing={6} textAlign="center">
                <Circle
                  size={20}
                  bg={step.bgColor}
                  position="relative"
                  border="2px solid"
                  borderColor={useColorModeValue('white', 'gray.700')}
                  shadow="lg"
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
                    border="2px solid"
                    borderColor={useColorModeValue('white', 'gray.800')}
                    shadow="md"
                  >
                    {index + 1}
                  </Circle>
                </Circle>
                
                <VStack spacing={3}>
                  <Heading size="md" color={stepTitleColor}>
                    {step.title}
                  </Heading>
                  <Text color={textColor} maxW="300px">
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