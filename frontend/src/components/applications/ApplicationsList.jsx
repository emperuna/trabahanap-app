import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import ApplicationCard from './ApplicationCard';

const ApplicationsList = ({ applications, formatDate }) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
      {applications.map((application) => (
        <ApplicationCard 
          key={application.id} 
          application={application}
          formatDate={formatDate}
        />
      ))}
    </SimpleGrid>
  );
};

export default ApplicationsList;