import React from 'react';
import {
  Card,
  CardBody,
  HStack,
  VStack,
  Box,
  Heading,
  Badge,
  Button,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiCheckCircle,
  HiPlus,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

const ProfileProgressCard = ({ completion }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const tasks = [
    { task: 'Add profile photo', completed: false },
    { task: 'Upload resume', completed: true },
    { task: 'Add work experience', completed: true },
    { task: 'Add skills & certifications', completed: false },
  ];

  return (
    <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor} w="full">
      <CardBody p={6}>
        <HStack justify="space-between" mb={4}>
          <Heading size="md" color={textColor}>Profile Progress</Heading>
          <Badge colorScheme="orange" variant="subtle" borderRadius="full">
            {completion}%
          </Badge>
        </HStack>
        
        <Box mb={6}>
          <Box bg="gray.200" borderRadius="full" h="3" overflow="hidden">
            <Box 
              bg="linear-gradient(90deg, #153CF5, #3b82f6)" 
              h="full" 
              w={`${completion}%`}
              borderRadius="full"
            />
          </Box>
          <Text fontSize="xs" color={mutedColor} mt={2}>
            {100 - completion}% remaining to complete
          </Text>
        </Box>

        <VStack spacing={3} align="stretch">
          {tasks.map((item, index) => (
            <HStack key={index} p={3} bg="gray.50" borderRadius="lg">
              <Icon 
                as={item.completed ? HiCheckCircle : HiPlus} 
                color={item.completed ? 'green.500' : 'orange.500'} 
                boxSize={5} 
              />
              <Text fontSize="sm" color={textColor} flex="1">
                {item.task}
              </Text>
              {!item.completed && (
                <Button size="xs" colorScheme="blue" variant="ghost">
                  Add
                </Button>
              )}
            </HStack>
          ))}
        </VStack>

        <Button
          as={Link}
          to="/dashboard/profile/edit"
          colorScheme="blue"
          size="sm"
          w="full"
          mt={4}
          borderRadius="lg"
        >
          Complete Profile
        </Button>
      </CardBody>
    </Card>
  );
};

export default ProfileProgressCard;
