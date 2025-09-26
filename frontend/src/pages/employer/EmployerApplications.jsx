import React, { useState, useEffect } from 'react';
import {
  Box, Container, VStack, Spinner, Text, useToast, useColorModeValue
} from '@chakra-ui/react';
import { applicationsAPI } from '../../services/api';
import {
  EmployerApplicationsHeader,
  EmployerApplicationsStats,
  EmployerApplicationsFilters,
  EmployerApplicationsList,
  EmptyEmployerApplicationsState
} from '../../components/employer-applications';

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [jobFilter, setJobFilter] = useState('');
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    fetchEmployerApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, statusFilter, jobFilter]);

  const fetchEmployerApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationsAPI.getEmployerApplications();
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

  const filterApplications = () => {
    let filtered = [...applications];

    if (statusFilter) {
      filtered = filtered.filter(app => 
        app.status?.toUpperCase() === statusFilter.toUpperCase()
      );
    }

    if (jobFilter) {
      filtered = filtered.filter(app => 
        app.jobTitle?.toLowerCase().includes(jobFilter.toLowerCase())
      );
    }

    setFilteredApplications(filtered);
  };

  const getUniqueJobs = () => {
    const jobs = applications.map(app => app.jobTitle).filter(Boolean);
    return [...new Set(jobs)];
  };

  const handleStatusUpdate = (applicationId, newStatus) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: newStatus, updatedAt: new Date().toISOString() }
          : app
      )
    );
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
          <Spinner size="xl" color="blue.500" />
          <Text color={mutedColor}>Loading applications...</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="7xl">
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <EmployerApplicationsHeader 
            applicationsCount={applications.length}
            textColor={textColor}
            mutedColor={mutedColor}
          />

          {/* Stats */}
          {applications.length > 0 && (
            <EmployerApplicationsStats applications={applications} />
          )}

          {/* Applications Content */}
          {applications.length === 0 ? (
            <EmptyEmployerApplicationsState 
              cardBg={cardBg}
              textColor={textColor}
              mutedColor={mutedColor}
              hasApplications={false}
              isFiltered={false}
            />
          ) : (
            <>
              {/* Filters */}
              <EmployerApplicationsFilters
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                jobFilter={jobFilter}
                setJobFilter={setJobFilter}
                applications={applications}
                filteredApplications={filteredApplications}
                uniqueJobs={getUniqueJobs()}
                onRefresh={fetchEmployerApplications}
              />

              {/* Applications List */}
              {filteredApplications.length === 0 ? (
                <EmptyEmployerApplicationsState 
                  cardBg={cardBg}
                  textColor={textColor}
                  mutedColor={mutedColor}
                  hasApplications={true}
                  isFiltered={true}
                />
              ) : (
                <EmployerApplicationsList
                  applications={filteredApplications}
                  formatDate={formatDate}
                  onStatusUpdate={handleStatusUpdate}
                />
              )}
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default EmployerApplications;