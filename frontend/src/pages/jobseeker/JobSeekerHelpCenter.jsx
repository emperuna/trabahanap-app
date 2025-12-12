import React from 'react';
import { Box } from '@chakra-ui/react';
import JobSeekerLayout from '../../components/common/layout/JobSeekerLayout';
import HelpCenter from '../../components/help-center/help-center';

const JobSeekerHelpCenter = () => {
  return (
    <JobSeekerLayout>
      <HelpCenter />
    </JobSeekerLayout>
  );
};

export default JobSeekerHelpCenter;
