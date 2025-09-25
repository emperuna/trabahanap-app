import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { HStack, Button, Badge, Tooltip, Kbd, Text } from '@chakra-ui/react';
import { HiHome, HiSearch } from 'react-icons/hi';

const NavbarNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: HiHome,
      badge: null,
      description: 'Overview and quick actions',
      shortcut: 'D'
    },
    {
      label: 'Find Jobs',
      path: '/find-jobs',
      icon: HiSearch,
      badge: 'Hot',
      description: 'Browse and search for jobs',
      shortcut: 'F'
    }
  ];

  const isActivePath = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <HStack spacing={2} display={{ base: 'none', lg: 'flex' }}>
      {navigationItems.map((item) => (
        <Tooltip
          key={item.path}
          label={
            <HStack spacing={2}>
              <Text>{item.description}</Text>
              <Kbd fontSize="xs">⌘{item.shortcut}</Kbd>
            </HStack>
          }
          placement="bottom"
        >
          <Button
            as={RouterLink}
            to={item.path}
            variant={isActivePath(item.path) ? 'solid' : 'ghost'}
            colorScheme={isActivePath(item.path) ? 'blue' : 'gray'}
            size="sm"
            fontWeight="500"
            borderRadius="lg"
            px={4}
            py={2}
            h={10}
            leftIcon={<item.icon size={16} />}
            rightIcon={item.badge && (
              <Badge
                colorScheme={item.badge === 'Hot' ? 'red' : 'blue'}
                borderRadius="full"
                fontSize="xs"
                px={2}
                py={0.5}
                ml={1}
              >
                {item.badge}
              </Badge>
            )}
            _hover={{
              transform: 'translateY(-1px)',
              boxShadow: 'sm'
            }}
            transition="all 0.2s ease"
          >
            {item.label}
          </Button>
        </Tooltip>
      ))}
    </HStack>
  );
};

export default NavbarNavigation;