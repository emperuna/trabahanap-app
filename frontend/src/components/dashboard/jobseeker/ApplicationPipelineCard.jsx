import React, { useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  VStack,
  Text,
  Badge,
  SimpleGrid,
  Icon,
  Button,
  Progress,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiClock,
  HiEye,
  HiUserGroup,
  HiCheckCircle,
  HiChartBar,
  HiArrowRight,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const ApplicationPipelineCard = ({ applications = [] }) => {
  const navigate = useNavigate();
  const [hoveredStage, setHoveredStage] = useState(null);

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const stageBg = useColorModeValue('gray.50', 'gray.700');
  const hoverBg = useColorModeValue('blue.50', 'blue.900');

  // Group applications by status
  const groupByStatus = () => {
    return {
      PENDING: applications.filter(app => app.status === 'PENDING'),
      REVIEWED: applications.filter(app => app.status === 'REVIEWED'),
      INTERVIEW: applications.filter(app => app.status === 'INTERVIEW'),
      ACCEPTED: applications.filter(app => app.status === 'ACCEPTED'),
    };
  };

  const grouped = groupByStatus();
  const totalActive = applications.length;
  const successRate = totalActive > 0 
    ? Math.round((grouped.ACCEPTED.length / totalActive) * 100) 
    : 0;

  // Simplified pipeline stages (4 stages instead of 5)
  const stages = [
    {
      key: 'PENDING',
      label: 'Applied',
      icon: HiClock,
      color: 'blue',
      count: grouped.PENDING.length,
      description: 'Applications submitted',
    },
    {
      key: 'REVIEWED',
      label: 'Under Review',
      icon: HiEye,
      color: 'purple',
      count: grouped.REVIEWED.length,
      description: 'Being evaluated',
    },
    {
      key: 'INTERVIEW',
      label: 'Interview',
      icon: HiUserGroup,
      color: 'orange',
      count: grouped.INTERVIEW.length,
      description: 'Interview scheduled',
    },
    {
      key: 'ACCEPTED',
      label: 'Offer',
      icon: HiCheckCircle,
      color: 'green',
      count: grouped.ACCEPTED.length,
      description: 'Offer received',
    },
  ];

  // Calculate progress percentage
  const calculateProgress = () => {
    if (totalActive === 0) return 0;
    const weights = { PENDING: 25, REVIEWED: 50, INTERVIEW: 75, ACCEPTED: 100 };
    const totalWeight = applications.reduce((sum, app) => {
      return sum + (weights[app.status] || 0);
    }, 0);
    return Math.round(totalWeight / totalActive);
  };

  const StageCard = ({ stage }) => {
    const isHovered = hoveredStage === stage.key;
    const hasApplications = stage.count > 0;

    return (
      <Box
        bg={isHovered ? hoverBg : stageBg}
        p={5}
        borderRadius="xl"
        borderWidth="1px"
        borderColor={isHovered ? `${stage.color}.300` : borderColor}
        transition="all 0.3s"
        cursor="pointer"
        onClick={() => navigate(`/dashboard/applications?status=${stage.key}`)}
        onMouseEnter={() => setHoveredStage(stage.key)}
        onMouseLeave={() => setHoveredStage(null)}
        position="relative"
        overflow="hidden"
        _hover={{
          transform: 'translateY(-4px)',
          boxShadow: 'lg',
        }}
      >
        {/* Background gradient indicator */}
        {hasApplications && (
          <Box
            position="absolute"
            top="0"
            right="0"
            width="4px"
            height="100%"
            bg={`${stage.color}.400`}
            opacity={isHovered ? 1 : 0.6}
            transition="all 0.3s"
          />
        )}

        <VStack align="stretch" spacing={3}>
          {/* Icon & Count */}
          <HStack justify="space-between">
            <Box
              bg={`${stage.color}.100`}
              p={2}
              borderRadius="lg"
              display="inline-flex"
            >
              <Icon 
                as={stage.icon} 
                boxSize="20px" 
                color={`${stage.color}.600`}
              />
            </Box>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              color={hasApplications ? `${stage.color}.600` : 'gray.400'}
            >
              {stage.count}
            </Text>
          </HStack>

          {/* Label */}
          <Box>
            <Text fontSize="md" fontWeight="semibold" mb={1}>
              {stage.label}
            </Text>
            <Text fontSize="xs" color="gray.600">
              {stage.description}
            </Text>
          </Box>

          {/* Mini progress indicator */}
          {hasApplications && (
            <Box>
              <Progress
                value={100}
                size="xs"
                colorScheme={stage.color}
                borderRadius="full"
              />
            </Box>
          )}
        </VStack>
      </Box>
    );
  };

  return (
    <Card boxShadow="lg" borderRadius="2xl" bg={cardBg}>
      <CardHeader pb={3}>
        <HStack justify="space-between" align="start">
          <Box>
            <Heading size="md" mb={1}>
              Application Pipeline
            </Heading>
            <Text fontSize="sm" color="gray.600">
              Track your application progress
            </Text>
          </Box>
          <Button
            size="sm"
            variant="ghost"
            rightIcon={<HiArrowRight />}
            onClick={() => navigate('/dashboard/applications')}
            borderRadius="lg"
            colorScheme="blue"
          >
            View All
          </Button>
        </HStack>
      </CardHeader>

      <CardBody pt={3}>
        <VStack spacing={6} align="stretch">
          {/* Overall Progress Bar */}
          {totalActive > 0 && (
            <Box>
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                  Overall Progress
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="blue.600">
                  {calculateProgress()}%
                </Text>
              </HStack>
              <Progress
                value={calculateProgress()}
                size="sm"
                colorScheme="blue"
                borderRadius="full"
                bg="gray.200"
              />
            </Box>
          )}

          {/* Pipeline Stages */}
          <SimpleGrid 
            columns={{ base: 2, md: 4 }} 
            spacing={4}
          >
            {stages.map((stage) => (
              <StageCard key={stage.key} stage={stage} />
            ))}
          </SimpleGrid>

          {/* Summary Stats */}
          {totalActive > 0 ? (
            <Box
              mt={2}
              p={4}
              bg={stageBg}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <SimpleGrid columns={{ base: 2, sm: 4 }} spacing={4}>
                <VStack spacing={1}>
                  <HStack spacing={1}>
                    <Icon as={HiChartBar} boxSize="16px" color="blue.500" />
                    <Text fontSize="xs" color="gray.600" fontWeight="medium">
                      Total
                    </Text>
                  </HStack>
                  <Text fontSize="xl" fontWeight="bold" color="blue.600">
                    {totalActive}
                  </Text>
                </VStack>

                <VStack spacing={1}>
                  <HStack spacing={1}>
                    <Icon as={HiUserGroup} boxSize="16px" color="orange.500" />
                    <Text fontSize="xs" color="gray.600" fontWeight="medium">
                      Interviews
                    </Text>
                  </HStack>
                  <Text fontSize="xl" fontWeight="bold" color="orange.600">
                    {grouped.INTERVIEW.length}
                  </Text>
                </VStack>

                <VStack spacing={1}>
                  <HStack spacing={1}>
                    <Icon as={HiCheckCircle} boxSize="16px" color="green.500" />
                    <Text fontSize="xs" color="gray.600" fontWeight="medium">
                      Offers
                    </Text>
                  </HStack>
                  <Text fontSize="xl" fontWeight="bold" color="green.600">
                    {grouped.ACCEPTED.length}
                  </Text>
                </VStack>

                <VStack spacing={1}>
                  <HStack spacing={1}>
                    <Icon as={HiChartBar} boxSize="16px" color="purple.500" />
                    <Text fontSize="xs" color="gray.600" fontWeight="medium">
                      Success
                    </Text>
                  </HStack>
                  <Text fontSize="xl" fontWeight="bold" color="purple.600">
                    {successRate}%
                  </Text>
                </VStack>
              </SimpleGrid>
            </Box>
          ) : (
            <Box
              p={8}
              textAlign="center"
              bg={stageBg}
              borderRadius="xl"
              borderWidth="2px"
              borderStyle="dashed"
              borderColor={borderColor}
            >
              <Icon as={HiClock} boxSize="48px" color="gray.400" mb={3} />
              <Text fontSize="md" fontWeight="semibold" color="gray.700" mb={1}>
                No applications yet
              </Text>
              <Text fontSize="sm" color="gray.600" mb={4}>
                Start applying to jobs to track your progress here
              </Text>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => navigate('/dashboard/find-jobs')}
                borderRadius="lg"
              >
                Browse Jobs
              </Button>
            </Box>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ApplicationPipelineCard;