import React, { useState, useEffect } from 'react';
import {
  Box, Container, Heading, SimpleGrid, Spinner, Text, VStack,
  HStack, Input, Select, Button, useColorModeValue, useToast,
  InputGroup, InputLeftElement, Badge
} from '@chakra-ui/react';
import { HiSearch } from 'react-icons/hi'; // Use React Icons instead
import { jobsAPI } from '../../services/api';
import JobCard from '../../components/jobs/JobCard';

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const toast = useToast();
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    // Filter jobs whenever search criteria changes
    filterJobs();
  }, [jobs, searchTerm, locationFilter, jobTypeFilter]);

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

  const filterJobs = () => {
    const filtered = jobs.filter(job => {
      const matchesSearch = !searchTerm || 
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = !locationFilter || 
        job.location?.toLowerCase().includes(locationFilter.toLowerCase());
      
      const matchesJobType = !jobTypeFilter || job.jobType === jobTypeFilter;
      
      return matchesSearch && matchesLocation && matchesJobType;
    });
    
    setFilteredJobs(filtered);
  };

  const handleSearch = () => {
    filterJobs();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setJobTypeFilter('');
  };

  if (loading) {
    return (
      <Box bg={bgColor} minH="100vh" display="flex" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="purple.500" />
          <Text color="gray.600">Loading available jobs...</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="7xl">
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <VStack spacing={2} align="start">
            <Heading size="lg" color="gray.800">Find Your Dream Job</Heading>
            <Text color="gray.600">
              Discover {jobs.length} job opportunities waiting for you
            </Text>
          </VStack>
          
          {/* Search and Filters */}
          <Box bg={cardBg} p={6} borderRadius="xl" shadow="sm" border="1px" borderColor="gray.200">
            <VStack spacing={4}>
              <HStack spacing={4} w="full">
                <InputGroup flex={2}>
                  <InputLeftElement>
                    <HiSearch color="gray.400" /> {/* Changed from SearchIcon */}
                  </InputLeftElement>
                  <Input
                    placeholder="Search jobs, companies, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </InputGroup>
                
                <Input
                  placeholder="Location (e.g., Manila, Cebu)"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  flex={1}
                />
                
                <Select
                  placeholder="Job Type"
                  value={jobTypeFilter}
                  onChange={(e) => setJobTypeFilter(e.target.value)}
                  flex={1}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                  <option value="Freelance">Freelance</option>
                </Select>
              </HStack>
              
              <HStack spacing={3} w="full" justify="space-between">
                <HStack spacing={2}>
                  {searchTerm && (
                    <Badge colorScheme="purple" variant="subtle">
                      Search: {searchTerm}
                    </Badge>
                  )}
                  {locationFilter && (
                    <Badge colorScheme="blue" variant="subtle">
                      Location: {locationFilter}
                    </Badge>
                  )}
                  {jobTypeFilter && (
                    <Badge colorScheme="green" variant="subtle">
                      Type: {jobTypeFilter}
                    </Badge>
                  )}
                </HStack>
                
                <HStack spacing={2}>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={clearFilters}
                    isDisabled={!searchTerm && !locationFilter && !jobTypeFilter}
                  >
                    Clear Filters
                  </Button>
                  <Button 
                    size="sm" 
                    colorScheme="purple" 
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={fetchJobs}
                  >
                    Refresh
                  </Button>
                </HStack>
              </HStack>
            </VStack>
          </Box>

          {/* Results Summary */}
          <HStack justify="space-between" align="center">
            <Text color="gray.600" fontSize="sm">
              {filteredJobs.length > 0 
                ? `Showing ${filteredJobs.length} of ${jobs.length} jobs`
                : jobs.length > 0 
                  ? 'No jobs match your search criteria'
                  : 'No jobs available'
              }
            </Text>
            
            <HStack spacing={2}>
              <Text fontSize="sm" color="gray.500">Sort by:</Text>
              <Select size="sm" w="120px" defaultValue="newest">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="salary">Salary</option>
                <option value="company">Company</option>
              </Select>
            </HStack>
          </HStack>

          {/* Job Results */}
          {filteredJobs.length === 0 ? (
            <Box textAlign="center" py={12}>
              <VStack spacing={4}>
                <Text fontSize="lg" color="gray.500">
                  {jobs.length === 0 
                    ? '🔍 No jobs available at the moment' 
                    : '🔍 No jobs match your search criteria'
                  }
                </Text>
                <Text fontSize="sm" color="gray.400">
                  {jobs.length === 0 
                    ? 'Check back later for new opportunities'
                    : 'Try adjusting your search filters or keywords'
                  }
                </Text>
                <HStack spacing={3}>
                  <Button colorScheme="purple" onClick={fetchJobs}>
                    Refresh Jobs
                  </Button>
                  {(searchTerm || locationFilter || jobTypeFilter) && (
                    <Button variant="outline" onClick={clearFilters}>
                      Clear All Filters
                    </Button>
                  )}
                </HStack>
              </VStack>
            </Box>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default FindJobs;