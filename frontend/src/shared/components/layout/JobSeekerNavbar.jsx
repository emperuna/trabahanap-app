import React from 'react';
import {
  Box,
  Flex,
  Container,
  HStack,
  IconButton,
  Tooltip,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Badge,
  Text,
  Image,
  VStack,
  useColorModeValue,
  Alert,
  AlertIcon,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  HiHome,
  HiSearch,
  HiBriefcase,
  HiHeart,
  HiBell,
  HiUser,
  HiCog,
  HiLogout,
  HiMenu,
  HiChevronDown,
  HiGlobe,
} from 'react-icons/hi';
import { useAuth } from '../../../features/auth/context/AuthContext';
import { useNavbarState } from '../../hooks/useNavbarState';
import logo from '../../../assets/logo/TrabaHanap-Logo.svg';

const JobSeekerNavbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const navbarState = useNavbarState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Theme colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const logoFilter = useColorModeValue('none', 'brightness(0) invert(1)');

  // Navigation items
  const navItems = [
    {
      icon: HiHome,
      label: 'Dashboard',
      path: '/dashboard',
      exact: true,
    },
    {
      icon: HiSearch,
      label: 'Find Jobs',
      path: '/find-jobs',
    },
    {
      icon: HiBriefcase,
      label: 'Applications',
      path: '/dashboard/applications',
    },
    {
      icon: HiHeart,
      label: 'Saved Jobs',
      path: '/dashboard/saved',
    },
  ];

  // Check if path is active
  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Handle logout
  const handleLogout = () => {
    navbarState.handleLogout();
    navigate('/login');
  };

  // Profile completion from navbarState or default to 75
  const profileCompletion = navbarState.profileCompletion || 75;

  return (
    <>
      <Box
        bg={bgColor}
        borderBottom="1px"
        borderColor={borderColor}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        backdropFilter="blur(10px)"
        boxShadow="sm"
      >
        <Container maxW="8xl" px={6}>
          <Flex h={16} alignItems="center" justify="space-between">
            {/* Left: Logo */}
            <Box minW="200px">
              <HStack spacing={2}>
                {/* Mobile Menu Button */}
                <IconButton
                  icon={<HiMenu />}
                  variant="ghost"
                  display={{ base: 'flex', md: 'none' }}
                  onClick={onOpen}
                  aria-label="Open menu"
                />

                {/* Logo with Online Status */}
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
                    filter={logoFilter}
                  />
                  {/* Online status indicator */}
                  <Box
                    position="absolute"
                    bottom={0}
                    right={0}
                    w={3}
                    h={3}
                    bg={navbarState.isOnline ? 'green.400' : 'red.400'}
                    borderRadius="full"
                    border="2px solid"
                    borderColor={bgColor}
                  />
                </Button>

                {/* Offline Badge (optional - already have indicator) */}
                {!navbarState.isOnline && (
                  <Badge
                    colorScheme="red"
                    fontSize="xs"
                    display={{ base: 'flex', md: 'none' }}
                  >
                    Offline
                  </Badge>
                )}
              </HStack>
            </Box>

            {/* Center: Icon Navigation - Desktop only */}
            <HStack
              spacing={8}
              display={{ base: 'none', md: 'flex' }}
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
            >
              {navItems.map((item) => {
                const active = isActive(item.path, item.exact);
                return (
                  <Tooltip
                    key={item.path}
                    label={item.label}
                    placement="bottom"
                    hasArrow
                  >
                    <IconButton
                      as={RouterLink}
                      to={item.path}
                      icon={<item.icon size={22} />}
                      variant={active ? 'solid' : 'ghost'}
                      colorScheme={active ? 'blue' : 'gray'}
                      size="lg"
                      borderRadius="xl"
                      aria-label={item.label}
                      _hover={{
                        transform: 'translateY(-2px)',
                        shadow: active ? 'md' : 'sm',
                      }}
                      transition="all 0.2s ease"
                    />
                  </Tooltip>
                );
              })}
            </HStack>

            {/* Right: Actions (Notifications + User Menu) */}
            <Box minW="200px" display="flex" justifyContent="flex-end">
              <HStack spacing={2}>
                {/* Notifications Menu */}
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={
                      <Box position="relative">
                        <HiBell size={20} />
                        {navbarState.unreadCount > 0 && (
                          <Badge
                            position="absolute"
                            top="-8px"
                            right="-8px"
                            colorScheme="red"
                            borderRadius="full"
                            fontSize="xs"
                            minW="18px"
                            h="18px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            {navbarState.unreadCount}
                          </Badge>
                        )}
                      </Box>
                    }
                    variant="ghost"
                    borderRadius="xl"
                    aria-label="Notifications"
                  />
                  <MenuList maxH="400px" overflowY="auto">
                    <Box px={4} py={2}>
                      <Text fontWeight="semibold" fontSize="sm">
                        Notifications
                      </Text>
                    </Box>
                    <MenuDivider />

                    {navbarState.notifications.length > 0 ? (
                      navbarState.notifications.map((notification) => (
                        <MenuItem
                          key={notification.id}
                          onClick={() => navbarState.markAsRead(notification.id)}
                          bg={notification.read ? 'transparent' : hoverBg}
                          _hover={{ bg: hoverBg }}
                        >
                          <VStack align="start" spacing={1} w="full">
                            <HStack justify="space-between" w="full">
                              <Text fontSize="sm" fontWeight="medium">
                                {notification.title}
                              </Text>
                              {!notification.read && (
                                <Badge colorScheme="blue" fontSize="xs">
                                  New
                                </Badge>
                              )}
                            </HStack>
                            <Text fontSize="xs" color={mutedColor}>
                              {notification.message}
                            </Text>
                            <Text fontSize="xs" color={mutedColor}>
                              {notification.time}
                            </Text>
                          </VStack>
                        </MenuItem>
                      ))
                    ) : (
                      <Box px={4} py={8} textAlign="center">
                        <Text fontSize="sm" color={mutedColor}>
                          No notifications
                        </Text>
                      </Box>
                    )}
                  </MenuList>
                </Menu>

                {/* Enhanced User Menu */}
                <Menu>
                  <MenuButton
                    as={Button}
                    variant="ghost"
                    size="sm"
                    borderRadius="lg"
                    rightIcon={<HiChevronDown size={14} />}
                    _hover={{ bg: hoverBg }}
                    display={{ base: 'none', md: 'flex' }}
                  >
                    <HStack spacing={2}>
                      <Avatar
                        size="sm"
                        name={user?.firstName || user?.username}
                        src={user?.profilePicture}
                      />
                      <VStack spacing={0} align="start">
                        <Text fontSize="sm" fontWeight="500" lineHeight="1">
                          {user?.firstName || user?.username}
                        </Text>
                        <Text fontSize="xs" color={mutedColor} lineHeight="1">
                          Job Seeker
                        </Text>
                      </VStack>
                    </HStack>
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      as={RouterLink}
                      to="/dashboard"
                      icon={<HiBriefcase />}
                    >
                      Dashboard
                    </MenuItem>
                    <MenuItem
                      as={RouterLink}
                      to="/dashboard/profile"
                      icon={<HiUser />}
                    >
                      <HStack justify="space-between" w="full">
                        <Text>My Profile</Text>
                        <Badge colorScheme="orange" fontSize="xs">
                          {profileCompletion}%
                        </Badge>
                      </HStack>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      as={RouterLink}
                      to="/settings"
                      icon={<HiCog />}
                    >
                      Settings
                    </MenuItem>
                    <MenuItem icon={<HiGlobe />}>
                      Language: English
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      onClick={handleLogout}
                      icon={<HiLogout />}
                      color="red.500"
                    >
                      Sign Out
                    </MenuItem>
                  </MenuList>
                </Menu>

                {/* Mobile - Avatar Only */}
                <Avatar
                  size="sm"
                  name={user?.firstName || user?.username}
                  src={user?.profilePicture}
                  display={{ base: 'flex', md: 'none' }}
                  cursor="pointer"
                  onClick={onOpen}
                />
              </HStack>
            </Box>
          </Flex>
        </Container>

        {/* Offline Alert */}
        {!navbarState.isOnline && (
          <Alert status="warning" size="sm" py={1}>
            <AlertIcon boxSize={3} />
            <Text fontSize="xs">You're offline. Some features may not work.</Text>
          </Alert>
        )}
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <VStack align="start" spacing={3}>
              {/* Logo */}
              <HStack spacing={3}>
                <Box position="relative">
                  <Image
                    src={logo}
                    alt="TrabaHanap"
                    h={10}
                    w={10}
                    filter={logoFilter}
                  />
                  <Box
                    position="absolute"
                    bottom={0}
                    right={0}
                    w={3}
                    h={3}
                    bg={navbarState.isOnline ? 'green.400' : 'red.400'}
                    borderRadius="full"
                    border="2px solid"
                    borderColor={bgColor}
                  />
                </Box>
                <Text fontSize="lg" fontWeight="bold" color="blue.500">
                  TrabaHanap
                </Text>
              </HStack>

              {/* User Info */}
              <HStack w="full">
                <Avatar
                  size="sm"
                  name={`${user?.firstName} ${user?.lastName}`}
                  src={user?.profilePicture}
                />
                <VStack align="start" spacing={0} flex={1}>
                  <Text fontSize="sm" fontWeight="medium">
                    {user?.firstName} {user?.lastName}
                  </Text>
                  <Text fontSize="xs" color={mutedColor}>
                    {user?.email}
                  </Text>
                </VStack>
                <Badge
                  colorScheme={navbarState.isOnline ? 'green' : 'red'}
                  fontSize="xs"
                >
                  {navbarState.isOnline ? 'Online' : 'Offline'}
                </Badge>
              </HStack>

              {/* Profile Completion Badge */}
              <HStack w="full" justify="space-between" px={2}>
                <Text fontSize="xs" color={mutedColor}>
                  Profile Complete
                </Text>
                <Badge colorScheme="orange" fontSize="xs">
                  {profileCompletion}%
                </Badge>
              </HStack>
            </VStack>
          </DrawerHeader>

          <DrawerBody>
            <VStack align="stretch" spacing={1} mt={4}>
              {/* Navigation Items */}
              {navItems.map((item) => {
                const active = isActive(item.path, item.exact);
                return (
                  <Button
                    key={item.path}
                    as={RouterLink}
                    to={item.path}
                    leftIcon={<item.icon size={20} />}
                    variant={active ? 'solid' : 'ghost'}
                    colorScheme={active ? 'blue' : 'gray'}
                    justifyContent="flex-start"
                    onClick={onClose}
                    borderRadius="lg"
                  >
                    {item.label}
                  </Button>
                );
              })}

              <Divider my={4} />

              {/* Notifications Section */}
              <Box>
                <HStack justify="space-between" mb={2} px={2}>
                  <Text fontSize="sm" fontWeight="semibold">
                    Notifications
                  </Text>
                  {navbarState.unreadCount > 0 && (
                    <Badge colorScheme="red" borderRadius="full">
                      {navbarState.unreadCount}
                    </Badge>
                  )}
                </HStack>

                {navbarState.notifications.length > 0 ? (
                  <VStack align="stretch" spacing={1}>
                    {navbarState.notifications.slice(0, 3).map((notification) => (
                      <Box
                        key={notification.id}
                        p={3}
                        bg={notification.read ? 'transparent' : hoverBg}
                        borderRadius="lg"
                        cursor="pointer"
                        onClick={() => {
                          navbarState.markAsRead(notification.id);
                          onClose();
                        }}
                      >
                        <HStack justify="space-between" mb={1}>
                          <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                            {notification.title}
                          </Text>
                          {!notification.read && (
                            <Badge colorScheme="blue" fontSize="xs">
                              New
                            </Badge>
                          )}
                        </HStack>
                        <Text fontSize="xs" color={mutedColor} noOfLines={2}>
                          {notification.message}
                        </Text>
                        <Text fontSize="xs" color={mutedColor} mt={1}>
                          {notification.time}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                ) : (
                  <Box p={4} textAlign="center">
                    <Text fontSize="sm" color={mutedColor}>
                      No notifications
                    </Text>
                  </Box>
                )}
              </Box>

              <Divider my={4} />

              {/* Profile & Settings */}
              <Button
                as={RouterLink}
                to="/dashboard/profile"
                leftIcon={<HiUser />}
                variant="ghost"
                justifyContent="flex-start"
                onClick={onClose}
                borderRadius="lg"
              >
                <HStack justify="space-between" w="full">
                  <Text>My Profile</Text>
                  <Badge colorScheme="orange" fontSize="xs">
                    {profileCompletion}%
                  </Badge>
                </HStack>
              </Button>

              <Button
                as={RouterLink}
                to="/settings"
                leftIcon={<HiCog />}
                variant="ghost"
                justifyContent="flex-start"
                onClick={onClose}
                borderRadius="lg"
              >
                Settings
              </Button>

              <Button
                leftIcon={<HiGlobe />}
                variant="ghost"
                justifyContent="flex-start"
                borderRadius="lg"
              >
                Language: English
              </Button>

              <Divider my={4} />

              {/* Logout */}
              <Button
                leftIcon={<HiLogout />}
                variant="ghost"
                justifyContent="flex-start"
                onClick={() => {
                  handleLogout();
                  onClose();
                }}
                color="red.500"
                borderRadius="lg"
              >
                Sign Out
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default JobSeekerNavbar;