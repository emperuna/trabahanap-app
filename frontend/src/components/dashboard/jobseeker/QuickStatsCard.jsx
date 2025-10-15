import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  VStack,
  HStack,
  Text,
  Progress,
  Box,
  Icon,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiBriefcase,
  HiBookmark,
  HiEye,
  HiUserCircle,
} from 'react-icons/hi';

const QuickStatsCard = ({ applications = [], stats = {} }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Calculate this week's applications
  const thisWeekCount = applications.filter(app => {
    const appDate = new Date(app.appliedAt || app.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return appDate >= weekAgo;
  }).length;

  const statItems = [
    {
      icon: HiBriefcase,
      label: 'Applications',
      value: stats.applications || 0,
      color: 'blue',
      sublabel: `${thisWeekCount} this week`,
    },
    {
      icon: HiBookmark,
      label: 'Saved Jobs',
      value: stats.savedJobs || 0,
      color: 'purple',
      sublabel: 'Ready to apply',
    },
    {
      icon: HiEye,
      label: 'Profile Views',
      value: stats.profileViews || 0,
      color: 'green',
      sublabel: 'Employer interest',
    },
  ];

  return (
    <Card 
      bg={cardBg} 
      borderRadius="2xl" 
      boxShadow="lg"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <CardHeader pb={3}>
        <Heading size="md">Quick Stats</Heading>
        <Text fontSize="sm" color="gray.600" mt={1}>
          Your activity summary
        </Text>
      </CardHeader>

      <CardBody pt={3}>
        <VStack spacing={4} align="stretch">
          {/* Other Stats */}
          {statItems.map((stat, index) => (
            <HStack key={index} justify="space-between">
              <HStack spacing={2}>
                <Icon as={stat.icon} color={`${stat.color}.500`} boxSize="18px" />
                <Box>
                  <Text fontSize="sm" fontWeight="medium">
                    {stat.label}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {stat.sublabel}
                  </Text>
                </Box>
              </HStack>
              <Text fontSize="2xl" fontWeight="bold" color={`${stat.color}.600`}>
                {stat.value}
              </Text>
            </HStack>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default QuickStatsCard;