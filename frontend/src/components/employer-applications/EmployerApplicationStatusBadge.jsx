import React from 'react';
import { Badge, HStack, Text } from '@chakra-ui/react';

const EmployerApplicationStatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING': return 'yellow';
      case 'REVIEWED': return 'purple';
      case 'ACCEPTED': return 'green';
      case 'REJECTED': return 'red';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING': return '⏳';
      case 'REVIEWED': return '👀';
      case 'ACCEPTED': return '✅';
      case 'REJECTED': return '❌';
      default: return '📄';
    }
  };

  return (
    <Badge 
      colorScheme={getStatusColor(status)} 
      variant="subtle" 
      borderRadius="full"
      px={3}
      py={1}
    >
      <HStack spacing={1}>
        <Text>{getStatusIcon(status)}</Text>
        <Text fontWeight="medium">
          {status || 'Pending'}
        </Text>
      </HStack>
    </Badge>
  );
};

export default EmployerApplicationStatusBadge;