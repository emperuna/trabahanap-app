import React from 'react';
import { HStack, Select, Button, Badge, Text } from '@chakra-ui/react';

const ApplicationFilters = ({ 
  statusFilter, 
  setStatusFilter, 
  sortBy, 
  setSortBy, 
  onRefresh,
  filteredCount,
  totalCount 
}) => {
  return (
    <HStack justify="space-between" align="center" wrap="wrap" spacing={4}>
      <HStack spacing={4}>
        <HStack spacing={2}>
          <Text fontSize="sm" color="gray.500">Filter by status:</Text>
          <Select 
            size="sm" 
            w="140px"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="REVIEWED">Under Review</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </Select>
        </HStack>

        <HStack spacing={2}>
          <Text fontSize="sm" color="gray.500">Sort by:</Text>
          <Select 
            size="sm" 
            w="120px"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="status">Status</option>
            <option value="company">Company</option>
          </Select>
        </HStack>
      </HStack>

      <HStack spacing={3}>
        <Badge colorScheme="purple" variant="outline">
          {filteredCount} of {totalCount} applications
        </Badge>
        <Button size="sm" variant="outline" onClick={onRefresh}>
          Refresh
        </Button>
      </HStack>
    </HStack>
  );
};

export default ApplicationFilters;