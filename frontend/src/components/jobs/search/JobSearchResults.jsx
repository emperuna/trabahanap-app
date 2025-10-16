import React from 'react';
import {
  VStack,
  HStack,
  Text,
  Select,
  Button,
  Box,
  Grid,
  useColorModeValue,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { HiRefresh } from 'react-icons/hi';
import JobCard from '../JobCard';

const JobSearchResults = ({
  jobs,
  totalJobs,
  filters,
  onSortChange,
  onRefresh,
  onClearFilters,
  activeFiltersCount,
  selectedJobId,
  onJobSelect,
  isCompactView = false,
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  if (!jobs) {
    return (
      <Center h="400px">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <VStack spacing={4} align="stretch" h="full">
      {/* Results Header */}
      <HStack
        justify="space-between"
        p={4}
        bg={bgColor}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <VStack align="start" spacing={0}>
          <Text fontSize="lg" fontWeight="semibold">
            {jobs.length} Jobs Found
          </Text>
          {activeFiltersCount > 0 && (
            <Text fontSize="sm" color="gray.500">
              {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
            </Text>
          )}
        </VStack>

        <HStack spacing={2}>
          <Select
            size="sm"
            w="180px"
            value={filters.sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="recent">Most Recent</option>
            <option value="relevant">Most Relevant</option>
            <option value="salary-high">Highest Salary</option>
            <option value="salary-low">Lowest Salary</option>
          </Select>
          <Button
            size="sm"
            leftIcon={<HiRefresh />}
            onClick={onRefresh}
            variant="outline"
          >
            Refresh
          </Button>
        </HStack>
      </HStack>

      {/* Job Cards */}
      <Box
        overflowY="auto"
        h="full"
        css={{
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            background: '#CBD5E0',
            borderRadius: '4px',
          },
        }}
      >
        {jobs.length > 0 ? (
          <VStack spacing={3} align="stretch">
            {jobs.map((job) => (
              <Box
                key={job._id}
                onClick={() => onJobSelect && onJobSelect(job)}
                cursor="pointer"
                borderRadius="lg"
                borderWidth="2px"
                borderColor={
                  selectedJobId === job._id ? 'blue.500' : 'transparent'
                }
                transition="all 0.2s"
                _hover={{
                  borderColor: 'blue.300',
                  transform: 'translateY(-2px)',
                  shadow: 'md',
                }}
              >
                <JobCard
                  job={job}
                  isCompact={isCompactView}
                  showPreview={false}
                />
              </Box>
            ))}
          </VStack>
        ) : (
          <Center h="400px">
            <VStack spacing={4}>
              <Text fontSize="xl" fontWeight="semibold" color="gray.500">
                No jobs found
              </Text>
              <Text fontSize="sm" color="gray.400">
                Try adjusting your filters
              </Text>
              {activeFiltersCount > 0 && (
                <Button onClick={onClearFilters} colorScheme="blue" size="sm">
                  Clear Filters
                </Button>
              )}
            </VStack>
          </Center>
        )}
      </Box>
    </VStack>
  );
};

export default JobSearchResults;