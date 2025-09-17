import React from 'react';
import { Input as ChakraInput, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';

const Input = ({ 
  variant = 'modern',
  leftIcon,
  label,
  error,
  helperText,
  required = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200';
  const errorClasses = error 
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
    : 'border-gray-300 focus:border-transparent';

  const classes = `${baseClasses} ${errorClasses} ${className}`.trim().replace(/\s+/g, ' ');

  if (leftIcon) {
    return (
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={leftIcon} color="gray.400" />
        </InputLeftElement>
        <ChakraInput variant={variant} className={classes} {...props} />
      </InputGroup>
    );
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <ChakraInput variant={variant} className={classes} {...props} />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
