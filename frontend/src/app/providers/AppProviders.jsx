import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../theme';
import { AuthProvider } from '../../features/auth/context/AuthContext';

/**
 * AppProviders - Wraps all application providers
 * Centralizes provider configuration for cleaner App.jsx
 */
const AppProviders = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ChakraProvider>
  );
};

export default AppProviders;
