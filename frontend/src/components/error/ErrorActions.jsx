import React from 'react';
import { VStack, HStack, Button, Box, Text, Icon } from '@chakra-ui/react';
import { HiArrowLeft, HiHome, HiRefresh, HiMail } from 'react-icons/hi';

const ErrorActions = ({ onGoBack, onGoHome, onRefresh }) => {
  return (
    <>
      {/* Action Buttons */}
      <VStack spacing={6} w="full" maxW="md">
        <HStack spacing={4} w="full">
          <Button
            leftIcon={<HiArrowLeft />}
            onClick={onGoBack}
            size="lg"
            h={14}
            bg="whiteAlpha.200"
            color="white"
            borderRadius="xl"
            border="1px solid"
            borderColor="whiteAlpha.300"
            backdropFilter="blur(20px)"
            flex={1}
            _hover={{
              bg: 'whiteAlpha.300',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
            }}
            _active={{
              transform: 'translateY(0)',
            }}
            transition="all 0.2s ease"
          >
            Go Back
          </Button>
          
          <Button
            leftIcon={<HiHome />}
            onClick={onGoHome}
            size="lg"
            h={14}
            bg="white"
            color="purple.600"
            borderRadius="xl"
            flex={1}
            fontWeight="bold"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
            }}
            _active={{
              transform: 'translateY(0)',
            }}
            transition="all 0.2s ease"
          >
            Take Me Home
          </Button>
        </HStack>
        
        <Button
          leftIcon={<HiRefresh />}
          onClick={onRefresh}
          variant="ghost"
          size="md"
          color="whiteAlpha.800"
          _hover={{ 
            color: 'white',
            bg: 'whiteAlpha.200' 
          }}
        >
          Try Again
        </Button>
      </VStack>

      {/* Support Contact */}
      <Box
        bg="whiteAlpha.200"
        backdropFilter="blur(20px)"
        borderRadius="xl"
        p={6}
        border="1px solid"
        borderColor="whiteAlpha.300"
        maxW="md"
        w="full"
      >
        <HStack spacing={3} justify="center">
          <Icon as={HiMail} color="white" boxSize={5} />
          <VStack spacing={1} align="flex-start">
            <Text fontSize="sm" color="whiteAlpha.900" fontWeight="medium">
              Need help? Contact support
            </Text>
            <Text fontSize="sm" color="white" fontWeight="bold">
              support@trabahanap.com
            </Text>
          </VStack>
        </HStack>
      </Box>
    </>
  );
};

export default ErrorActions;