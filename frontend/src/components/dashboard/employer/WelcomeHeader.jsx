import React from 'react';
import {
  Box,
  HStack,
  VStack,
  Text,
  Heading,
  Avatar,
  Badge,
  Card,
  CardBody,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const WelcomeHeader = ({ user, greeting, stats }) => {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Card bg={cardBg} borderRadius="2xl" overflow="hidden">
      {/* Header Section */}
      <Box
        bgGradient="linear(135deg, blue.500, purple.500)"
        p={8}
        color="white"
      >
        <HStack spacing={6}>
          <Avatar
            size="xl"
            name={`${user?.firstName || ''} ${user?.lastName || ''}`}
            bg="whiteAlpha.200"
            color="white"
          />
          <VStack align="start" spacing={2}>
            <Text fontSize="lg" opacity={0.9}>
              {greeting},
            </Text>
            <Heading size="lg" fontWeight="bold">
              {user?.firstName && user?.lastName 
                ? `${user.firstName} ${user.lastName}`
                : user?.username || 'Employer'
              }
            </Heading>
            <HStack>
              <Badge colorScheme="green" variant="solid">
                Employer
              </Badge>
              <Badge colorScheme="blue" variant="outline" bg="whiteAlpha.200">
                Premium Account
              </Badge>
            </HStack>
          </VStack>
        </HStack>
      </Box>

      {/* Stats Section */}
      <CardBody>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
          <Stat textAlign="center">
            <StatLabel color="gray.600" fontSize="sm">Active Jobs</StatLabel>
            <StatNumber color="blue.500" fontSize="2xl">
              {stats.activeJobs}
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              +2 this week
            </StatHelpText>
          </Stat>

          <Stat textAlign="center">
            <StatLabel color="gray.600" fontSize="sm">Applications</StatLabel>
            <StatNumber color="green.500" fontSize="2xl">
              {stats.totalApplications}
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              +15 this week
            </StatHelpText>
          </Stat>

          <Stat textAlign="center">
            <StatLabel color="gray.600" fontSize="sm">Interviews</StatLabel>
            <StatNumber color="purple.500" fontSize="2xl">
              {stats.interviewsScheduled}
            </StatNumber>
            <StatHelpText>
              Scheduled this week
            </StatHelpText>
          </Stat>

          <Stat textAlign="center">
            <StatLabel color="gray.600" fontSize="sm">Hired</StatLabel>
            <StatNumber color="orange.500" fontSize="2xl">
              {stats.hiredCandidates}
            </StatNumber>
            <StatHelpText>
              This month
            </StatHelpText>
          </Stat>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

WelcomeHeader.propTypes = {
  user: PropTypes.object,
  greeting: PropTypes.string.isRequired,
  stats: PropTypes.shape({
    activeJobs: PropTypes.number,
    totalApplications: PropTypes.number,
    interviewsScheduled: PropTypes.number,
    hiredCandidates: PropTypes.number,
  }).isRequired,
};

export default WelcomeHeader;