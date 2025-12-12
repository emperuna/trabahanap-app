import { useColorModeValue } from '@chakra-ui/react';

export const useProfileTheme = () => {
  return {
    bgColor: useColorModeValue('gray.50', 'gray.900'),
    cardBg: useColorModeValue('white', 'gray.800'),
    borderColor: useColorModeValue('gray.200', 'gray.700'),
    textColor: useColorModeValue('gray.800', 'white'),
    mutedColor: useColorModeValue('gray.600', 'gray.400'),
    accentColor: useColorModeValue('blue.500', 'blue.400'),
    hoverBg: useColorModeValue('gray.50', 'gray.700'),
    activeBg: useColorModeValue('blue.50', 'blue.900'),
  };
};