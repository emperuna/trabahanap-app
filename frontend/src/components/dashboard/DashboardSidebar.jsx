import React from 'react';
import {
  Box,
  VStack,
  Button,
  Text,
  Icon,
  Badge,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiHome,
  HiUser,
  HiBriefcase,
  HiHeart,
  HiDocumentText,
  HiCog,
  HiLogout,
  HiSearch,
  HiChartBar,
} from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const cardBg = useColorModeValue('white', 'gray.800');
  const activeBg = useColorModeValue('purple.50', 'purple.900');
  const activeColor = useColorModeValue('purple.600', 'purple.300');

  const menuItems = [
    {
      label: 'Dashboard',
      icon: HiHome,
      path: '/dashboard',
      badge: null,
    },
    {
      label: 'My Profile',
      icon: HiUser,
      path: '/dashboard/profile',
      badge: null,
    },
    {
      label: 'Find Jobs',
      icon: HiSearch,
      path: '/jobs',
      badge: 'New',
    },
    {
      label: 'Applications',
      icon: HiBriefcase,
      path: '/dashboard/applications',
      badge: '3',
    },
    {
      label: 'Saved Jobs',
      icon: HiHeart,
      path: '/dashboard/saved',
      badge: null,
    },
    {
      label: 'Resume',
      icon: HiDocumentText,
      path: '/dashboard/resume',
      badge: null,
    },
    {
      label: 'Analytics',
      icon: HiChartBar,
      path: '/dashboard/analytics',
      badge: null,
    },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Box
      bg={cardBg}
      borderRadius="2xl"
      p={6}
      boxShadow="sm"
      border="1px"
      borderColor="gray.100"
      position="sticky"
      top={8}
    >
      <VStack spacing={1} align="stretch">
        <Text
          fontSize="xs"
          fontWeight="bold"
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="wider"
          mb={4}
        >
          Main Menu
        </Text>

        {menuItems.map((item) => (
          <Button
            key={item.path}
            as={Link}
            to={item.path}
            variant="ghost"
            justifyContent="flex-start"
            h={12}
            borderRadius="xl"
            bg={isActive(item.path) ? activeBg : 'transparent'}
            color={isActive(item.path) ? activeColor : 'gray.600'}
            fontWeight={isActive(item.path) ? 'semibold' : 'medium'}
            _hover={{
              bg: isActive(item.path) ? activeBg : 'gray.50',
              color: isActive(item.path) ? activeColor : 'gray.800',
              transform: 'translateX(4px)',
            }}
            transition="all 0.2s ease"
            leftIcon={<Icon as={item.icon} />}
          >
            <Box flex="1" textAlign="left">
              {item.label}
            </Box>
            {item.badge && (
              <Badge
                colorScheme={item.badge === 'New' ? 'green' : 'purple'}
                variant="solid"
                borderRadius="full"
                fontSize="xs"
              >
                {item.badge}
              </Badge>
            )}
          </Button>
        ))}

        <Divider my={4} />

        <Text
          fontSize="xs"
          fontWeight="bold"
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="wider"
          mb={4}
        >
          Account
        </Text>

        <Button
          as={Link}
          to="/dashboard/settings"
          variant="ghost"
          justifyContent="flex-start"
          h={12}
          borderRadius="xl"
          bg={isActive('/dashboard/settings') ? activeBg : 'transparent'}
          color={isActive('/dashboard/settings') ? activeColor : 'gray.600'}
          fontWeight={isActive('/dashboard/settings') ? 'semibold' : 'medium'}
          _hover={{
            bg: isActive('/dashboard/settings') ? activeBg : 'gray.50',
            color: isActive('/dashboard/settings') ? activeColor : 'gray.800',
            transform: 'translateX(4px)',
          }}
          transition="all 0.2s ease"
          leftIcon={<Icon as={HiCog} />}
        >
          Settings
        </Button>

        <Button
          variant="ghost"
          justifyContent="flex-start"
          h={12}
          borderRadius="xl"
          color="red.500"
          fontWeight="medium"
          _hover={{
            bg: 'red.50',
            color: 'red.600',
            transform: 'translateX(4px)',
          }}
          transition="all 0.2s ease"
          leftIcon={<Icon as={HiLogout} />}
          onClick={logout}
        >
          Logout
        </Button>
      </VStack>
    </Box>
  );
};

export default DashboardSidebar;