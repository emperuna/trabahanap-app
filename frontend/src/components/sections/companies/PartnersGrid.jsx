import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import CompanyCard from './CompanyCard';

// This component expects the parent to pass the companies array or import it separately.
export default function PartnersGrid({ companies }) {
  return (
    <Box bg="transparent" borderRadius={0} overflow="hidden" boxShadow="none" p="px">
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing={0}>
        {companies.map((c) => (
          <CompanyCard key={c.id} company={c} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
