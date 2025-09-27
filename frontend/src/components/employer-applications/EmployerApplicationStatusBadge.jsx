import React from 'react';
import { Badge, Text } from '@chakra-ui/react';

const EmployerApplicationStatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING': 
        return {
          colorScheme: 'orange',
          variant: 'solid',
          textColor: 'white',
          label: 'Pending Review'
        };
      case 'REVIEWED': 
        return {
          colorScheme: 'blue',
          variant: 'solid',
          textColor: 'white',
          label: 'Under Review'
        };
      case 'ACCEPTED': 
        return {
          colorScheme: 'green',
          variant: 'solid',
          textColor: 'white',
          label: 'Accepted'
        };
      case 'REJECTED': 
        return {
          colorScheme: 'red',
          variant: 'solid',
          textColor: 'white',
          label: 'Not Selected'
        };
      default: 
        return {
          colorScheme: 'gray',
          variant: 'outline',
          textColor: 'gray.600',
          label: 'Unknown Status'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge 
      colorScheme={config.colorScheme}
      variant={config.variant}
      borderRadius="md"
      px={3}
      py={1}
      fontSize="xs"
      fontWeight="semibold"
      letterSpacing="wide"
      textTransform="uppercase"
    >
      <Text color={config.textColor} fontSize="xs">
        {config.label}
      </Text>
    </Badge>
  );
};

export default EmployerApplicationStatusBadge;