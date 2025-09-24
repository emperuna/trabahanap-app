import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Flex,
  Badge,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { 
  HiLightningBolt, 
  HiUsers, 
  HiShieldCheck,
  HiTrendingUp,
  HiChatAlt,
  HiGlobe
} from 'react-icons/hi';

const Features = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const mainFeatures = [
    {
      icon: HiLightningBolt,
      title: 'AI-Powered Job Matching',
      description: 'Our smart algorithm matches you with jobs that perfectly fit your skills and preferences.',
      stats: '95% accuracy',
      color: 'blue',
      image: '⚡'
    },
    {
      icon: HiUsers,
      title: 'Verified Employers',
      description: 'All companies on our platform are thoroughly vetted for legitimacy and quality.',
      stats: '2,500+ companies',
      color: 'blue',
      image: '🏢'
    }
  ];

  const additionalFeatures = [
    {
      icon: HiShieldCheck,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected',
      color: '#153CF5'
    },
    {
      icon: HiTrendingUp,
      title: 'Salary Insights',
      description: 'Real-time salary data and trends',
      color: '#153CF5'
    },
    {
      icon: HiChatAlt,
      title: 'Direct Messaging',
      description: 'Chat directly with recruiters',
      color: '#153CF5'
    },
    {
      icon: HiGlobe,
      title: 'Remote-Friendly',
      description: 'Find remote work opportunities',
      color: '#153CF5'
    }
  ];

  return (
    <Box py={20} bg={bgColor}>
      <Container maxW="7xl">
        <VStack spacing={16}>
          {/* Header Section */}
          <VStack spacing={4} textAlign="center">
            <Badge
              bg="#2563eb"
              color="white"
              variant="solid"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              fontWeight="semibold"
            >
              Platform Features
            </Badge>
            <Heading
              size="xl"
              color="gray.800"
              fontWeight="bold"
              letterSpacing="-0.02em"
            >
              Everything You Need to Land Your Dream Job
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl" lineHeight="tall">
              Powerful tools and features designed to accelerate your career growth
            </Text>
          </VStack>

          {/* Main Features - Large Cards */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} w="full">
            {mainFeatures.map((feature, index) => (
              <Box
                key={index}
                bgGradient="linear(135deg, white 0%, #f7fafc 100%)"
                p={8}
                borderRadius="3xl"
                border="1px solid"
                borderColor="gray.200"
                boxShadow="lg"
                transition="all 0.3s ease"
                _hover={{
                  transform: 'translateY(-8px)',
                  boxShadow: '2xl',
                  borderColor: `${feature.color}.200`,
                  bgGradient: 'linear(135deg, #f7fafc 0%, #edf2f7 100%)'
                }}
                position="relative"
                overflow="hidden"
              >
                {/* Background Pattern */}
                <Box
                  position="absolute"
                  top={-10}
                  right={-10}
                  fontSize="6xl"
                  opacity={0.1}
                  transform="rotate(15deg)"
                >
                  {feature.image}
                </Box>

                <VStack spacing={6} align="flex-start" position="relative">
                  <HStack justify="space-between" w="full">
                    <Box
                      p={4}
                      bg={`${feature.color}.50`}
                      borderRadius="2xl"
                      color={`${feature.color}.500`}
                    >
                      <Icon as={feature.icon} boxSize={8} />
                    </Box>
                    <Badge
                      colorScheme={feature.color}
                      variant="solid"
                      borderRadius="full"
                      px={3}
                      py={1}
                      fontSize="sm"
                    >
                      {feature.stats}
                    </Badge>
                  </HStack>

                  <VStack spacing={3} align="flex-start">
                    <Heading size="lg" color="gray.800" fontWeight="bold">
                      {feature.title}
                    </Heading>
                    <Text color="gray.600" fontSize="md" lineHeight="tall">
                      {feature.description}
                    </Text>
                  </VStack>

                  {/* Feature highlight */}
                  <Box
                    w="full"
                    h="1px"
                    bgGradient={`linear(to-r, ${feature.color}.400, transparent)`}
                  />
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          {/* Additional Features - Compact Grid */}
          <Box w="full">
            <VStack spacing={8}>
              <Heading size="lg" color="gray.800" textAlign="center">
                Plus More Amazing Features
              </Heading>
              
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} w="full">
                {additionalFeatures.map((feature, index) => (
                  <Flex
                    key={index}
                    direction="column"
                    align="center"
                    p={6}
                    bgGradient="linear(135deg, white 0%, #f7fafc 100%)"
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="gray.200"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'translateY(-4px)',
                      borderColor: '#153CF5',
                      boxShadow: 'md',
                      bgGradient: 'linear(135deg, #f7fafc 0%, #edf2f7 100%)'
                    }}
                    cursor="pointer"
                  >
                    <Box
                      p={3}
                      bg="gray.50"
                      borderRadius="xl"
                      mb={4}
                    >
                      <Icon 
                        as={feature.icon} 
                        boxSize={6} 
                        color={feature.color}
                      />
                    </Box>
                    <VStack spacing={2} textAlign="center">
                      <Text fontSize="sm" fontWeight="bold" color="gray.800">
                        {feature.title}
                      </Text>
                      <Text fontSize="xs" color="gray.600" textAlign="center">
                        {feature.description}
                      </Text>
                    </VStack>
                  </Flex>
                ))}
              </SimpleGrid>
            </VStack>
          </Box>

          {/* Bottom CTA Section */}
          <Box
            w="full"
            bgGradient="linear(135deg, #0038C9 12%, #1554F5 63%, #6F97FF 100%)"
            borderRadius="3xl"
            p={8}
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              w="full"
              h="full"
              bgGradient="linear(to-br, #2563eb 0%, #1d4ed8 30%, #1e40af 100%)"
              opacity={0.9}
            />
            <VStack spacing={4} position="relative" zIndex={1}>
              <Heading size="lg" color="white">
                Ready to Experience These Features?
              </Heading>
              <Text color="whiteAlpha.900" maxW="md">
                Join thousands of professionals who've already found their dream jobs
              </Text>
              <HStack spacing={6} pt={2}>
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    50K+
                  </Text>
                  <Text fontSize="sm" color="whiteAlpha.800">
                    Success Stories
                  </Text>
                </VStack>
                <Box w="1px" h={8} bg="whiteAlpha.300" />
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    98%
                  </Text>
                  <Text fontSize="sm" color="whiteAlpha.800">
                    Satisfaction Rate
                  </Text>
                </VStack>
                <Box w="1px" h="8" bg="whiteAlpha.300" />
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    24/7
                  </Text>
                  <Text fontSize="sm" color="whiteAlpha.800">
                    Support
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Features;