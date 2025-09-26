import React from 'react';
import { SimpleGrid, Card, CardBody, HStack, VStack, Text, useColorModeValue } from '@chakra-ui/react';
import { 
  HiUserCircle, HiClock, HiEye, HiCheckCircle, HiXCircle 
} from 'react-icons/hi';

const EmployerApplicationsStats = ({ applications }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const getStatusStats = () => {
    return {
      total: applications.length,
      pending: applications.filter(app => app.status?.toUpperCase() === 'PENDING').length,
      reviewed: applications.filter(app => app.status?.toUpperCase() === 'REVIEWED').length,
      accepted: applications.filter(app => app.status?.toUpperCase() === 'ACCEPTED').length,
      rejected: applications.filter(app => app.status?.toUpperCase() === 'REJECTED').length,
    };
  };

  const stats = getStatusStats();

  const statsConfig = [
    { label: 'Total', value: stats.total, color: 'blue.500', icon: HiUserCircle },
    { label: 'Pending', value: stats.pending, color: 'yellow.500', icon: HiClock },
    { label: 'Reviewed', value: stats.reviewed, color: 'purple.500', icon: HiEye },
    { label: 'Accepted', value: stats.accepted, color: 'green.500', icon: HiCheckCircle },
    { label: 'Rejected', value: stats.rejected, color: 'red.500', icon: HiXCircle },
  ];

  return (
    <SimpleGrid columns={{ base: 2, md: 5 }} spacing={4}>
      {statsConfig.map((stat, index) => (
        <StatsCard 
          key={index}
          label={stat.label}
          value={stat.value}
          color={stat.color}
          icon={stat.icon}
          cardBg={cardBg}
          borderColor={borderColor}
          textColor={textColor}
          mutedColor={mutedColor}
        />
      ))}
    </SimpleGrid>
  );
};

const StatsCard = ({ 
  label, 
  value, 
  color, 
  icon: IconComponent, 
  cardBg, 
  borderColor, 
  textColor, 
  mutedColor 
}) => {
  return (
    <Card bg={cardBg} border="1px" borderColor={borderColor}>
      <CardBody p={4}>
        <HStack spacing={3}>
          <IconComponent color={color} size="24px" />
          <VStack align="start" spacing={0}>
            <Text fontSize="2xl" fontWeight="bold" color={textColor}>
              {value}
            </Text>
            <Text fontSize="sm" color={mutedColor}>
              {label}
            </Text>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default EmployerApplicationsStats;