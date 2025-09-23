import React from 'react';
import {
  Box,
  Spinner,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const Loading = ({ message = "Loading..." }) => {
  const bgColor = useColorModeValue('white', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box
      bg={bgColor}
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text color={textColor} fontSize="lg">
          {message}
        </Text>
      </VStack>
    </Box>
  );
};

export default Loading;
