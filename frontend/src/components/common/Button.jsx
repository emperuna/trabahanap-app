import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

const Button = ({ 
  variant = 'solid', 
  colorScheme = 'brand',
  children, 
  ...props 
}) => {
  return (
    <ChakraButton 
      variant={variant} 
      colorScheme={colorScheme}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
