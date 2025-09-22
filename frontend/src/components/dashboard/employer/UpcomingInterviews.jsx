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
  Icon,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { HiClock } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const InterviewItem = ({ interview, index }) => {
  const colors = [
    { bg: 'blue.50', border: 'blue.200', icon: 'blue.500', text: 'blue.600' },
    { bg: 'purple.50', border: 'purple.200', icon: 'purple.500', text: 'purple.600' },
    { bg: 'green.50', border: 'green.200', icon: 'green.500', text: 'green.600' },
    { bg: 'orange.50', border: 'orange.200', icon: 'orange.500', text: 'orange.600' },
  ];

  const color = colors[index % colors.length];

  return (
    <HStack 
      w="full" 
      p={3} 
      bg={color.bg} 
      borderRadius="lg" 
      border="1px" 
      borderColor={color.border}
      _hover={{
        transform: 'translateY(-1px)',
        boxShadow: 'sm'
      }}
      transition="all 0.2s ease"
    >
      <Icon as={HiClock} color={color.icon} />
      <VStack align="start" spacing={0} flex="1">
        <Text fontSize="sm" fontWeight="semibold">
          {interview.candidateName}
        </Text>
        <Text fontSize="xs" color="gray.600">
          {interview.position}
        </Text>
        <Text fontSize="xs" color={color.text}>
          {interview.date}
        </Text>
      </VStack>
    </HStack>
  );
};

const UpcomingInterviews = ({ interviews = [] }) => {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Card bg={cardBg} w="full" borderRadius="2xl">
      <CardHeader>
        <VStack align="start" spacing={1}>
          <Heading size="md" color="gray.800">
            Upcoming Interviews
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Scheduled for this week
          </Text>
        </VStack>
      </CardHeader>
      <CardBody pt={0}>
        <VStack spacing={3}>
          {interviews.length > 0 ? (
            <>
              {interviews.map((interview, index) => (
                <InterviewItem 
                  key={interview.id} 
                  interview={interview} 
                  index={index}
                />
              ))}
              <Button
                as={Link}
                to="/employer/interviews"
                variant="outline"
                size="sm"
                w="full"
                colorScheme="gray"
                _hover={{
                  transform: 'translateY(-1px)',
                  boxShadow: 'sm'
                }}
              >
                View All Interviews
              </Button>
            </>
          ) : (
            <Box 
              w="full" 
              p={6} 
              textAlign="center" 
              bg="gray.50" 
              borderRadius="xl"
              border="2px dashed"
              borderColor="gray.200"
            >
              <Icon as={HiClock} boxSize={8} color="gray.400" mb={2} />
              <Text color="gray.500" fontWeight="medium">
                No interviews scheduled
              </Text>
              <Text fontSize="sm" color="gray.400" mt={1}>
                Start reviewing applications to schedule interviews
              </Text>
            </Box>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

InterviewItem.propTypes = {
  interview: PropTypes.shape({
    id: PropTypes.number.isRequired,
    candidateName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

UpcomingInterviews.propTypes = {
  interviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    candidateName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.string,
  })),
};

export default UpcomingInterviews;