import React from 'react';
import {
  HStack,
  Text,
  Select,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { HiRefresh } from 'react-icons/hi';

const JobSeekerApplicationsFilters = ({
  statusFilter,
  setStatusFilter,
  onRefresh,
  loading,
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <HStack
      p={6}
      bg={cardBg}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      justify="space-between"
      wrap="wrap"
      gap={4}
    >
      <HStack spacing={4}>
        <Text fontSize="sm" fontWeight="500" color="gray.600">
          Filter by Status:
        </Text>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          maxW="200px"
          size="md"
          bg={bgColor}
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="REVIEWED">Under Review</option>
          <option value="INTERVIEW">Interview</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
        </Select>
      </HStack>

      <HStack spacing={2}>
        {statusFilter && (
          <Button
            size="sm"
            variant="ghost"
            colorScheme="blue"
            onClick={() => setStatusFilter('')}
          >
            Clear Filter
          </Button>
        )}
        <Button
          leftIcon={<HiRefresh />}
          onClick={onRefresh}
          isLoading={loading}
          colorScheme="blue"
          variant="outline"
          size="sm"
        >
          Refresh
        </Button>
      </HStack>
    </HStack>
  );
};

export default JobSeekerApplicationsFilters;