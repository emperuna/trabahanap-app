import React from 'react';
import { HStack, Badge } from '@chakra-ui/react';

const ActiveFiltersDisplay = ({ filters }) => {
  return (
    <HStack spacing={2} flex={1}>
      {filters.searchTerm && (
        <Badge colorScheme="blue" variant="subtle">
          Search: {filters.searchTerm}
        </Badge>
      )}
      {filters.locationFilter && (
        <Badge colorScheme="green" variant="subtle">
          Location: {filters.locationFilter}
        </Badge>
      )}
      {filters.jobTypeFilter && (
        <Badge colorScheme="purple" variant="subtle">
          Type: {filters.jobTypeFilter}
        </Badge>
      )}
      {filters.selectedSkills.length > 0 && (
        <Badge colorScheme="orange" variant="subtle">
          Skills: {filters.selectedSkills.length}
        </Badge>
      )}
    </HStack>
  );
};

export default ActiveFiltersDisplay;