import React from 'react';
import { Box, VStack, Heading, Text } from '@chakra-ui/react';

const JobSearchHeader = ({ totalJobs, filteredJobs }) => {
  return (
    <Box
      bg="blue.600"
      borderRadius="2xl"
      overflow="hidden"
      position="relative"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgGradient="linear(120deg, blue.600 0%, blue.500 50%, blue.400 100%)"
        zIndex={0}
      />
      
      <VStack spacing={4} p={10} position="relative" zIndex={1} align="start" w="full">
        <Heading 
          size="4xl" 
          fontWeight="800"
          letterSpacing="-0.025em"
          lineHeight="1"
          color="white"
        >
          Find Your
          <br />
          <Text as="span" fontWeight="800">
            Dream Job
          </Text>
        </Heading>
        <Text 
          fontSize="lg" 
          opacity={0.9}
          fontWeight="400"
          color="white"
        >
          Discover {filteredJobs} of {totalJobs} job opportunities
        </Text>
      </VStack>
    </Box>
  );
};

export default JobSearchHeader;