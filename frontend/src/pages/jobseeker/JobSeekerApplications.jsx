import React, { useState, useEffect } from 'react';
import {
  Box, Container, VStack, Spinner, useToast, useColorModeValue, Text
} from '@chakra-ui/react';
import { applicationsAPI } from '../../services/api';
import {
  ApplicationsHeader,
  ApplicationsStats,
  ApplicationFilters,
  ApplicationsList,
  EmptyApplicationsState
} from '../../components/applications';

const JobSeekerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterAndSortApplications();
  }, [applications, statusFilter, sortBy]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationsAPI.getMyApplications();
      setApplications(response);
    } catch (error) {
      toast({
        title: 'Error fetching applications',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortApplications = () => {
    let filtered = [...applications];

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(app => 
        app.status?.toUpperCase() === statusFilter.toUpperCase()
      );
    }

    // Sort applications
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.appliedAt) - new Date(b.appliedAt);
        case 'status':
          return (a.status || '').localeCompare(b.status || '');
        case 'company':
          return (a.company || '').localeCompare(b.company || '');
        case 'newest':
        default:
          return new Date(b.appliedAt) - new Date(a.appliedAt);
      }
    });

    setFilteredApplications(filtered);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <Box bg={bgColor} minH="100vh" display="flex" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="purple.500" />
          <Text color={mutedColor}>Loading your applications...</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="6xl">
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <ApplicationsHeader 
            applicationsCount={applications.length}
            textColor={textColor}
            mutedColor={mutedColor}
          />

          {/* Stats */}
          {applications.length > 0 && (
            <ApplicationsStats applications={applications} />
          )}

          {/* Applications Content */}
          {applications.length === 0 ? (
            <EmptyApplicationsState 
              cardBg={cardBg}
              textColor={textColor}
              mutedColor={mutedColor}
            />
          ) : (
            <>
              {/* Filters */}
              <ApplicationFilters
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onRefresh={fetchApplications}
                filteredCount={filteredApplications.length}
                totalCount={applications.length}
              />

              {/* Applications List */}
              <ApplicationsList
                applications={filteredApplications}
                formatDate={formatDate}
              />
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default JobSeekerApplications;