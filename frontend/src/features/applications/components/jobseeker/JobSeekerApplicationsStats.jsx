import React from 'react';
import {
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiDocumentText,
  HiClock,
  HiCheckCircle,
  HiXCircle,
} from 'react-icons/hi';

const JobSeekerApplicationsStats = ({ applications }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status?.toUpperCase() === 'PENDING').length,
    accepted: applications.filter(app => app.status?.toUpperCase() === 'ACCEPTED').length,
    rejected: applications.filter(app => app.status?.toUpperCase() === 'REJECTED').length,
  };

  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
      <Stat
        px={6}
        py={4}
        bg={cardBg}
        borderRadius="xl"
        border="1px"
        borderColor={borderColor}
      >
        <StatLabel fontSize="sm" color="gray.500">Total Applications</StatLabel>
        <StatNumber fontSize="3xl" color="blue.500">
          {stats.total}
        </StatNumber>
        <StatHelpText mb={0}>
          <Icon as={HiDocumentText} mr={1} />
          All time
        </StatHelpText>
      </Stat>

      <Stat
        px={6}
        py={4}
        bg={cardBg}
        borderRadius="xl"
        border="1px"
        borderColor={borderColor}
      >
        <StatLabel fontSize="sm" color="gray.500">Pending Review</StatLabel>
        <StatNumber fontSize="3xl" color="yellow.500">
          {stats.pending}
        </StatNumber>
        <StatHelpText mb={0}>
          <Icon as={HiClock} mr={1} />
          Awaiting response
        </StatHelpText>
      </Stat>

      <Stat
        px={6}
        py={4}
        bg={cardBg}
        borderRadius="xl"
        border="1px"
        borderColor={borderColor}
      >
        <StatLabel fontSize="sm" color="gray.500">Accepted</StatLabel>
        <StatNumber fontSize="3xl" color="green.500">
          {stats.accepted}
        </StatNumber>
        <StatHelpText mb={0}>
          <Icon as={HiCheckCircle} mr={1} />
          Success rate
        </StatHelpText>
      </Stat>

      <Stat
        px={6}
        py={4}
        bg={cardBg}
        borderRadius="xl"
        border="1px"
        borderColor={borderColor}
      >
        <StatLabel fontSize="sm" color="gray.500">Not Selected</StatLabel>
        <StatNumber fontSize="3xl" color="red.500">
          {stats.rejected}
        </StatNumber>
        <StatHelpText mb={0}>
          <Icon as={HiXCircle} mr={1} />
          Keep trying
        </StatHelpText>
      </Stat>
    </SimpleGrid>
  );
};

export default JobSeekerApplicationsStats;