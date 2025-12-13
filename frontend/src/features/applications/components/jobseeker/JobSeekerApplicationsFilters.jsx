import React from 'react';
import {
  HStack,
  Text,
  Select,
  Button,
  useColorModeValue,
  Box,
  Badge,
} from '@chakra-ui/react';
import { HiRefresh, HiFilter, HiX } from 'react-icons/hi';

const JobSeekerApplicationsFilters = ({
  statusFilter,
  setStatusFilter,
  onRefresh,
  loading,
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const selectBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box
      p={4}
      bg={cardBg}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      boxShadow="sm"
    >
      <HStack
        justify="space-between"
        wrap="wrap"
        gap={3}
      >
        <HStack spacing={3} flex={1} minW="200px">
          <HStack 
            spacing={2} 
            color="gray.500"
            bg={useColorModeValue('gray.100', 'gray.700')}
            px={3}
            py={2}
            borderRadius="lg"
          >
            <HiFilter size={16} />
            <Text fontSize="sm" fontWeight="600">
              Filter
            </Text>
          </HStack>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            maxW="200px"
            size="md"
            bg={selectBg}
            borderRadius="lg"
            fontWeight="500"
            _focus={{
              borderColor: 'blue.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
            }}
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="REVIEWED">Under Review</option>
            <option value="INTERVIEW">Interview</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Not Selected</option>
          </Select>
          {statusFilter && (
            <Badge 
              colorScheme="blue" 
              borderRadius="full" 
              px={2} 
              py={1}
              fontSize="xs"
            >
              1 filter active
            </Badge>
          )}
        </HStack>

        <HStack spacing={2}>
          {statusFilter && (
            <Button
              size="sm"
              variant="ghost"
              colorScheme="gray"
              leftIcon={<HiX />}
              onClick={() => setStatusFilter('')}
              borderRadius="lg"
            >
              Clear
            </Button>
          )}
          <Button
            leftIcon={<HiRefresh />}
            onClick={onRefresh}
            isLoading={loading}
            colorScheme="blue"
            variant="outline"
            size="sm"
            borderRadius="lg"
            _hover={{
              bg: 'blue.50',
              transform: 'rotate(180deg)',
            }}
            transition="all 0.3s"
          >
            Refresh
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default JobSeekerApplicationsFilters;