import React from 'react';
import { SimpleGrid, Card, CardBody, HStack, VStack, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { HiDocumentText, HiClock, HiEye, HiCheckCircle } from 'react-icons/hi';

const ApplicationsStats = ({ applications }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const stats = [
    {
      icon: HiDocumentText,
      label: 'Total Applications',
      value: applications.length,
      color: 'blue.500'
    },
    {
      icon: HiClock,
      label: 'Pending',
      value: applications.filter(app => app.status?.toUpperCase() === 'PENDING').length,
      color: 'yellow.500'
    },
    {
      icon: HiEye,
      label: 'Under Review',
      value: applications.filter(app => app.status?.toUpperCase() === 'REVIEWED').length,
      color: 'blue.500'
    },
    {
      icon: HiCheckCircle,
      label: 'Accepted',
      value: applications.filter(app => app.status?.toUpperCase() === 'ACCEPTED').length,
      color: 'green.500'
    }
  ];

  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
      {stats.map((stat, index) => (
        <Card key={index} bg={cardBg} border="1px" borderColor={borderColor}>
          <CardBody p={4}>
            <HStack spacing={3}>
              <Icon as={stat.icon} color={stat.color} boxSize={6} />
              <VStack align="start" spacing={0}>
                <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                  {stat.value}
                </Text>
                <Text fontSize="sm" color={mutedColor}>
                  {stat.label}
                </Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default ApplicationsStats;