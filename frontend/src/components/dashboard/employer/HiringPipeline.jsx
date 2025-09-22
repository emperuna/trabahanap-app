import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  VStack,
  HStack,
  Heading,
  Text,
  Progress,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const PipelineItem = ({ item }) => {
  return (
    <Box w="full">
      <HStack justify="space-between" mb={2}>
        <Text fontSize="sm" fontWeight="medium">
          {item.label}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {item.count}
        </Text>
      </HStack>
      <Progress 
        value={item.progress} 
        colorScheme={item.colorScheme} 
        size="md" 
        borderRadius="lg" 
        bg="gray.100"
        hasStripe
        isAnimated
      />
    </Box>
  );
};

const HiringPipeline = ({ pipelineData = [] }) => {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Card bg={cardBg} w="full" borderRadius="2xl">
      <CardHeader>
        <VStack align="start" spacing={1}>
          <Heading size="md" color="gray.800">
            Hiring Pipeline
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Track your hiring progress
          </Text>
        </VStack>
      </CardHeader>
      <CardBody pt={0}>
        <VStack spacing={4}>
          {pipelineData.length > 0 ? (
            pipelineData.map((item, index) => (
              <PipelineItem key={index} item={item} />
            ))
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
              <Text color="gray.500">
                No pipeline data available
              </Text>
            </Box>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

PipelineItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    colorScheme: PropTypes.string.isRequired,
  }).isRequired,
};

HiringPipeline.propTypes = {
  pipelineData: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    colorScheme: PropTypes.string.isRequired,
  })),
};

export default HiringPipeline;