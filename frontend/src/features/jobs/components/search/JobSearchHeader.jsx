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
  Badge,
  Wrap,
  WrapItem,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  useBreakpointValue,
  Portal,
} from '@chakra-ui/react';
import { 
  HiSearch, 
  HiX,
  HiChevronDown,
  HiBriefcase,
  HiCurrencyDollar,
  HiTag,
} from 'react-icons/hi';

const JobSearchHeader = ({ 
  totalJobs, 
  filteredJobs,
  filters,
  onFilterChange,
  onSearch,
  onClearFilters,
  activeFiltersCount,
}) => {
  const inputBg = useColorModeValue('white', 'whiteAlpha.200');
  const inputBorder = useColorModeValue('gray.200', 'whiteAlpha.300');
  const isMobile = useBreakpointValue({ base: true, md: false });

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'];
  const workTypes = ['On-site', 'Remote', 'Hybrid'];
  const classifications = [
    'Information Technology',
    'Healthcare',
    'Finance & Banking',
    'Marketing & Sales',
    'Engineering',
    'Education',
    'Customer Service',
    'Human Resources',
    'Manufacturing',
    'Hospitality',
  ];

  const toggleArrayFilter = (filterKey, value) => {
    const current = filters[filterKey] || [];
    const newValue = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFilterChange(filterKey, newValue);
  };

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
        <HStack justify="space-between" align="start" flexWrap="wrap" gap={3}>
          <VStack spacing={1} align="start" flex={1}>
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

          {/* Clear All Filters */}
          {activeFiltersCount > 0 && (
            <Button
              size="sm"
              variant="solid"
              bg="whiteAlpha.300"
              color="white"
              leftIcon={<HiX />}
              onClick={onClearFilters}
              _hover={{ bg: 'whiteAlpha.400' }}
              flexShrink={0}
            >
              {isMobile ? `Clear (${activeFiltersCount})` : `Clear Filters (${activeFiltersCount})`}
            </Button>
          )}
        </HStack>

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

        {/* Advanced Filters Row */}
        <Wrap spacing={2} w="full">
          {/* Classification Filter */}
          <WrapItem>
            <Menu closeOnSelect={false} placement="bottom-start">
              <MenuButton
                as={Button}
                size="sm"
                variant="solid"
                bg="whiteAlpha.200"
                color="white"
                rightIcon={<HiChevronDown />}
                leftIcon={<HiTag />}
                _hover={{ bg: 'whiteAlpha.300' }}
                _active={{ bg: 'whiteAlpha.300' }}
                fontSize="sm"
              >
                Category
                {filters.classification?.length > 0 && (
                  <Badge ml={2} colorScheme="yellow" borderRadius="full" fontSize="xs">
                    {filters.classification.length}
                  </Badge>
                )}
              </MenuButton>
              <Portal>
                <MenuList 
                  maxH="300px" 
                  overflowY="auto"
                  zIndex={9999}
                  boxShadow="xl"
                  css={{
                    '&::-webkit-scrollbar': { width: '8px' },
                    '&::-webkit-scrollbar-track': { background: 'transparent' },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#CBD5E0',
                      borderRadius: '4px',
                    },
                  }}
                >
                  {classifications.map((category) => (
                    <MenuItem
                      key={category}
                      onClick={() => toggleArrayFilter('classification', category)}
                      fontSize="sm"
                    >
                      <HStack justify="space-between" w="full">
                        <Text>{category}</Text>
                        {filters.classification?.includes(category) && (
                          <Badge colorScheme="blue" fontSize="xs">✓</Badge>
                        )}
                      </HStack>
                    </MenuItem>
                  ))}
                </MenuList>
              </Portal>
            </Menu>
          </WrapItem>

          {/* Job Type Filter */}
          <WrapItem>
            <Menu closeOnSelect={false} placement="bottom-start">
              <MenuButton
                as={Button}
                size="sm"
                variant="solid"
                bg="whiteAlpha.200"
                color="white"
                rightIcon={<HiChevronDown />}
                leftIcon={<HiBriefcase />}
                _hover={{ bg: 'whiteAlpha.300' }}
                _active={{ bg: 'whiteAlpha.300' }}
                fontSize="sm"
              >
                Job Type
                {filters.jobTypeFilter?.length > 0 && (
                  <Badge ml={2} colorScheme="yellow" borderRadius="full" fontSize="xs">
                    {filters.jobTypeFilter.length}
                  </Badge>
                )}
              </MenuButton>
              <Portal>
                <MenuList zIndex={9999} boxShadow="xl">
                  {jobTypes.map((type) => (
                    <MenuItem
                      key={type}
                      onClick={() => toggleArrayFilter('jobTypeFilter', type)}
                      fontSize="sm"
                    >
                      <HStack justify="space-between" w="full">
                        <Text>{type}</Text>
                        {filters.jobTypeFilter?.includes(type) && (
                          <Badge colorScheme="blue" fontSize="xs">✓</Badge>
                        )}
                      </HStack>
                    </MenuItem>
                  ))}
                </MenuList>
              </Portal>
            </Menu>
          </WrapItem>

          {/* Work Type Filter */}
          <WrapItem>
            <Menu closeOnSelect={false} placement="bottom-start">
              <MenuButton
                as={Button}
                size="sm"
                variant="solid"
                bg="whiteAlpha.200"
                color="white"
                rightIcon={<HiChevronDown />}
                _hover={{ bg: 'whiteAlpha.300' }}
                _active={{ bg: 'whiteAlpha.300' }}
                fontSize="sm"
              >
                🏠 Work Type
                {filters.workType?.length > 0 && (
                  <Badge ml={2} colorScheme="yellow" borderRadius="full" fontSize="xs">
                    {filters.workType.length}
                  </Badge>
                )}
              </MenuButton>
              <Portal>
                <MenuList zIndex={9999} boxShadow="xl">
                  {workTypes.map((type) => (
                    <MenuItem
                      key={type}
                      onClick={() => toggleArrayFilter('workType', type)}
                      fontSize="sm"
                    >
                      <HStack justify="space-between" w="full">
                        <Text>{type}</Text>
                        {filters.workType?.includes(type) && (
                          <Badge colorScheme="blue" fontSize="xs">✓</Badge>
                        )}
                      </HStack>
                    </MenuItem>
                  ))}
                </MenuList>
              </Portal>
            </Menu>
          </WrapItem>

          {/* Salary Range Filter */}
          <WrapItem>
            <Menu placement="bottom-start">
              <MenuButton
                as={Button}
                size="sm"
                variant="solid"
                bg="whiteAlpha.200"
                color="white"
                rightIcon={<HiChevronDown />}
                leftIcon={<HiCurrencyDollar />}
                _hover={{ bg: 'whiteAlpha.300' }}
                _active={{ bg: 'whiteAlpha.300' }}
                fontSize="sm"
              >
                Salary
              </MenuButton>
              <Portal>
                <MenuList p={4} minW="280px" zIndex={9999} boxShadow="xl">
                  <VStack spacing={4} align="stretch">
                    <Text fontSize="sm" fontWeight="semibold">
                      Monthly Salary (₱)
                    </Text>
                    <HStack justify="space-between">
                      <Text fontSize="xs" fontWeight="medium" color="blue.600">
                        ₱{(filters.salaryRange?.[0] || 0).toLocaleString()}
                      </Text>
                      <Text fontSize="xs" fontWeight="medium" color="blue.600">
                        ₱{(filters.salaryRange?.[1] || 200000).toLocaleString()}
                      </Text>
                    </HStack>
                    <RangeSlider
                      defaultValue={filters.salaryRange || [0, 200000]}
                      min={0}
                      max={200000}
                      step={5000}
                      onChange={(val) => onFilterChange('salaryRange', val)}
                      colorScheme="blue"
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} boxSize={4} />
                      <RangeSliderThumb index={1} boxSize={4} />
                    </RangeSlider>
                    <HStack justify="space-between" fontSize="xs" color="gray.500">
                      <Text>₱0</Text>
                      <Text>₱200K</Text>
                    </HStack>
                  </VStack>
                </MenuList>
              </Portal>
            </Menu>
          </WrapItem>
        </Wrap>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <Wrap spacing={2}>
            {filters.classification?.map((category) => (
              <WrapItem key={category}>
                <Badge
                  colorScheme="purple"
                  px={2}
                  py={1}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  fontSize="xs"
                  cursor="pointer"
                  _hover={{ opacity: 0.8 }}
                  onClick={() => toggleArrayFilter('classification', category)}
                >
                  {category}
                  <Box as="span" fontWeight="bold">×</Box>
                </Badge>
              </WrapItem>
            ))}
            {filters.jobTypeFilter?.map((type) => (
              <WrapItem key={type}>
                <Badge
                  colorScheme="yellow"
                  px={2}
                  py={1}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  fontSize="xs"
                  cursor="pointer"
                  _hover={{ opacity: 0.8 }}
                  onClick={() => toggleArrayFilter('jobTypeFilter', type)}
                >
                  {type}
                  <Box as="span" fontWeight="bold">×</Box>
                </Badge>
              </WrapItem>
            ))}
            {filters.workType?.map((type) => (
              <WrapItem key={type}>
                <Badge
                  colorScheme="green"
                  px={2}
                  py={1}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  fontSize="xs"
                  cursor="pointer"
                  _hover={{ opacity: 0.8 }}
                  onClick={() => toggleArrayFilter('workType', type)}
                >
                  {type}
                  <Box as="span" fontWeight="bold">×</Box>
                </Badge>
              </WrapItem>
            ))}
          </Wrap>
        )}
      </VStack>
    </Box>
  );
};

export default JobSearchHeader;