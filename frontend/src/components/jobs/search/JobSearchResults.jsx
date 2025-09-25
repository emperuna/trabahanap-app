import React from 'react';
import { 
  Box, Flex, VStack, HStack, Text, Button, SimpleGrid,
  Menu, MenuButton, MenuList, MenuItem, Divider, useColorModeValue 
} from '@chakra-ui/react';
import { HiChevronDown } from 'react-icons/hi';
import JobCard from '../JobCard';

const JobSearchResults = ({ 
  jobs, 
  totalJobs, 
  filters, 
  onSortChange, 
  onRefresh, 
  onClearFilters, 
  activeFiltersCount 
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');

  const getSortLabel = (sortBy) => {
    switch (sortBy) {
      case 'relevance': return 'Relevance';
      case 'newest': return 'Newest First';
      case 'oldest': return 'Oldest First';
      case 'salary-high': return 'Salary (High to Low)';
      case 'salary-low': return 'Salary (Low to High)';
      case 'company': return 'Company A-Z';
      default: return 'Relevance';
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Results Header with Sort */}
      <Flex justify="space-between" align="center" px={2}>
        <VStack align="start" spacing={1}>
          <Text fontSize="lg" fontWeight="600" color="gray.800">
            {jobs.length} Jobs Found
          </Text>
          <Text fontSize="sm" color="gray.600">
            {totalJobs > jobs.length && 
              `Filtered from ${totalJobs} total opportunities`
            }
          </Text>
        </VStack>

        <Menu>
          <MenuButton as={Button} rightIcon={<HiChevronDown />} variant="outline" size="sm">
            Sort by: {getSortLabel(filters.sortBy)}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => onSortChange('relevance')}>Relevance</MenuItem>
            <MenuItem onClick={() => onSortChange('newest')}>Newest First</MenuItem>
            <MenuItem onClick={() => onSortChange('oldest')}>Oldest First</MenuItem>
            <Divider />
            <MenuItem onClick={() => onSortChange('salary-high')}>Salary (High to Low)</MenuItem>
            <MenuItem onClick={() => onSortChange('salary-low')}>Salary (Low to High)</MenuItem>
            <Divider />
            <MenuItem onClick={() => onSortChange('company')}>Company A-Z</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Job Results */}
      {jobs.length === 0 ? (
        <Box textAlign="center" py={20} bg={cardBg} borderRadius="xl">
          <VStack spacing={4}>
            <Text fontSize="xl" fontWeight="600" color="gray.600">
              {totalJobs === 0 
                ? '🔍 No jobs available at the moment' 
                : '🔍 No jobs match your search criteria'
              }
            </Text>
            <Text fontSize="sm" color="gray.400">
              {totalJobs === 0 
                ? 'Check back later for new opportunities'
                : 'Try adjusting your search filters or keywords'
              }
            </Text>
            <HStack spacing={3}>
              <Button colorScheme="blue" onClick={onRefresh}>
                Refresh Jobs
              </Button>
              {activeFiltersCount > 0 && (
                <Button variant="outline" onClick={onClearFilters}>
                  Clear All Filters
                </Button>
              )}
            </HStack>
          </VStack>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default JobSearchResults;