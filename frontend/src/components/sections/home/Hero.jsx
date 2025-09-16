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
} from '@chakra-ui/react';
import { HiSearch, HiLocationMarker, HiBriefcase } from 'react-icons/hi';

const Hero = () => {
  const StatCard = ({ icon, number, label }) => (
    <VStack spacing={1}>
      <Icon as={icon} boxSize={8} color="purple.400" />
      <Text fontSize="2xl" fontWeight="bold" color="white">
        {number}
      </Text>
      <Text fontSize="sm" color="gray.300">
        {label}
      </Text>
    </VStack>
  );

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, purple.900, blue.900)"
      pt={20}
      pb={16}
      position="relative"
      overflow="hidden"
    >
      {/* Background Effects */}
      <Box
        position="absolute"
        top="20%"
        left="10%"
        w="300px"
        h="300px"
        bg="purple.500"
        borderRadius="full"
        filter="blur(100px)"
        opacity={0.3}
      />
      <Box
        position="absolute"
        bottom="20%"
        right="10%"
        w="400px"
        h="400px"
        bg="blue.500"
        borderRadius="full"
        filter="blur(120px)"
        opacity={0.2}
      />

      <Container maxW="7xl" position="relative" zIndex={1}>
        <VStack spacing={12} textAlign="center">
          {/* Hero Content */}
          <VStack spacing={6} maxW="4xl">
            <Text
              color="purple.300"
              fontSize="lg"
              fontWeight="medium"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              🚀 Find Your Dream Job Today
            </Text>
            
            <Heading
              as="h1"
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              fontWeight="bold"
              color="white"
              lineHeight="shorter"
            >
              Discover Opportunities That{' '}
              <Text as="span" color="purple.400">
                Match Your Skills
              </Text>
            </Heading>
            
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color="gray.300"
              maxW="3xl"
              lineHeight="tall"
            >
              Connect with top employers and find jobs that align with your career goals.
              Your next opportunity is just a search away.
            </Text>
          </VStack>

          {/* Search Form */}
          <Box
            bg="bg.glass"
            backdropFilter="blur(20px)"
            p={8}
            borderRadius="2xl"
            border="1px solid"
            borderColor="border.subtle"
            maxW="5xl"
            w="full"
            boxShadow="2xl"
          >
            <VStack spacing={6}>
              <SimpleGrid 
                columns={{ base: 1, md: 3 }} 
                spacing={4} 
                w="full"
              >
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={HiSearch} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    variant="glass"
                    placeholder="Job title, keywords, or company"
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={HiLocationMarker} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    variant="glass"
                    placeholder="City or remote"
                  />
                </InputGroup>

                <Select
                  variant="glass"
                  placeholder="Job type"
                >
                  <option value="full-time" style={{ color: 'black' }}>Full Time</option>
                  <option value="part-time" style={{ color: 'black' }}>Part Time</option>
                  <option value="contract" style={{ color: 'black' }}>Contract</option>
                  <option value="remote" style={{ color: 'black' }}>Remote</option>
                </Select>
              </SimpleGrid>

              <Button
                size="lg"
                w={{ base: 'full', md: 'auto' }}
                px={12}
                py={6}
                variant="primaryGradient"
                fontSize="lg"
                fontWeight="bold"
                leftIcon={<Icon as={HiSearch} />}
              >
                Search Jobs
              </Button>
            </VStack>
          </Box>

          {/* Stats */}
          <SimpleGrid 
            columns={{ base: 2, md: 4 }} 
            spacing={8} 
            pt={8}
            w="full"
            maxW="4xl"
          >
            <StatCard
              icon={HiBriefcase}
              number="10K+"
              label="Active Jobs"
            />
            <StatCard
              icon={HiBriefcase}
              number="5K+"
              label="Companies"
            />
            <StatCard
              icon={HiBriefcase}
              number="50K+"
              label="Job Seekers"
            />
            <StatCard
              icon={HiBriefcase}
              number="95%"
              label="Success Rate"
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Hero;