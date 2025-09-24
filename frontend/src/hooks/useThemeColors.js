import { useColorModeValue } from '@chakra-ui/react';

export const useThemeColors = () => {
  return {
    // Text colors
    text: {
      primary: useColorModeValue('slate.900', 'white'),
      secondary: useColorModeValue('slate.600', 'slate.300'),
      muted: useColorModeValue('slate.400', 'slate.500'),
    },
    
    // Background colors
    bg: {
      primary: useColorModeValue('white', 'gray.800'),
      secondary: useColorModeValue('slate.50', 'gray.700'),
      accent: useColorModeValue('blue.50', 'blue.900'),
    },
    
    // Border colors
    border: {
      default: useColorModeValue('gray.200', 'gray.600'),
      hover: useColorModeValue('gray.300', 'gray.500'),
      focus: useColorModeValue('blue.300', 'blue.500'),
    },
    
    // Interactive colors
    interactive: {
      hover: useColorModeValue('gray.100', 'gray.700'),
      active: useColorModeValue('blue.50', 'blue.900'),
      focus: useColorModeValue('blue.100', 'blue.800'),
    },
    
    // Gradients
    gradients: {
      hero: useColorModeValue(
        'linear(135deg, blue.500 0%, blue.600 25%, slate.700 75%, slate.800 100%)',
        'linear(135deg, blue.600 0%, blue.700 25%, slate.800 75%, slate.900 100%)'
      ),
      cta: useColorModeValue(
        'linear(135deg, slate.800 0%, slate.900 50%, blue.900 100%)',
        'linear(135deg, slate.900 0%, gray.900 50%, blue.800 100%)'
      ),
    }
  };
};