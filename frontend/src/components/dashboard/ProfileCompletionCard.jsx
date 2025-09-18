import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Progress,
  VStack,
  HStack,
  Icon,
  Button,
  SimpleGrid,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiUser,
  HiDocumentText,
  HiCamera,
  HiAcademicCap,
  HiCheckCircle,
  HiExclamationCircle,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

const ProfileCompletionCard = ({ completion = 75 }) => {
  const cardBg = useColorModeValue('white', 'gray.800');

  const completionItems = [
    {
      label: 'Basic Information',
      completed: true,
      icon: HiUser,
      description: 'Name, email, phone number',
    },
    {
      label: 'Profile Photo',
      completed: false,
      icon: HiCamera,
      description: 'Professional headshot',
    },
    {
      label: 'Resume Upload',
      completed: true,
      icon: HiDocumentText,
      description: 'Latest CV or resume',
    },
    {
      label: 'Skills & Experience',
      completed: false,
      icon: HiAcademicCap,
      description: 'Work history and skills',
    },
  ];

  const getProgressColor = () => {
    if (completion >= 80) return 'green';
    if (completion >= 60) return 'yellow';
    return 'red';
  };

  return (
    <Card bg={cardBg} borderRadius="2xl" overflow="hidden">
      <CardHeader pb={4}>
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Heading size="md" color="gray.800">
              Profile Completion
            </Heading>
            <Text fontSize="sm" color="gray.600">
              Complete your profile to get better job matches
            </Text>
          </VStack>
          <Badge
            colorScheme={getProgressColor()}
            variant="subtle"
            fontSize="lg"
            px={3}
            py={1}
            borderRadius="full"
          >
            {completion}%
          </Badge>
        </HStack>
      </CardHeader>

      <CardBody pt={0}>
        <VStack spacing={6}>
          {/* Progress Bar */}
          <Box w="full">
            <Progress
              value={completion}
              colorScheme={getProgressColor()}
              size="lg"
              borderRadius="full"
              bg="gray.100"
            />
            <HStack justify="space-between" mt={2}>
              <Text fontSize="xs" color="gray.500">
                {completion < 100 ? 'Almost there!' : 'Complete!'}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {100 - completion}% remaining
              </Text>
            </HStack>
          </Box>

          {/* Completion Items */}
          <SimpleGrid columns={1} spacing={4} w="full">
            {completionItems.map((item, index) => (
              <HStack
                key={index}
                p={4}
                bg={item.completed ? 'green.50' : 'orange.50'}
                borderRadius="xl"
                border="1px"
                borderColor={item.completed ? 'green.200' : 'orange.200'}
              >
                <Icon
                  as={item.completed ? HiCheckCircle : HiExclamationCircle}
                  color={item.completed ? 'green.500' : 'orange.500'}
                  boxSize={5}
                />
                <Box flex="1">
                  <Text fontWeight="semibold" fontSize="sm" color="gray.800">
                    {item.label}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {item.description}
                  </Text>
                </Box>
                {!item.completed && (
                  <Button
                    size="sm"
                    colorScheme="orange"
                    variant="ghost"
                    fontSize="xs"
                  >
                    Add
                  </Button>
                )}
              </HStack>
            ))}
          </SimpleGrid>

          {/* CTA Button */}
          <Button
            as={Link}
            to="/dashboard/profile/edit"
            colorScheme="purple"
            size="lg"
            w="full"
            borderRadius="xl"
            h={12}
          >
            Complete Profile
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ProfileCompletionCard;