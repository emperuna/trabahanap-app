import React from 'react';
import { VStack, Box, Heading, Text, Badge, Icon } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { HiExclamation } from 'react-icons/hi';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const ErrorContent = ({ errorCode, title, message, showComingSoon, featureName }) => {
  return (
    <VStack spacing={8} maxW="4xl">
      <VStack spacing={4}>
        <Box
          fontSize="8xl"
          fontWeight="black"
          color="white"
          lineHeight="none"
          textShadow="0 4px 20px rgba(0,0,0,0.3)"
          animation={`${float} 3s ease-in-out infinite`}
        >
          {errorCode === 'SOON' ? (
            <Icon as={HiExclamation} boxSize={32} />
          ) : (
            errorCode
          )}
        </Box>
        
        <Heading 
          size="2xl" 
          color="white" 
          fontWeight="bold"
          textShadow="0 2px 10px rgba(0,0,0,0.3)"
        >
          {title}
        </Heading>
        
        {showComingSoon && (
          <Badge
            bg="yellow.400"
            color="yellow.900"
            px={6}
            py={3}
            borderRadius="full"
            fontSize="lg"
            fontWeight="bold"
            textTransform="none"
            boxShadow="0 4px 15px rgba(0,0,0,0.2)"
          >
            {featureName} - Coming Soon
          </Badge>
        )}
      </VStack>

      <Text 
        fontSize="xl" 
        color="whiteAlpha.900" 
        lineHeight="tall"
        maxW="2xl"
        textShadow="0 1px 5px rgba(0,0,0,0.3)"
      >
        {message}
      </Text>

      {!showComingSoon && (
        <Text 
          fontSize="lg" 
          color="whiteAlpha.800" 
          maxW="xl"
        >
          Don't worry, let's get you back on track to finding your dream job.
        </Text>
      )}
    </VStack>
  );
};

export default ErrorContent;