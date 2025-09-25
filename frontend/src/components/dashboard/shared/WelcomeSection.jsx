import React from 'react';
import {
  Box,
  Card,
  HStack,
  VStack,
  Text,
  Heading,
  Avatar,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';

const WelcomeSection = ({ user }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <Box
      bg="brand.400"
      borderRadius="2xl"
      overflow="hidden"
      position="relative"
    >
      {/* Diagonal Color Bands */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgGradient="linear(120deg, brand.500 0%, brand.500 50%, blue.600 50%, blue.600 66.67%, blue.700 66.67%, blue.700 83.33%, blue.800 83.33%, blue.800 100%)"
        zIndex={0}
      />
      
      {/* Content */}
      <Box p={8} position="relative" zIndex={1} color="white">
        <HStack spacing={6}>
          <Avatar
            size="xl"
            name={`${user?.firstName || ''} ${user?.lastName || ''}`}
            bg="whiteAlpha.300"
            color="white"
          />
          <VStack align="start" spacing={2} flex="1">
            <Text fontSize="lg" opacity={0.9} fontWeight="400">
              {getGreeting()}, 👋
            </Text>
            <Heading size="2xl" fontWeight="800" letterSpacing="-0.025em">
              {user?.firstName && user?.lastName 
                ? `${user.firstName} ${user.lastName}`
                : user?.username || 'User'
              }
            </Heading>
            <Badge bg="whiteAlpha.200" color="white" px={3} py={1} borderRadius="full">
              Job Seeker
            </Badge>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default WelcomeSection;
