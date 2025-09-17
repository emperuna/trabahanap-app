import React from 'react';
import { Box } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const ErrorBackground = () => {
  return (
    <>
      <Box
        position="absolute"
        top="-10%"
        left="-10%"
        w="120%"
        h="120%"
        bg="whiteAlpha.50"
        borderRadius="50%"
        transform="rotate(15deg)"
        animation={`${float} 6s ease-in-out infinite`}
      />
      
      <Box
        position="absolute"
        bottom="-20%"
        right="-15%"
        w="80%"
        h="80%"
        bg="whiteAlpha.100"
        borderRadius="50%"
        transform="rotate(-10deg)"
        animation={`${float} 8s ease-in-out infinite reverse`}
      />
    </>
  );
};

export default ErrorBackground;