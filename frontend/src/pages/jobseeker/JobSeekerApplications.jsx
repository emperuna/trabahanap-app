import React, { useState, useEffect } from 'react';
import { VStack, useToast, useDisclosure } from '@chakra-ui/react';
import { applicationsAPI } from '../../services/api';
import PDFViewerModal from '../../components/common/PDFViewerModal';
import JobSeekerLayout from '../../components/common/layout/JobSeekerLayout';

// Import components
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

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationsAPI.getMyApplications();
      setApplications(response || []);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      toast({
        title: 'Error',
        description: 'Failed to load applications',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (applicationId) => {
    try {
      await applicationsAPI.withdrawApplication(applicationId);
      toast({
        title: 'Success',
        description: 'Application withdrawn successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchApplications();
    } catch (error) {
      console.error('Failed to withdraw application:', error);
      toast({
        title: 'Error',
        description: 'Failed to withdraw application',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleViewPDF = async (applicationId, documentType, title) => {
    try {
      const pdfUrl = await applicationsAPI.getApplicationDocument(applicationId, documentType);
      setSelectedPDF(pdfUrl);
      setPdfTitle(title);
      pdfOnOpen();
    } catch (error) {
      console.error('Failed to load PDF:', error);
      toast({
        title: 'Error',
        description: 'Failed to load document',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredApplications = statusFilter
    ? applications.filter(app => app.status === statusFilter)
    : applications;

  return (
    <JobSeekerLayout>
      <VStack spacing={8} align="stretch">
        <JobSeekerApplicationsHeader 
          applicationsCount={applications.length}
        />

        <JobSeekerApplicationsStats applications={applications} />

        <JobSeekerApplicationsFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onRefresh={fetchApplications}
          loading={loading}
        />

        <JobSeekerApplicationsList
          applications={filteredApplications}
          loading={loading}
          onWithdraw={handleWithdraw}
          onViewPDF={handleViewPDF}
        />
      </VStack>

      {/* PDF Viewer Modal */}
      <PDFViewerModal
        isOpen={pdfIsOpen}
        onClose={pdfOnClose}
        pdfUrl={selectedPDF}
        title={pdfTitle}
      />
    </JobSeekerLayout>
  );
};

export default JobSeekerApplications;