import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import EmployerApplicationCard from './EmployerApplicationCard';

const EmployerApplicationsList = ({ 
  applications, 
  formatDate, 
  onStatusUpdate 
}) => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} spacing={6}>
      {applications.map((application) => (
        <EmployerApplicationCard 
          key={application.id} 
          application={application}
          formatDate={formatDate}
          onStatusUpdate={onStatusUpdate}
        />
      ))}
    </SimpleGrid>
  );
};

export default EmployerApplicationsList;