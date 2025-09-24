import React from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  Progress,
} from '@chakra-ui/react';
import { HiCheckCircle } from 'react-icons/hi';

const StepProgress = ({ steps, currentStep }) => {
  return (
    <>
      {/* Progress Steps */}
      <HStack spacing={6} pt={4}>
        {steps.map((step) => (
          <VStack key={step.number} spacing={2}>
            <Box
              w={10}
              h={10}
              borderRadius="full"
              bg={currentStep >= step.number ? 'white' : 'whiteAlpha.300'}
              color={currentStep >= step.number ? 'blue.500' : 'whiteAlpha.700'}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              fontSize="sm"
              transition="all 0.3s ease"
            >
              {currentStep > step.number ? (
                <HiCheckCircle size={20} />
              ) : (
                step.number
              )}
            </Box>
            <Text
              fontSize="xs"
              color={currentStep >= step.number ? 'white' : 'whiteAlpha.700'}
              fontWeight="medium"
            >
              {step.title}
            </Text>
          </VStack>
        ))}
      </HStack>

      {/* Progress Bar */}
      <Box w="full" px={4}>
        <Progress
          value={(currentStep / steps.length) * 100}
          colorScheme="whiteAlpha"
          bg="whiteAlpha.300"
          borderRadius="full"
          size="sm"
        />
      </Box>
    </>
  );
};

export default StepProgress;