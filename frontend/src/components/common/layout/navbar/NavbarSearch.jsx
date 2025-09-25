import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Input, InputGroup, InputLeftElement, 
  Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow,
  VStack, Button, Text, useColorModeValue
} from '@chakra-ui/react';
import { HiSearch } from 'react-icons/hi';

const NavbarSearch = ({ 
  searchQuery, 
  setSearchQuery, 
  isSearchFocused, 
  setIsSearchFocused, 
  recentSearches, 
  handleQuickSearch 
}) => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const searchBg = useColorModeValue('gray.50', 'gray.700');

  const handleRecentSearchClick = (search) => {
    setSearchQuery(search);
    navigate(`/find-jobs?q=${encodeURIComponent(search)}`);
    setIsSearchFocused(false);
  };

  return (
    <Box flex={1} maxW="400px" mx={6} display={{ base: 'none', md: 'block' }}>
      <Popover
        isOpen={isSearchFocused && (searchQuery || recentSearches.length > 0)}
        onClose={() => setIsSearchFocused(false)}
        placement="bottom-start"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <InputGroup>
            <InputLeftElement>
              <HiSearch color="gray.400" />
            </InputLeftElement>
            <Input
              id="navbar-search"
              placeholder="Quick job search... (⌘K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleQuickSearch}
              onFocus={() => setIsSearchFocused(true)}
              bg={searchBg}
              border="1px solid"
              borderColor="gray.300"
              _hover={{ borderColor: 'gray.400' }}
              _focus={{ 
                borderColor: 'blue.500',
                boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.4)',
                bg: bgColor
              }}
              borderRadius="lg"
              size="sm"
            />
          </InputGroup>
        </PopoverTrigger>
        <PopoverContent w="400px">
          <PopoverArrow />
          <PopoverBody p={0}>
            {searchQuery ? (
              <VStack spacing={0} align="stretch">
                <Box p={3} borderBottom="1px" borderColor="gray.100">
                  <Text fontSize="sm" fontWeight="600" color="gray.600" mb={2}>
                    Press Enter to search for "{searchQuery}"
                  </Text>
                </Box>
              </VStack>
            ) : (
              <VStack spacing={0} align="stretch">
                <Box p={3} borderBottom="1px" borderColor="gray.100">
                  <Text fontSize="xs" fontWeight="600" color="gray.500" textTransform="uppercase">
                    Recent Searches
                  </Text>
                </Box>
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    justifyContent="flex-start"
                    leftIcon={<HiSearch size={14} />}
                    onClick={() => handleRecentSearchClick(search)}
                    borderRadius={0}
                  >
                    {search}
                  </Button>
                ))}
                {recentSearches.length === 0 && (
                  <Box p={3}>
                    <Text fontSize="sm" color="gray.500">
                      No recent searches
                    </Text>
                  </Box>
                )}
              </VStack>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default NavbarSearch;