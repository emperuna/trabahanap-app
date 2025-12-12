import React from 'react';
import { 
  Box, VStack, HStack, FormControl, FormLabel, Select, 
  Checkbox, Text, Collapse 
} from '@chakra-ui/react';
import SalaryRangeSlider from './SalaryRangeSlider';
import SkillsSelector from './SkillsSelector';

const AdvancedSearchFilters = ({ filters, onFilterChange }) => {
  return (
    <Collapse in={filters.showFilters} animateOpacity>
      <Box
        p={6}
        bg="gray.50"
        borderRadius="xl"
        border="1px"
        borderColor="gray.200"
        w="full"
      >
        <VStack spacing={6}>
          {/* Salary Range */}
          <SalaryRangeSlider
            salaryRange={filters.salaryRange}
            onChange={(range) => onFilterChange('salaryRange', range)}
          />

          {/* Filter Row 1 */}
          <HStack spacing={4} w="full" align="start">
            <FormControl flex={1}>
              <FormLabel fontWeight="600" fontSize="sm">Experience Level</FormLabel>
              <Select
                value={filters.experienceLevel}
                onChange={(e) => onFilterChange('experienceLevel', e.target.value)}
                placeholder="Any experience"
              >
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (3-5 years)</option>
                <option value="senior">Senior Level (5+ years)</option>
                <option value="lead">Lead/Manager (7+ years)</option>
              </Select>
            </FormControl>

            <FormControl flex={1}>
              <FormLabel fontWeight="600" fontSize="sm">Industry</FormLabel>
              <Select
                value={filters.industryFilter}
                onChange={(e) => onFilterChange('industryFilter', e.target.value)}
                placeholder="Any industry"
              >
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance & Banking</option>
                <option value="education">Education</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="consulting">Consulting</option>
              </Select>
            </FormControl>

            <FormControl flex={1}>
              <FormLabel fontWeight="600" fontSize="sm">Date Posted</FormLabel>
              <Select
                value={filters.datePosted}
                onChange={(e) => onFilterChange('datePosted', e.target.value)}
                placeholder="Any time"
              >
                <option value="24h">Last 24 hours</option>
                <option value="3d">Last 3 days</option>
                <option value="7d">Last week</option>
                <option value="30d">Last month</option>
              </Select>
            </FormControl>
          </HStack>

          {/* Remote Work Toggle */}
          <HStack w="full" justify="start">
            <Checkbox
              isChecked={filters.remoteWork}
              onChange={(e) => onFilterChange('remoteWork', e.target.checked)}
              colorScheme="blue"
            >
              <Text fontWeight="600" fontSize="sm">Remote work opportunities only</Text>
            </Checkbox>
          </HStack>

          {/* Skills Filter */}
          <SkillsSelector
            selectedSkills={filters.selectedSkills}
            onChange={(skills) => onFilterChange('selectedSkills', skills)}
          />
        </VStack>
      </Box>
    </Collapse>
  );
};

export default AdvancedSearchFilters;