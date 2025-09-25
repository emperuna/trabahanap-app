import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  HStack, VStack, Button, Image, Box, Text, Progress, useColorModeValue 
} from '@chakra-ui/react';
import logo from '../../../../assets/logo/TrabaHanap-Logo.svg';

const NavbarLogo = ({ profileCompletion, isOnline }) => {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <HStack spacing={3}>
      <Button
        as={RouterLink}
        to="/dashboard"
        variant="ghost"
        p={2}
        h="auto"
        _hover={{ transform: 'scale(1.05)' }}
        transition="all 0.2s ease"
        borderRadius="lg"
        position="relative"
      >
        <Image 
          src={logo} 
          alt="TrabaHanap" 
          h={10} 
          w={10}
          filter={useColorModeValue('none', 'brightness(0) invert(1)')}
        />
        {/* Online status indicator */}
        <Box
          position="absolute"
          bottom={0}
          right={0}
          w={3}
          h={3}
          bg={isOnline ? 'green.400' : 'red.400'}
          borderRadius="full"
          border="2px solid"
          borderColor={bgColor}
        />
      </Button>

      {/* Profile completion indicator */}
      <VStack spacing={0} align="start" display={{ base: 'none', md: 'flex' }}>
        <Text fontSize="xs" color="gray.500">
          Profile {profileCompletion}% complete
        </Text>
        <Progress 
          value={profileCompletion} 
          size="xs" 
          colorScheme="blue" 
          w="100px"
          borderRadius="full"
        />
      </VStack>
    </HStack>
  );
};

export default NavbarLogo;