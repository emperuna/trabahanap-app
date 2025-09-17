import React from 'react';
import {
  Card,
  CardBody,
  HStack,
  Heading,
  Badge,
  SimpleGrid,
  Button,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiSparkles,
  HiSearch,
  HiDocumentText,
  HiUser,
  HiBell,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

const QuickActionsCard = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  const actions = [
    { icon: HiSearch, label: 'Find Jobs', color: 'purple', path: '/jobs' },
    { icon: HiDocumentText, label: 'Update Resume', color: 'blue', path: '/dashboard/resume' },
    { icon: HiUser, label: 'Edit Profile', color: 'green', path: '/dashboard/profile' },
    { icon: HiBell, label: 'Job Alerts', color: 'orange', path: '/dashboard/alerts' },
  ];

  return (
    <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor} w="full">
      <CardBody p={6}>
        <HStack justify="space-between" mb={6}>
          <HStack>
            <Icon as={HiSparkles} color="purple.500" boxSize={6} />
            <Heading size="md" color={textColor}>Quick Actions</Heading>
          </HStack>
          <Badge colorScheme="purple" variant="subtle" borderRadius="full" px={3}>
            4 Actions
          </Badge>
        </HStack>
        
        <SimpleGrid columns={2} spacing={4}>
          {actions.map((action, index) => (
            <Button
              key={index}
              as={Link}
              to={action.path}
              variant="ghost"
              h="80px"
              borderRadius="xl"
              border="1px"
              borderColor={borderColor}
              flexDirection="column"
              _hover={{
                bg: `${action.color}.50`,
                borderColor: `${action.color}.200`,
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s ease"
            >
              <Icon as={action.icon} boxSize={6} color={`${action.color}.500`} mb={2} />
              <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                {action.label}
              </Text>
            </Button>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default QuickActionsCard;
