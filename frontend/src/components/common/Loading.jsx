import React from 'react';
import { 
  Box, 
  Spinner, 
  VStack, 
  Text, 
  Center 
} from '@chakra-ui/react';

const Loading = ({ 
  size = 'lg', 
  text = 'Loading...', 
  fullScreen = false 
}) => {
  const content = (
    <VStack spacing={4}>
      <Spinner 
        size={size} 
        color="purple.500" 
        thickness="3px"
        speed="0.8s"
      />
      {text && (
        <Text color="text.secondary" fontSize="sm">
          {text}
        </Text>
      )}
    </VStack>
  );

  if (fullScreen) {
    return (
      <Center 
        position="fixed" 
        top={0} 
        left={0} 
        w="100vw" 
        h="100vh" 
        bg="bg.canvas"
        zIndex={9999}
      >
        {content}
      </Center>
    );
  }

  return (
    <Center py={8}>
      {content}
    </Center>
  );
};

export default Loading;
