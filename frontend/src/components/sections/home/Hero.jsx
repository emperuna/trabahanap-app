import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Icon,
  SimpleGrid,
  Flex,
  Badge,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  HiSearch, 
  HiLocationMarker, 
  HiBriefcase,
  HiUsers,
  HiTrendingUp,
  HiStar,
  HiPlay
} from 'react-icons/hi';

const Hero = () => {
  const bgGradient = useColorModeValue(
    'linear(135deg, #0038C9 12%, #1554F5 63%, #6F97FF 100%)',
    'linear(135deg, #2d3748 0%, #4a5568 100%)'
  );

  const StatCard = ({ icon, number, label, trend }) => (
    <Box
      bg="whiteAlpha.100"
      backdropFilter="blur(20px)"
      p={6}
      borderRadius="2xl"
      border="1px solid"
      borderColor="whiteAlpha.200"
      textAlign="center"
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-8px)',
        bg: 'whiteAlpha.200',
        borderColor: 'whiteAlpha.300',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}
    >
      <VStack spacing={3}>
        <Box
          p={3}
          bg="whiteAlpha.200"
          borderRadius="xl"
          display="inline-block"
        >
          <Icon as={icon} boxSize={6} color="white" />
        </Box>
        <VStack spacing={1}>
          <Flex align="center" gap={2}>
            <Text fontSize="3xl" fontWeight="bold" color="white">
              {number}
            </Text>
            {trend && (
              <Badge
                colorScheme="yellow"
                variant="solid"
                fontSize="xs"
                borderRadius="full"
                px={2}
              >
                {trend}
              </Badge>
            )}
          </Flex>
          <Text fontSize="sm" color="whiteAlpha.800" fontWeight="medium">
            {label}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
    >
      {/* Animated Background Elements */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        w="400px"
        h="400px"
        bg="whiteAlpha.100"
        borderRadius="full"
        filter="blur(80px)"
        animation="float 6s ease-in-out infinite"
      />
      <Box
        position="absolute"
        bottom="20%"
        right="10%"
        w="300px"
        h="300px"
        bg="whiteAlpha.150"
        borderRadius="full"
        filter="blur(60px)"
        animation="float 8s ease-in-out infinite reverse"
      />

      <Container maxW="7xl" position="relative" zIndex={1} py={20}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} alignItems="center">
          {/* Left Content */}
          <VStack spacing={8} align="flex-start" textAlign="left">
            {/* Badge */}
            <Badge
              bg="whiteAlpha.200"
              color="white"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              fontWeight="medium"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.300"
            >
              #1 Job Platform in the Philippines
            </Badge>

            {/* Main Heading */}
            <VStack spacing={4} align="flex-start">
              <Heading
                as="h1"
                fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                fontWeight="800"
                color="white"
                lineHeight="shorter"
                letterSpacing="-0.02em"
              >
                Find Your{' '}
                <Text
                  as="span"
                  bgGradient="linear(135deg, #ffeaa7 0%, #fab1a0 100%)"
                  bgClip="text"
                  display="inline-block"
                >
                  Dream Job
                </Text>{' '}
                Today
              </Heading>
              
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="whiteAlpha.900"
                maxW="600px"
                lineHeight="tall"
                fontWeight="400"
              >
                Connect with top employers, discover amazing opportunities, 
                and take the next step in your career journey. Your perfect job is waiting.
              </Text>
            </VStack>

            {/* CTA Buttons */}
            <HStack spacing={4} flexWrap="wrap">
              <Button
                size="lg"
                h={14}
                px={8}
                bgGradient="linear(135deg, white 0%, #f7fafc 100%)"
                color="#153CF5"
                fontWeight="600"
                borderRadius="2xl"
                boxShadow="0 8px 32px rgba(0,0,0,0.12)"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.16)',
                  bgGradient: 'linear(135deg, #f7fafc 0%, #edf2f7 100%)'
                }}
                transition="all 0.3s ease"
                leftIcon={<Icon as={HiSearch} />}
              >
                Explore Jobs
              </Button>
              
              <Button
                size="lg"
                h={14}
                px={8}
                variant="ghost"
                color="white"
                fontWeight="600"
                borderRadius="2xl"
                border="2px solid"
                borderColor="whiteAlpha.300"
                _hover={{
                  bg: 'whiteAlpha.200',
                  borderColor: 'whiteAlpha.400',
                  transform: 'translateY(-2px)'
                }}
                transition="all 0.3s ease"
                leftIcon={<Icon as={HiPlay} />}
              >
                Watch Demo
              </Button>
            </HStack>

            {/* Trust Indicators */}
            <HStack spacing={6} pt={4}>
              <VStack spacing={1} align="flex-start">
                <HStack>
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} as={HiStar} color="yellow.400" boxSize={4} />
                  ))}
                </HStack>
                <Text fontSize="sm" color="whiteAlpha.800">
                  4.9/5 from 10k+ users
                </Text>
              </VStack>
              
              <Box w="1px" h={8} bg="whiteAlpha.300" />
              
              <VStack spacing={1} align="flex-start">
                <Text fontSize="lg" fontWeight="bold" color="white">
                  50K+
                </Text>
                <Text fontSize="sm" color="whiteAlpha.800">
                  Jobs posted daily
                </Text>
              </VStack>
            </HStack>
          </VStack>

          {/* Right Content - Search Card */}
          <VStack>
            <Box
              bg="whiteAlpha.100"
              backdropFilter="blur(30px)"
              p={8}
              borderRadius="3xl"
              border="1px solid"
              borderColor="whiteAlpha.200"
              boxShadow="0 20px 60px rgba(0,0,0,0.1)"
            >
              <VStack spacing={6}>
                <VStack spacing={2} textAlign="center">
                  <Heading size="lg" color="white" fontWeight="700">
                    Start Your Search
                  </Heading>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    Find the perfect opportunity for you
                  </Text>
                </VStack>

                <VStack spacing={4} w="full">
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" h={12}>
                      <Icon as={HiSearch} color="whiteAlpha.600" />
                    </InputLeftElement>
                    <Input
                      h={12}
                      bg="whiteAlpha.200"
                      border="1px solid"
                      borderColor="whiteAlpha.300"
                      borderRadius="xl"
                      color="white"
                      placeholder="Job title or keywords"
                      _placeholder={{ color: 'whiteAlpha.600' }}
                      _focus={{
                        borderColor: 'whiteAlpha.500',
                        bg: 'whiteAlpha.300',
                        boxShadow: '0 0 0 1px rgba(255,255,255,0.2)'
                      }}
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputLeftElement pointerEvents="none" h={12}>
                      <Icon as={HiLocationMarker} color="whiteAlpha.600" />
                    </InputLeftElement>
                    <Input
                      h={12}
                      bg="whiteAlpha.200"
                      border="1px solid"
                      borderColor="whiteAlpha.300"
                      borderRadius="xl"
                      color="white"
                      placeholder="City or remote"
                      _placeholder={{ color: 'whiteAlpha.600' }}
                      _focus={{
                        borderColor: 'whiteAlpha.500',
                        bg: 'whiteAlpha.300',
                        boxShadow: '0 0 0 1px rgba(255,255,255,0.2)'
                      }}
                    />
                  </InputGroup>

                  <Select
                    h={12}
                    bg="whiteAlpha.200"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    borderRadius="xl"
                    color="white"
                    placeholder="Select job type"
                    _focus={{
                      borderColor: 'whiteAlpha.500',
                      bg: 'whiteAlpha.300'
                    }}
                  >
                    <option value="full-time" style={{ color: 'black' }}>Full Time</option>
                    <option value="part-time" style={{ color: 'black' }}>Part Time</option>
                    <option value="contract" style={{ color: 'black' }}>Contract</option>
                    <option value="remote" style={{ color: 'black' }}>Remote</option>
                  </Select>

                  <Button
                    w="full"
                    size="lg"
                    h={14}
                    bgGradient="linear(135deg, white 0%, #f7fafc 100%)"
                    color="#153CF5"
                    fontWeight="600"
                    borderRadius="xl"
                    boxShadow="0 8px 25px rgba(0,0,0,0.15)"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
                      bgGradient: 'linear(135deg, #f7fafc 0%, #edf2f7 100%)'
                    }}
                    transition="all 0.3s ease"
                    leftIcon={<Icon as={HiSearch} />}
                  >
                    Search Jobs Now
                  </Button>
                </VStack>
              </VStack>
            </Box>
          </VStack>

          {/* Bottom Stats Grid */}
          <SimpleGrid 
            columns={{ base: 2, md: 4 }} 
            spacing={6} 
            pt={12}
            gridColumn={{ lg: '1 / -1' }}
          >
            <StatCard
              icon={HiBriefcase}
              number="15K+"
              label="Active Jobs"
              trend="+12%"
            />
            <StatCard
              icon={HiUsers}
              number="8K+"
              label="Companies"
              trend="+5%"
            />
            <StatCard
              icon={HiTrendingUp}
              number="95%"
              label="Success Rate"
            />
            <StatCard
              icon={HiStar}
              number="4.9"
              label="User Rating"
            />
          </SimpleGrid>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Hero;