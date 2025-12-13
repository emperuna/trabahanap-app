import React, { useState, useEffect } from 'react';
import { 
  VStack, 
  Grid, 
  GridItem, 
  Box, 
  useToast,
  useColorModeValue,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { jobsAPI } from '../../../shared/api';
import JobSeekerLayout from '../../../shared/components/layout/JobSeekerLayout';
import JobSearchHeader from '../components/search/JobSearchHeader';
import JobSearchResults from '../components/search/JobSearchResults';
import JobPreviewPanel from '../components/search/JobPreviewPanel';
import { useJobSearch } from '../hooks/useJobSearch';

const JobSeekerFindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const toast = useToast();
  
  const {
    filteredJobs,
    searchFilters,
    updateFilter,
    clearFilters,
    getActiveFiltersCount,
    handleSearch
  } = useJobSearch(jobs);

  const previewBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  useEffect(() => {
    fetchJobs();
  }, []);

  // Auto-select first job when results change
  useEffect(() => {
    if (filteredJobs.length > 0 && !selectedJob) {
      handleJobSelect(filteredJobs[0]);
    }
  }, [filteredJobs]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobsAPI.getAllJobs();
      setJobs(response || []);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      toast({
        title: 'Error',
        description: 'Failed to load jobs',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch full job details when a job is selected
  const fetchJobDetails = async (jobId) => {
    try {
      setLoadingDetails(true);
      const response = await jobsAPI.getJobById(jobId);
      setSelectedJobDetails(response);
    } catch (error) {
      console.error('Failed to fetch job details:', error);
      toast({
        title: 'Error',
        description: 'Failed to load job details',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      // Fallback to the basic job data if full details fail
      setSelectedJobDetails(selectedJob);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    // Fetch full details for the selected job
    if (job?._id || job?.id) {
      fetchJobDetails(job._id || job.id);
    }
  };

  return (
    <JobSeekerLayout showSidebar={false} maxW="full" p={0}>
      {/* Sticky Header Section with Integrated Filters */}
      <Box
        position="sticky"
        top="64px"
        zIndex={999}
        bg={bgColor}
        borderBottom="1px"
        borderColor={borderColor}
      >
        <Box maxW="8xl" mx="auto" px={6} py={6}>
          <JobSearchHeader 
            totalJobs={jobs.length}
            filteredJobs={filteredJobs.length}
            filters={searchFilters}
            onFilterChange={updateFilter}
            onSearch={handleSearch}
          />
        </Box>
      </Box>

      {/* Full Height Content Section */}
      <Box 
        maxW="8xl" 
        mx="auto" 
        px={6} 
        py={6}
        h="calc(100vh - 64px)"
        overflow="hidden"
      >
        {/* 2-Column Layout: Job Cards + Preview */}
        <Grid
          templateColumns={{ base: '1fr', lg: '480px 1fr' }}
          gap={6}
          h="full"
        >
          {/* Left Panel: Scrollable Job Cards */}
          <GridItem 
            overflowY="auto"
            css={{
              '&::-webkit-scrollbar': { width: '8px' },
              '&::-webkit-scrollbar-track': { background: 'transparent' },
              '&::-webkit-scrollbar-thumb': {
                background: '#CBD5E0',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#A0AEC0',
              },
            }}
          >
            <JobSearchResults
              jobs={filteredJobs}
              totalJobs={jobs.length}
              filters={searchFilters}
              onSortChange={(sortBy) => updateFilter('sortBy', sortBy)}
              onRefresh={fetchJobs}
              selectedJobId={selectedJob?._id || selectedJob?.id}
              onJobSelect={handleJobSelect}
              isCompactView={true}
            />
          </GridItem>

          {/* Right Panel: Fixed Job Preview with internal scroll */}
          <GridItem display={{ base: 'none', lg: 'block' }}>
            <Box h="full">
              <Box
                bg={previewBg}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={borderColor}
                boxShadow="sm"
                h="full"
              >
                {loadingDetails ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    h="full"
                    flexDirection="column"
                    gap={4}
                  >
                    <Spinner size="xl" color="blue.500" thickness="4px" />
                    <Text color="gray.500" fontSize="sm">
                      Loading job details...
                    </Text>
                  </Box>
                ) : selectedJobDetails ? (
                  <JobPreviewPanel job={selectedJobDetails} />
                ) : (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    h="full"
                    color="gray.500"
                    fontSize="lg"
                  >
                    Select a job to preview
                  </Box>
                )}
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </JobSeekerLayout>
  );
};

export default JobSeekerFindJobs;