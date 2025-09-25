import React, { useState, useEffect } from 'react';
import { Box, VStack, Spinner, Text, useToast } from '@chakra-ui/react';
import { jobsAPI } from '../../services/api';
import JobSearchHeader from '../../components/jobs/search/JobSearchHeader';
import JobSearchFilters from '../../components/jobs/search/JobSearchFilters';
import JobSearchResults from '../../components/jobs/search/JobSearchResults';
import { useJobSearch } from '../../hooks/useJobSearch';

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  
  // ✅ EXTRACTED: Custom hook for search logic
  const {
    filteredJobs,
    searchFilters,
    updateFilter,
    clearFilters,
    getActiveFiltersCount,
    handleSearch
  } = useJobSearch(jobs);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      console.log('📡 Fetching all jobs...');
      const response = await jobsAPI.getAllJobs();
      console.log('📨 Jobs received:', response);
      setJobs(response);
    } catch (error) {
      console.error('❌ Error fetching jobs:', error);
      toast({
        title: 'Error fetching jobs',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={20}>
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text color="gray.600">Loading available jobs...</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <VStack spacing={6} align="stretch">
      <JobSearchHeader 
        totalJobs={jobs.length}
        filteredJobs={filteredJobs.length}
      />
      
      <JobSearchFilters
        filters={searchFilters}
        onFilterChange={updateFilter}
        onSearch={handleSearch}
        onClearFilters={clearFilters}
        activeFiltersCount={getActiveFiltersCount()}
      />
      
      <JobSearchResults
        jobs={filteredJobs}
        totalJobs={jobs.length}
        filters={searchFilters}
        onSortChange={(sortBy) => updateFilter('sortBy', sortBy)}
        onRefresh={fetchJobs}
        onClearFilters={clearFilters}
        activeFiltersCount={getActiveFiltersCount()}
      />
    </VStack>
  );
};

export default FindJobs;