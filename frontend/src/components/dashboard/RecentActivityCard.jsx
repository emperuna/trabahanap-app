import React from 'react';
import {
  Card,
  CardBody,
  HStack,
  VStack,
  Box,
  Heading,
  Button,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiClock,
  HiCheckCircle,
} from 'react-icons/hi';

const RecentActivityCard = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const activities = [
    { action: 'Applied to Software Engineer at TechCorp', time: '2 hours ago', status: 'success' },
    { action: 'Profile viewed by HR Manager', time: '5 hours ago', status: 'info' },
    { action: 'Saved Frontend Developer position', time: '1 day ago', status: 'default' },
  ];

  return (
    <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor} w="full">
      <CardBody p={6}>
        <HStack justify="space-between" mb={6}>
          <HStack>
            <Icon as={HiClock} color="blue.500" boxSize={6} />
            <Heading size="md" color={textColor}>Recent Activity</Heading>
          </HStack>
          <Button size="sm" variant="ghost" colorScheme="blue">
            View All
          </Button>
        </HStack>
        
        <VStack spacing={4} align="stretch">
          {activities.map((item, index) => (
            <HStack key={index} p={4} bg="gray.50" borderRadius="lg">
              <Icon 
                as={item.status === 'success' ? HiCheckCircle : HiClock} 
                color={item.status === 'success' ? 'green.500' : 'blue.500'} 
                boxSize={5} 
              />
              <Box flex="1">
                <Text fontSize="sm" fontWeight="medium" color={textColor}>
                  {item.action}
                </Text>
                <Text fontSize="xs" color={mutedColor}>
                  {item.time}
                </Text>
              </Box>
            </HStack>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default RecentActivityCard;
