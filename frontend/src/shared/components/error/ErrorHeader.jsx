import React from 'react';
import { VStack, Box, Text, Image } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import logo from '../../../assets/logo/TrabaHanap-Logo.svg';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const ErrorHeader = () => {
  return (
    <VStack spacing={6}>
      <Box
        p={6}
        bg="whiteAlpha.200"
        borderRadius="3xl"
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor="whiteAlpha.300"
        animation={`${float} 4s ease-in-out infinite`}
      >
        <Image
          src={logo}
          alt="TrabaHanap"
          h={20}
          w={20}
          filter="brightness(0) invert(1)"
        />
      </Box>
      
      <Text 
        fontSize="xl" 
        color="whiteAlpha.900" 
        fontWeight="medium"
        letterSpacing="wide"
      >
        TRABAHANAP
      </Text>
    </VStack>
  );
};

export default ErrorHeader;