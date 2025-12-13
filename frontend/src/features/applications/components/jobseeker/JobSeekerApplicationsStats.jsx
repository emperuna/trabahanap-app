import React from 'react';
import {
  SimpleGrid,
  Box,
  HStack,
  VStack,
  Text,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiDocumentText,
  HiClock,
  HiCheckCircle,
  HiXCircle,
} from 'react-icons/hi';

const StatCard = ({ label, value, icon, color, helpText }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const iconBg = useColorModeValue(`${color}.50`, `${color}.900`);

  return (
    <Box
      bg={cardBg}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      borderLeftWidth="4px"
      borderLeftColor={`${color}.500`}
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        shadow: 'md',
        transform: 'translateY(-2px)',
      }}
    >
      <HStack p={5} spacing={4}>
        <Box
          p={3}
          borderRadius="lg"
          bg={iconBg}
        >
          <Icon as={icon} boxSize={6} color={`${color}.500`} />
        </Box>
        <VStack align="start" spacing={0} flex={1}>
          <Text fontSize="sm" color="gray.500" fontWeight="500">
            {label}
          </Text>
          <Text fontSize="2xl" fontWeight="700" color={`${color}.500`}>
            {value}
          </Text>
          <Text fontSize="xs" color="gray.400">
            {helpText}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

const JobSeekerApplicationsStats = ({ applications }) => {
  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status?.toUpperCase() === 'PENDING').length,
    accepted: applications.filter(app => app.status?.toUpperCase() === 'ACCEPTED').length,
    rejected: applications.filter(app => app.status?.toUpperCase() === 'REJECTED').length,
  };

  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
      <StatCard
        label="Total Applications"
        value={stats.total}
        icon={HiDocumentText}
        color="blue"
        helpText="All time"
      />
      <StatCard
        label="Pending Review"
        value={stats.pending}
        icon={HiClock}
        color="yellow"
        helpText="Awaiting response"
      />
      <StatCard
        label="Accepted"
        value={stats.accepted}
        icon={HiCheckCircle}
        color="green"
        helpText="Congratulations!"
      />
      <StatCard
        label="Not Selected"
        value={stats.rejected}
        icon={HiXCircle}
        color="red"
        helpText="Keep trying"
      />
    </SimpleGrid>
  );
};

export default JobSeekerApplicationsStats;