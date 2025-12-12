import React from 'react';
import { SimpleGrid, Spinner, Center } from '@chakra-ui/react';
import JobSeekerApplicationCard from './JobSeekerApplicationCard';
import JobSeekerApplicationsEmptyState from './JobSeekerApplicationsEmptyState';

const JobSeekerApplicationsList = ({
  applications,
  loading,
  onWithdraw,
  onViewPDF,
}) => {
  if (loading) {
    return (
      <Center py={20}>
        <Spinner size="xl" color="blue.500" thickness="4px" />
      </Center>
    );
  }

  if (!applications || applications.length === 0) {
    return <JobSeekerApplicationsEmptyState />;
  }

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      spacing={6}
      w="full"
    >
      {applications.map((application) => (
        <JobSeekerApplicationCard
          key={application.id}
          application={application}
          onWithdraw={onWithdraw}
          onViewPDF={onViewPDF}
        />
      ))}
    </SimpleGrid>
  );
};

export default JobSeekerApplicationsList;