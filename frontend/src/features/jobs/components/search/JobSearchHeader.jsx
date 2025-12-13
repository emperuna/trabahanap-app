import React from 'react';
import { 
  Box, 
  VStack, 
  HStack,
  Heading, 
  Text,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { 
  HiSearch, 
} from 'react-icons/hi';

const JobSearchHeader = ({ 
  totalJobs, 
  filteredJobs,
  filters,
  onFilterChange,
  onSearch,
}) => {
  const inputBg = useColorModeValue('white', 'whiteAlpha.200');
  const inputBorder = useColorModeValue('gray.200', 'whiteAlpha.300');
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      bg="blue.600"
      borderRadius={{ base: 'xl', md: '2xl' }}
      overflow="visible"
      position="relative"
    >
      {/* Gradient Background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgGradient="linear(120deg, blue.600 0%, blue.500 50%, blue.400 100%)"
        zIndex={0}
        borderRadius={{ base: 'xl', md: '2xl' }}
      />
      
      <VStack 
        spacing={{ base: 4, md: 5 }} 
        p={{ base: 6, md: 8 }} 
        position="relative" 
        zIndex={1} 
        align="stretch" 
        w="full"
      >
        {/* Header Text */}
        <VStack spacing={1} align="start">
          <Heading 
            size={{ base: 'xl', md: '2xl' }}
            fontWeight="800"
            letterSpacing="-0.025em"
            lineHeight="1.1"
            color="white"
          >
            Find Your Dream Job
          </Heading>
          
          <Text 
            fontSize={{ base: 'sm', md: 'md' }}
            opacity={0.95}
            fontWeight="400"
            color="white"
          >
            {filteredJobs} of {totalJobs} jobs available
          </Text>
        </VStack>

        {/* Main Search Bar */}
        <HStack 
          w="full" 
          spacing={3}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
        >
          {/* Job Title Search */}
          <InputGroup flex={{ base: '100%', md: 2 }} minW={{ base: 'full', md: '200px' }}>
            <InputLeftElement pointerEvents="none" h="full">
              <HiSearch color="gray" size={20} />
            </InputLeftElement>
            <Input
              placeholder="Job title, keywords, or company..."
              value={filters?.searchTerm || ''}
              onChange={(e) => onFilterChange('searchTerm', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
              bg={inputBg}
              borderColor={inputBorder}
              _hover={{ borderColor: 'blue.300' }}
              _focus={{ 
                borderColor: 'blue.400',
                boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)',
              }}
              size="lg"
              fontSize="md"
            />
          </InputGroup>

          {/* Search Button */}
          <Button
            colorScheme="yellow"
            size="lg"
            px={{ base: 6, md: 8 }}
            onClick={onSearch}
            flexShrink={0}
            w={{ base: 'full', md: 'auto' }}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            transition="all 0.2s"
          >
            {isMobile ? 'Search' : 'Search Jobs'}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default JobSearchHeader;