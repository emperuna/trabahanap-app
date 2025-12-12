import React from 'react';
import {
  Box, VStack, Text, Button, Badge, HStack,
  useColorModeValue, Card, CardBody, Avatar, Flex, Divider
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SaveJobButton from './SaveJobButton';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

const JobCard = ({ job }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  // ✅ Updated salary formatting with K for thousands
  const formatSalary = (salary) => {
    if (!salary) return 'Not specified';
    
    // Format large numbers with K
    if (salary >= 1000) {
      const salaryInK = Math.floor(salary / 1000);
      return `₱${salaryInK}K/mo`;
    }
    
    return `₱${salary}/mo`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently posted';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)}w ago`; // ✅ Shorter format
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)}mo ago`; // ✅ Months
    
    return `${Math.ceil(diffDays / 365)}y ago`;
  };

  // Generate company initial for avatar
  const getCompanyInitial = (companyName) => {
    return companyName ? companyName.charAt(0).toUpperCase() : 'C';
  };

  return (
    <Card
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      borderRadius="2xl"
      fontFamily="'Poppins', sans-serif" // ✅ Apply Poppins only to this card
      _hover={{ 
        boxShadow: 'xl', 
        transform: 'translateY(-4px)',
        borderColor: 'blue.300'
      }}
      transition="all 0.3s ease"
      h="fit-content"
      overflow="hidden"
    >
      <CardBody p={6}>
        <VStack align="start" spacing={12} h="full">
          {/* Header with Circle and Save Button */}
          <Flex justify="space-between" align="start" w="full">
            <Box
              w="32px"
              h="32px"
              bg="blue.500"
              borderRadius="full"
            />
            
            <Box borderRadius="md" overflow="hidden">
              <SaveJobButton 
                jobId={job.id} 
                size="sm" 
                variant="icon"
                colorScheme="gray"
              />
            </Box>
          </Flex>

          <VStack align="start" spacing={2} w="full" >
            {/* Company Name and Date */}
          <Box display="flex"
            justifyContent="space-between"  
            alignItems="center"
            gap={2} >
            <Text 
              fontSize="smaller" 
              fontWeight="semibold" 
              color={textColor}
            >
              {job.company || 'Company Name'}
            </Text>
            <Text fontSize="smaller" color={mutedColor}>
              {formatDate(job.createdAt)}
            </Text> 
          </Box>
        
          {/* Job Title */}
          <Text 
            fontWeight="semibold" 
            fontSize="3xl" 
            color={textColor}
            noOfLines={2}
            lineHeight="1.4"
            w="full"
          >
            {job.title || 'Job Title'}
          </Text>

          {/* Job Type and Level Badges */}
          <HStack spacing={2} flexWrap="wrap">
            <Badge 
              colorScheme="gray" 
              variant="solid"
              borderRadius="md"
              px={3}
              py={1}
              fontSize="xs"
              fontWeight="normal"
              bg="gray.200"
              color="black"
            >
              {job.jobType || 'Full-time'}
            </Badge>
            <Badge 
              colorScheme="gray" 
              variant="solid"
              borderRadius="md"
              px={3}
              py={1}
              fontSize="xs"
              fontWeight="normal"
              bg="gray.200"
              color="black"
            >
              Senior level
            </Badge>
          </HStack>

          </VStack>

          
        <VStack spacing={4} w="full">
          <Divider borderColor="gray.400" /> 
          {/* Footer with Salary and Apply Button */}
          <Flex justify="space-between" align="center" w="full" pt={1}>
            
            <VStack align="start" spacing={0}>
              <Text 
                fontSize="lg" 
                fontWeight="bold" 
                color={textColor}
              >
                {formatSalary(job.salary)}
              </Text>
              <Text fontSize="sm" color={mutedColor} fontWeight="500">
                {job.location || 'Remote'}
              </Text>
            </VStack>
          </Flex>
        </VStack>
          
       </VStack>
          
      </CardBody>
    </Card>
  );
};

export default JobCard;