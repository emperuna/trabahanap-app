import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  useToast,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { applicationsAPI } from '../../services/api';
import PDFViewerModal from '../../components/common/PDFViewerModal';

// Import new jobseeker components
import {
  JobSeekerApplicationsHeader,
  JobSeekerApplicationsStats,
  JobSeekerApplicationsFilters,
  JobSeekerApplicationsList,
} from '../../components/applications/jobseeker';

const JobSeekerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [pdfTitle, setPdfTitle] = useState('');

  const { isOpen: pdfIsOpen, onOpen: pdfOnOpen, onClose: pdfOnClose } = useDisclosure();
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.900');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationsAPI.getMyApplications();
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

  const handleWithdraw = async (applicationId) => {
    if (!window.confirm('Are you sure you want to withdraw this application?')) {
      return;
    }

    try {
      setApplications(prevApplications =>
        prevApplications.filter(app => app.id !== applicationId)
      );

      await applicationsAPI.withdrawApplication(applicationId);

      toast({
        title: 'Application Withdrawn',
        description: 'Your application has been successfully withdrawn.',
        status: 'info',
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      fetchApplications();
      
      toast({
        title: 'Error withdrawing application',
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

  const getFilteredApplications = () => {
    if (!statusFilter) return applications;
    return applications.filter(app => app.status === statusFilter);
  };

  const filteredApplications = getFilteredApplications();

  return (
    <>
      <Box bg={bgColor} minH="100vh" py={8}>
        <Container maxW="8xl">
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <JobSeekerApplicationsHeader 
              applicationsCount={applications.length}
            />

            {/* Stats */}
            <JobSeekerApplicationsStats applications={applications} />

            {/* Filters */}
            <JobSeekerApplicationsFilters
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onRefresh={fetchApplications}
              loading={loading}
            />

            {/* Applications List */}
            <JobSeekerApplicationsList
              applications={filteredApplications}
              loading={loading}
              onWithdraw={handleWithdraw}
              onViewPDF={handleViewPDF}
            />
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

export default JobSeekerApplications;