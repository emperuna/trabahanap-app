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
  const bgColor = useColorModeValue('white', 'gray.900');
  const accentBg = useColorModeValue('blue.50', 'blue.900');

  const StatCard = ({ icon, number, label, trend }) => (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      p={6}
      borderRadius="2xl"
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      textAlign="center"
      transition="all 0.3s ease"
      boxShadow="sm"
      _hover={{
        transform: 'translateY(-8px)',
        boxShadow: 'xl',
        borderColor: useColorModeValue('blue.200', 'blue.600'),
      }}
    >
      <VStack spacing={3}>
        <Box
          p={3}
          bg={useColorModeValue('blue.50', 'blue.900')}
          borderRadius="xl"
          display="inline-block"
        >
          <Icon as={icon} boxSize={6} color="blue.500" />
        </Box>
        <VStack spacing={1}>
          <Flex align="center" gap={2}>
            <Text fontSize="3xl" fontWeight="bold" color={useColorModeValue('slate.900', 'white')}>
              {number}
            </Text>
            {trend && (
              <Badge
                colorScheme="green"
                variant="solid"
                fontSize="xs"
                borderRadius="full"
                px={2}
              >
                {trend}
              </Badge>
            )}
          </Flex>
          <Text fontSize="sm" color={useColorModeValue('slate.600', 'slate.400')} fontWeight="medium">
            {label}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );

  return (
    <Box
      minH="100vh"
      bg={bgColor}
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
    >
      <Box
        position="absolute"
        top="10%"
        right="5%"
        w="500px"
        h="500px"
        bg={useColorModeValue('blue.50', 'blue.900')}
        borderRadius="full"
        filter="blur(100px)"
        opacity={0.3}
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="20%"
        left="0%"
        w="400px"
        h="400px"
        bg={useColorModeValue('slate.100', 'slate.800')}
        borderRadius="full"
        filter="blur(80px)"
        opacity={0.2}
        zIndex={0}
      />

      <Container maxW="7xl" position="relative" zIndex={1} py={20}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} alignItems="center">
          {/* Left Content */}
          <VStack spacing={8} align="flex-start" textAlign="left">
            {/* Badge */}
            <Badge
              bg="blue.500"
              color="white"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              fontWeight="medium"
              boxShadow="md"
            >
              #1 Job Platform in the Philippines
            </Badge>

            {/* Main Heading */}
            <VStack spacing={4} align="flex-start">
              <Heading
                as="h1"
                fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                fontWeight="800"
                color={useColorModeValue('slate.900', 'white')}
                lineHeight="shorter"
                letterSpacing="-0.02em"
              >
                Hanap Trabaho{' '}
                <Text
                  as="span"
                  color="blue.500"
                  display="inline-block"
                >
                  Hanap Kinabukasan
                </Text>{' '}
              </Heading>
              
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color={useColorModeValue('slate.600', 'slate.300')}
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
                colorScheme="blue"
                fontWeight="600"
                borderRadius="2xl"
                boxShadow="lg"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'xl',
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
                variant="outline"
                colorScheme="blue"
                fontWeight="600"
                borderRadius="2xl"
                _hover={{
                  bg: 'blue.50',
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
                <Text fontSize="sm" color={useColorModeValue('slate.600', 'slate.400')}>
                  4.9/5 from 10k+ users
                </Text>
              </VStack>
              
              <Box w="1px" h={8} bg={useColorModeValue('gray.300', 'gray.600')} />
              
              <VStack spacing={1} align="flex-start">
                <Text fontSize="lg" fontWeight="bold" color={useColorModeValue('slate.900', 'white')}>
                  50K+
                </Text>
                <Text fontSize="sm" color={useColorModeValue('slate.600', 'slate.400')}>
                  Jobs posted daily
                </Text>
              </VStack>
            </HStack>
          </VStack>

          {/* Right Content - Search Card */}
          <VStack>
            <Box
              bg={useColorModeValue('white', 'gray.800')}
              p={8}
              borderRadius="3xl"
              border="1px solid"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              boxShadow="2xl"
            >
              <VStack spacing={6}>
                <VStack spacing={2} textAlign="center">
                  <Heading size="lg" color={useColorModeValue('slate.900', 'white')} fontWeight="700">
                    Start Your Search
                  </Heading>
                  <Text color={useColorModeValue('slate.600', 'slate.400')} fontSize="sm">
                    Find the perfect opportunity for you
                  </Text>
                </VStack>

                <VStack spacing={4} w="full">
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" h={12}>
                      <Icon as={HiSearch} color={useColorModeValue('gray.400', 'gray.500')} />
                    </InputLeftElement>
                    <Input
                      h={12}
                      bg={useColorModeValue('gray.50', 'gray.700')} // ✅ CHANGED: Light gray background
                      border="1px solid"
                      borderColor={useColorModeValue('gray.200', 'gray.600')}
                      borderRadius="xl"
                      color={useColorModeValue('slate.900', 'white')}
                      placeholder="Job title or keywords"
                      _placeholder={{ color: useColorModeValue('gray.500', 'gray.400') }}
                      _focus={{
                        borderColor: 'blue.500', // ✅ CHANGED: Blue focus
                        bg: useColorModeValue('white', 'gray.600'),
                        boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.2)'
                      }}
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputLeftElement pointerEvents="none" h={12}>
                      <Icon as={HiLocationMarker} color={useColorModeValue('gray.400', 'gray.500')} />
                    </InputLeftElement>
                    <Input
                      h={12}
                      bg={useColorModeValue('gray.50', 'gray.700')}
                      border="1px solid"
                      borderColor={useColorModeValue('gray.200', 'gray.600')}
                      borderRadius="xl"
                      color={useColorModeValue('slate.900', 'white')}
                      placeholder="City or remote"
                      _placeholder={{ color: useColorModeValue('gray.500', 'gray.400') }}
                      _focus={{
                        borderColor: 'blue.500',
                        bg: useColorModeValue('white', 'gray.600'),
                        boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.2)'
                      }}
                    />
                  </InputGroup>

                  <Select
                    h={12}
                    bg={useColorModeValue('gray.50', 'gray.700')}
                    border="1px solid"
                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                    borderRadius="xl"
                    color={useColorModeValue('slate.900', 'white')}
                    placeholder="Select job type"
                    _focus={{
                      borderColor: 'blue.500',
                      bg: useColorModeValue('white', 'gray.600')
                    }}
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="remote">Remote</option>
                  </Select>

                  <Button
                    w="full"
                    size="lg"
                    h={14}
                    colorScheme="blue"
                    fontWeight="600"
                    borderRadius="xl"
                    boxShadow="lg"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'xl',
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