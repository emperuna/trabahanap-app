import React from 'react';
import { 
  Card, CardBody, HStack, Text, Select, Badge, Button,
  useColorModeValue 
} from '@chakra-ui/react';

const EmployerApplicationsFilters = ({
  statusFilter,
  setStatusFilter,
  jobFilter,
  setJobFilter,
  applications,
  filteredApplications,
  uniqueJobs,
  onRefresh
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Card bg={cardBg} borderRadius="xl">
      <CardBody>
        <HStack spacing={4} align="center" wrap="wrap">
          <HStack spacing={4}>
            <Text fontSize="sm" color={mutedColor} minW="fit-content">
              Filter by:
            </Text>
            
            <Select 
              size="sm" 
              w="150px"
              placeholder="All Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="PENDING">Pending</option>
              <option value="REVIEWED">Reviewed</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
            </Select>
            
            <Select 
              size="sm" 
              w="200px"
              placeholder="All Jobs"
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
            >
              {uniqueJobs.map((job, index) => (
                <option key={index} value={job}>{job}</option>
              ))}
            </Select>
          </HStack>

          <HStack spacing={2} ml="auto">
            <Badge colorScheme="blue" variant="outline">
              {filteredApplications.length} of {applications.length} applications
            </Badge>
            <Button size="sm" variant="outline" onClick={onRefresh}>
              Refresh
            </Button>
          </HStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default EmployerApplicationsFilters;