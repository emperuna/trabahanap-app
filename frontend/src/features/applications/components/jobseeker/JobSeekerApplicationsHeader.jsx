import React from 'react';
import {
  Box,
  HStack,
  Heading,
  Text,
  VStack,
  Button,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { HiSearch, HiSparkles } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const JobSeekerApplicationsHeader = ({ applicationsCount }) => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      bg="blue.600"
      borderRadius={{ base: 'xl', md: '2xl' }}
      overflow="hidden"
      position="relative"
    >
      {/* Gradient Background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgGradient="linear(120deg, blue.600 0%, blue.500 50%, purple.500 100%)"
        zIndex={0}
      />
      
      {/* Decorative circles */}
      <Box
        position="absolute"
        top="-20%"
        right="-5%"
        w="200px"
        h="200px"
        borderRadius="full"
        bg="whiteAlpha.100"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="-30%"
        left="10%"
        w="150px"
        h="150px"
        borderRadius="full"
        bg="whiteAlpha.50"
        zIndex={0}
      />

      <HStack 
        justify="space-between" 
        align="center"
        p={{ base: 6, md: 8 }}
        position="relative"
        zIndex={1}
        flexWrap="wrap"
        gap={4}
      >
        <VStack align="start" spacing={2}>
          <HStack spacing={2}>
            <HiSparkles color="white" size={24} />
            <Heading 
              size={{ base: 'lg', md: 'xl' }}
              fontWeight="800"
              letterSpacing="-0.025em"
              color="white"
            >
              My Applications
            </Heading>
          </HStack>
          <Text 
            fontSize={{ base: 'sm', md: 'md' }}
            color="whiteAlpha.900"
            fontWeight="400"
          >
            Track and manage your {applicationsCount} {applicationsCount === 1 ? 'application' : 'applications'}
          </Text>
        </VStack>

        <Button
          colorScheme="yellow"
          size={isMobile ? 'md' : 'lg'}
          leftIcon={<HiSearch />}
          onClick={() => navigate('/find-jobs')}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          transition="all 0.2s"
        >
          {isMobile ? 'Find Jobs' : 'Find More Jobs'}
        </Button>
      </HStack>
    </Box>
  );
};

export default JobSeekerApplicationsHeader;