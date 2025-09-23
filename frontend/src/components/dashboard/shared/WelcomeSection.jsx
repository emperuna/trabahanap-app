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
    <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor} overflow="hidden">
      <Box bgGradient="linear(135deg, purple.500, blue.500)" p={8} color="white">
        <HStack spacing={6}>
          <Avatar
            size="xl"
            name={`${user?.firstName || ''} ${user?.lastName || ''}`}
            bg="whiteAlpha.300"
            color="white"
          />
          <VStack align="start" spacing={2} flex="1">
            <Text fontSize="lg" opacity={0.9}>
              {getGreeting()}, 👋
            </Text>
            <Heading size="lg" fontWeight="bold">
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
    </Card>
  );
};

export default WelcomeSection;
