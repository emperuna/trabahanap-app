import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody,
  VStack, HStack, Avatar, Text, Badge, Box, Flex, Progress, InputGroup,
  InputLeftElement, Input, Button, Divider, FormControl, FormLabel, Switch
} from '@chakra-ui/react';
import {
  HiSearch, HiBriefcase, HiCog, HiLogout
} from 'react-icons/hi';

const NavbarMobileDrawer = ({ isOpen, onClose, user, navbarState }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <VStack spacing={3} align="start" w="full">
            <HStack spacing={3} w="full">
              <Avatar 
                size="sm" 
                name={user?.firstName || user?.username}
                src={user?.profilePicture}
              />
              <VStack spacing={0} align="start" flex={1}>
                <Text fontWeight="600">
                  {user?.firstName || user?.username}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Job Seeker Portal
                </Text>
              </VStack>
              <Badge colorScheme="green" variant="subtle">
                {navbarState.isOnline ? 'Online' : 'Offline'}
              </Badge>
            </HStack>
            
            {/* Profile completion */}
            <Box w="full">
              <Flex justify="space-between" mb={1}>
                <Text fontSize="xs" color="gray.500">Profile Complete</Text>
                <Text fontSize="xs" color="gray.500">{navbarState.profileCompletion}%</Text>
              </Flex>
              <Progress 
                value={navbarState.profileCompletion} 
                size="xs" 
                colorScheme="blue"
                borderRadius="full"
              />
            </Box>
          </VStack>
        </DrawerHeader>

        <DrawerBody p={0}>
          <VStack spacing={0} align="stretch">
            {/* Quick Search */}
            <Box p={4} bg="blue.50">
              <Text fontSize="xs" fontWeight="600" color="blue.600" mb={3} textTransform="uppercase">
                Quick Search
              </Text>
              <InputGroup>
                <InputLeftElement>
                  <HiSearch color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search jobs..."
                  value={navbarState.searchQuery}
                  onChange={(e) => navbarState.setSearchQuery(e.target.value)}
                  onKeyPress={navbarState.handleQuickSearch}
                  size="sm"
                  bg="white"
                />
              </InputGroup>
            </Box>

            {/* Quick Actions */}
            <Box p={4}>
              <Text fontSize="xs" fontWeight="600" color="gray.500" mb={3} textTransform="uppercase">
                Quick Actions
              </Text>
              <VStack spacing={2} align="stretch">
                <Button
                  as={RouterLink}
                  to="/find-jobs"
                  leftIcon={<HiSearch />}
                  colorScheme="blue"
                  size="sm"
                  justifyContent="flex-start"
                  onClick={onClose}
                >
                  Find New Jobs
                </Button>
                <Button
                  as={RouterLink}
                  to="/dashboard"
                  leftIcon={<HiBriefcase />}
                  variant="outline"
                  colorScheme="blue"
                  size="sm"
                  justifyContent="flex-start"
                  onClick={onClose}
                >
                  Go to Dashboard
                </Button>
              </VStack>
            </Box>

            <Divider />

            {/* Settings */}
            <Box p={4}>
              <Text fontSize="xs" fontWeight="600" color="gray.500" mb={3} textTransform="uppercase">
                Preferences
              </Text>
              <VStack spacing={3} align="stretch">
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="dark-mode" mb="0" fontSize="sm">
                    Dark Mode
                  </FormLabel>
                  <Switch 
                    id="dark-mode" 
                    isChecked={navbarState.colorMode === 'dark'}
                    onChange={navbarState.toggleColorMode}
                    colorScheme="blue"
                  />
                </FormControl>
              </VStack>
            </Box>

            <Divider />

            {/* Account Section */}
            <Box p={4}>
              <Text fontSize="xs" fontWeight="600" color="gray.500" mb={3} textTransform="uppercase">
                Account
              </Text>
              <VStack spacing={1} align="stretch">
                <Button
                  as={RouterLink}
                  to="/dashboard/settings"
                  variant="ghost"
                  size="md"
                  h={10}
                  justifyContent="flex-start"
                  leftIcon={<HiCog />}
                  onClick={onClose}
                >
                  Settings & Preferences
                </Button>
                <Button
                  onClick={() => {
                    onClose();
                    navbarState.handleLogout();
                  }}
                  variant="ghost"
                  size="md"
                  h={10}
                  justifyContent="flex-start"
                  leftIcon={<HiLogout />}
                  color="red.500"
                  _hover={{ bg: 'red.50' }}
                >
                  Sign Out
                </Button>
              </VStack>
            </Box>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NavbarMobileDrawer;