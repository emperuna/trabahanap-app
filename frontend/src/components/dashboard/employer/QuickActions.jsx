import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiPlus,
  HiClipboardList,
  HiUserGroup,
  HiChartBar,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  const cardBg = useColorModeValue('white', 'gray.800');

  const actions = [
    {
      label: 'Post New Job',
      description: 'Create job posting',
      icon: HiPlus,
      path: '/employer-dashboard?section=postJob',
      colorScheme: 'blue',
      variant: 'solid'
    },
    {
      label: 'Review Applications',
      description: '12 pending',
      icon: HiClipboardList,
      path: '/employer-dashboard?section=applications',
      colorScheme: 'purple',
      variant: 'outline'
    },
    {
      label: 'Manage Candidates',
      description: 'View pipeline',
      icon: HiUserGroup,
      path: '/employer-dashboard?section=candidates',
      colorScheme: 'green',
      variant: 'outline'
    },
    {
      label: 'View Analytics',
      description: 'Hiring insights',
      icon: HiChartBar,
      path: '/employer-dashboard?section=analytics',
      colorScheme: 'orange',
      variant: 'outline'
    }
  ];

  return (
    <Card bg={cardBg} w="full" borderRadius="2xl">
      <CardHeader>
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Heading size="md" color="gray.800">
              Quick Actions
            </Heading>
            <Text fontSize="sm" color="gray.600">
              Manage your hiring process
            </Text>
          </VStack>
        </HStack>
      </CardHeader>
      <CardBody pt={0}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {actions.map((action) => (
            <Button
              key={action.path}
              as={Link}
              to={action.path}
              size="lg"
              h={16}
              leftIcon={<Icon as={action.icon} boxSize={5} />}
              colorScheme={action.colorScheme}
              variant={action.variant}
              borderRadius="xl"
              flexDirection="column"
              spacing={2}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
              }}
              transition="all 0.2s ease"
            >
              <Text fontWeight="semibold">{action.label}</Text>
              <Text fontSize="xs" opacity={0.8}>{action.description}</Text>
            </Button>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default QuickActions;