import React from 'react';
import { Box, VStack, HStack, Button } from '@chakra-ui/react';
import { HiFilter, HiChevronDown } from 'react-icons/hi';
import BasicSearchFilters from './BasicSearchFilters';
import AdvancedSearchFilters from './AdvancedSearchFilters';
import ActiveFiltersDisplay from './ActiveFiltersDisplay';

const JobSearchFilters = ({ 
  filters, 
  onFilterChange, 
  onSearch, 
  onClearFilters, 
  activeFiltersCount 
}) => {
  return (
    <Box 
      bg="white" 
      p={6} 
      borderRadius="xl" 
      shadow="xl" 
      w="full"
      border="1px" 
      borderColor="gray.100"
      mt={-10}
      position="relative"
      zIndex={2}
    >
      <VStack spacing={4}>
        {/* Main Search Row */}
        <HStack spacing={4} w="full">
          <BasicSearchFilters
            searchTerm={filters.searchTerm}
            locationFilter={filters.locationFilter}
            jobTypeFilter={filters.jobTypeFilter}
            onFilterChange={onFilterChange}
            onSearch={onSearch}
          />

          {/* Advanced Filters Toggle */}
          <Button
            leftIcon={<HiFilter />}
            rightIcon={<HiChevronDown />}
            onClick={() => onFilterChange('showFilters', !filters.showFilters)}
            variant="outline"
            colorScheme="blue"
          >
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>
        </HStack>

        {/* Advanced Filters Panel */}
        <AdvancedSearchFilters
          filters={filters}
          onFilterChange={onFilterChange}
        />
        
        {/* Action Buttons */}
        <HStack spacing={3} w="full" justify="space-between">
          <ActiveFiltersDisplay filters={filters} />
          
          <HStack spacing={2}>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onClearFilters}
              isDisabled={activeFiltersCount === 0}
            >
              Clear Filters
            </Button>
            <Button 
              size="sm" 
              colorScheme="blue" 
              onClick={onSearch}
            >
              Search Jobs
            </Button>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default JobSearchFilters;