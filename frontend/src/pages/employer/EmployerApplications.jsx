import React, { useState, useEffect } from 'react';
import {
  Box, Container, VStack, useToast, useDisclosure
} from '@chakra-ui/react';
import { applicationsAPI } from '../../services/api';
import PDFViewerModal from '../../components/common/PDFViewerModal';

import {
  EmployerApplicationsHeader,
  EmployerApplicationsStats,
  EmployerApplicationsFilters,
  EmployerApplicationsList,
  EmptyEmployerApplicationsState
} from '../../components/applications/employer';

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [pdfTitle, setPdfTitle] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [jobFilter, setJobFilter] = useState('');
  
  const { isOpen: pdfIsOpen, onOpen: pdfOnOpen, onClose: pdfOnClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationsAPI.getEmployerApplications();
      setApplications(data);
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

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      // Optimistic update
      setApplications(prevApplications =>
        prevApplications.map(app =>
          app.id === applicationId
            ? { ...app, status: newStatus }
            : app
        )
      );

      await applicationsAPI.updateApplicationStatus(applicationId, newStatus);

      toast({
        title: 'Status Updated',
        description: `Application status changed to ${newStatus}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // Revert on error
      fetchApplications();
      
      toast({
        title: 'Error updating status',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleViewPDF = async (applicationId, fileType, title) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: 'Authentication Error',
          description: 'Please log in to view documents',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const apiUrl = window.location.origin.includes('localhost') 
        ? 'http://localhost:8080' 
        : window.location.origin;
      
      const response = await fetch(`${apiUrl}/api/applications/view/${applicationId}/${fileType}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/pdf'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);
      
      setSelectedPDF(pdfUrl);
      setPdfTitle(title);
      pdfOnOpen();
    } catch (error) {
      console.error('Error loading PDF:', error);
      toast({
        title: 'Error loading PDF',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFilteredApplications = () => {
    let filtered = applications;

    if (statusFilter) {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (jobFilter) {
      filtered = filtered.filter(app => app.jobTitle === jobFilter);
    }

    return filtered;
  };

  const filteredApplications = getFilteredApplications();
  const uniqueJobs = [...new Set(applications.map(app => app.jobTitle))];
  const hasApplications = applications.length > 0;
  const isFiltered = statusFilter || jobFilter;

  return (
    <>
      <Box minH="100vh" py={8}>
        <Container maxW="8xl">
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <EmployerApplicationsHeader 
              applicationsCount={applications.length}
            />

            {/* Stats */}
            <EmployerApplicationsStats applications={applications} />

            {/* Filters */}
            <EmployerApplicationsFilters
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              jobFilter={jobFilter}
              setJobFilter={setJobFilter}
              applications={applications}
              filteredApplications={filteredApplications}
              uniqueJobs={uniqueJobs}
              onRefresh={fetchApplications}
            />

            {/* Applications List or Empty State */}
            {loading ? (
              <EmployerApplicationsList 
                applications={[]}
                formatDate={formatDate}
                onStatusUpdate={handleStatusUpdate}
                loading={true}
              />
            ) : filteredApplications.length === 0 ? (
              <EmptyEmployerApplicationsState
                hasApplications={hasApplications}
                isFiltered={isFiltered}
              />
            ) : (
              <EmployerApplicationsList 
                applications={filteredApplications}
                formatDate={formatDate}
                onStatusUpdate={handleStatusUpdate}
                onViewPDF={handleViewPDF}
                loading={false}
              />
            )}
          </VStack>
        </Container>
      </Box>

      {/* PDF Viewer Modal */}
      <PDFViewerModal
        isOpen={pdfIsOpen}
        onClose={pdfOnClose}
        pdfUrl={selectedPDF}
        title={pdfTitle}
      />
    </>
  );
};

export default EmployerApplications;