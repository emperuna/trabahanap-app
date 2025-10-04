import React from 'react';
import { Badge, useColorModeValue } from '@chakra-ui/react';

const StatusBadge = ({ status, size = 'sm' }) => {
  const getStatusConfig = (status) => {
    const statusUpper = status?.toUpperCase();
    
    const configs = {
      PENDING: { 
        colorScheme: 'yellow', 
        label: 'Pending Review',
        emoji: '⏳'
      },
      REVIEWED: { 
        colorScheme: 'blue', 
        label: 'Under Review',
        emoji: '👀'
      },
      INTERVIEW: { 
        colorScheme: 'purple', 
        label: 'Interview Scheduled',
        emoji: '📅'
      },
      ACCEPTED: { 
        colorScheme: 'green', 
        label: 'Accepted',
        emoji: '✅'
      },
      REJECTED: { 
        colorScheme: 'red', 
        label: 'Rejected',
        emoji: '❌'
      }
    };
    
    return configs[statusUpper] || { 
      colorScheme: 'gray', 
      label: status || 'Unknown',
      emoji: '📄'
    };
  };

  const config = getStatusConfig(status);
  
  const sizeMap = {
    xs: { fontSize: '9px', px: 2, py: 0.5 },
    sm: { fontSize: '10px', px: 2, py: 0.5 },
    md: { fontSize: 'xs', px: 3, py: 1 },
    lg: { fontSize: 'sm', px: 4, py: 1.5 }
  };

  return (
    <Badge
      colorScheme={config.colorScheme}
      fontSize={sizeMap[size].fontSize}
      px={sizeMap[size].px}
      py={sizeMap[size].py}
      borderRadius="full"
      fontWeight="600"
      textTransform="uppercase"
      display="inline-flex"
      alignItems="center"
      gap={1}
    >
      <span role="img" aria-label={config.label}>{config.emoji}</span>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;