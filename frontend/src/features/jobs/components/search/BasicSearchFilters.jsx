import React from 'react';
import { HStack, Input, Select, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { HiSearch, HiLocationMarker } from 'react-icons/hi';

const BasicSearchFilters = ({ 
  searchTerm, 
  locationFilter, 
  jobTypeFilter, 
  onFilterChange, 
  onSearch 
}) => {
  return (
    <>
      <InputGroup flex={2}>
        <InputLeftElement>
          <HiSearch color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search jobs, companies, or keywords..."
          value={searchTerm}
          onChange={(e) => onFilterChange('searchTerm', e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        />
      </InputGroup>
      
      <InputGroup flex={1}>
        <InputLeftElement>
          <HiLocationMarker color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Location"
          value={locationFilter}
          onChange={(e) => onFilterChange('locationFilter', e.target.value)}
        />
      </InputGroup>
      
      <Select
        placeholder="Job Type"
        value={jobTypeFilter}
        onChange={(e) => onFilterChange('jobTypeFilter', e.target.value)}
        flex={1}
      >
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Remote">Remote</option>
        <option value="Freelance">Freelance</option>
      </Select>
    </>
  );
};

export default BasicSearchFilters;