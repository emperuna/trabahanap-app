import React, { useMemo } from 'react';
import { 
  Card, 
  CardBody, 
  VStack, 
  Heading, 
  Text, 
  Button, 
  Badge, 
  HStack,
  Box,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HiCheckCircle, HiBriefcase, HiSearch, HiClipboardList } from 'react-icons/hi';
import SaveJobButton from './SaveJobButton';

const ApplyNowCard = ({ 
  company, 
  onApply, 
  hasApplied = false, 
  loading = false, 
  jobId 
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  if (hasApplied) {
    return (
      <Card 
        bg={cardBg}
        borderRadius="xl"
        shadow="sm"
        border="1px"
        borderColor="green.200"
        overflow="hidden"
      >
        <Box h="3px" bg="green.500" />
        <CardBody p={5}>
          <VStack spacing={4}>
            <HStack spacing={2}>
              <Icon as={HiCheckCircle} color="green.500" boxSize={5} />
              <Heading size="sm" color={useColorModeValue('gray.800', 'white')}>
                Application Sent
              </Heading>
            </HStack>
            
            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')} textAlign="center">
              Your application to {company} has been submitted successfully.
            </Text>

            <VStack spacing={2} w="full">
              <Button 
                as={Link} 
                to="/dashboard/applications" 
                colorScheme="blue"
                size="md"
                w="full"
                leftIcon={<HiClipboardList />}
              >
                Track Applications
              </Button>
              <Button 
                as={Link} 
                to="/find-jobs" 
                variant="ghost"
                size="sm"
                w="full"
                leftIcon={<HiSearch />}
              >
                Find More Jobs
              </Button>
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card 
      bg={cardBg}
      borderRadius="xl"
      shadow="sm"
      border="1px"
      borderColor={borderColor}
      overflow="hidden"
    >
      <Box h="3px" bg="blue.500" />
      <CardBody p={5}>
        <VStack spacing={4}>
          <Heading size="sm" color={useColorModeValue('gray.800', 'white')}>
            Interested in this role?
          </Heading>
          
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')} textAlign="center">
            Submit your application to {company}.
          </Text>

          <VStack spacing={2} w="full">
            <HStack w="full" spacing={2}>
              <Button 
                colorScheme="blue" 
                size="lg"
                flex={1}
                onClick={onApply} 
                isLoading={loading}
                loadingText="Opening..."
                leftIcon={<HiBriefcase />}
              >
                Apply Now
              </Button>
              {jobId && (
                <SaveJobButton
                  jobId={jobId}
                  size="lg"
                  variant="icon"
                />
              )}
            </HStack>
            <Button 
              as={Link} 
              to="/find-jobs" 
              variant="ghost"
              size="sm"
              w="full"
              leftIcon={<HiSearch />}
            >
              View Other Jobs
            </Button>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ApplyNowCard;