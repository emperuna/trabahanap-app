import React from 'react';
import {
  VStack,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { HiSearch } from 'react-icons/hi';

const SearchSection = ({ searchQuery, onSearchChange }) => {
  const textPrimary = useColorModeValue('gray.900', 'gray.100');
  const textSecondary = useColorModeValue('gray.600', 'gray.400');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <VStack spacing={6} textAlign="center" maxW="2xl" mx="auto">
      <Heading
        fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
        fontWeight="bold"
        color={textPrimary}
      >
        How can we help you?
      </Heading>

      {/* Search Bar */}
      <InputGroup size="lg" maxW="xl" w="full">
        <InputLeftElement pointerEvents="none">
          <Icon as={HiSearch} color={textSecondary} />
        </InputLeftElement>
        <Input
          placeholder="Start typing your search..."
          value={searchQuery}
          onChange={onSearchChange}
          bg={cardBg}
          border="1px"
          borderColor={borderColor}
          _hover={{ borderColor: 'blue.300' }}
          _focus={{ 
            borderColor: 'blue.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)'
          }}
          rounded="full"
        />
      </InputGroup>

      <Text fontSize="sm" color={textSecondary}>
        Or choose a category below and see what we have for you
      </Text>
    </VStack>
  );
};

export default SearchSection;
