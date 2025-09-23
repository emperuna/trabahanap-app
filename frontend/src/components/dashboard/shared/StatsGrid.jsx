import React from 'react';
import {
  Card,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  HStack,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiBriefcase,
  HiHeart,
  HiEye,
  HiTrendingUp,
} from 'react-icons/hi';

const StatsGrid = ({ stats }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const statsConfig = [
    {
      icon: HiBriefcase,
      color: 'purple.500',
      label: 'THIS MONTH',
      value: stats.applications,
      title: 'Applications',
      helpText: '+23% from last month',
      helpColor: 'green.500',
    },
    {
      icon: HiHeart,
      color: 'blue.500',
      label: 'SAVED',
      value: stats.savedJobs,
      title: 'Saved Jobs',
      helpText: '2 new matches today',
      helpColor: 'blue.500',
    },
    {
      icon: HiEye,
      color: 'green.500',
      label: 'VIEWS',
      value: stats.profileViews,
      title: 'Profile Views',
      helpText: '+12 this week',
      helpColor: 'green.500',
    },
    {
      icon: HiTrendingUp,
      color: 'orange.500',
      label: 'PROFILE',
      value: `${stats.profileCompletion}%`,
      title: 'Completion',
      helpText: 'Complete to boost visibility',
      helpColor: 'orange.500',
    },
  ];

  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
      {statsConfig.map((stat, index) => (
        <Card key={index} bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor} p={6}>
          <Stat>
            <HStack justify="space-between" mb={3}>
              <Icon as={stat.icon} boxSize={8} color={stat.color} />
              <Text fontSize="xs" color={mutedColor} fontWeight="semibold">
                {stat.label}
              </Text>
            </HStack>
            <StatNumber fontSize="2xl" fontWeight="bold" color={textColor}>
              {stat.value}
            </StatNumber>
            <StatLabel color={mutedColor} fontSize="sm">
              {stat.title}
            </StatLabel>
            <StatHelpText color={stat.helpColor} fontSize="xs" mt={2}>
              {stat.helpText}
            </StatHelpText>
          </Stat>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default StatsGrid;
