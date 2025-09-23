import React from 'react';
import {
  Box,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const AboutMe = () => {
  const mutedColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <Box>
      <Box p={{ base: 6, md: 8 }}>
        <VStack spacing={6} align="stretch">
          <Text 
            color={mutedColor} 
            lineHeight="loose" 
            fontSize="lg"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
          <Text 
            color={mutedColor} 
            lineHeight="loose" 
            fontSize="lg"
          >
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default AboutMe;