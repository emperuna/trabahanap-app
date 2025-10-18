import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { HStack, Button, Badge, Tooltip, Kbd, Text } from '@chakra-ui/react';
import { HiHome, HiSearch, HiPlus, HiBriefcase, HiClipboardList, HiOfficeBuilding } from 'react-icons/hi';

const NavbarNavigation = ({ userRole = 'jobseeker' }) => { // ✅ Add userRole prop with default
  const location = useLocation();

  // ✅ Define navigation items based on user role
  const getNavigationItems = () => {
    if (userRole === 'employer') {
      return [
        {
          label: 'Dashboard',
          path: '/employer-dashboard',
          icon: HiHome,
          badge: null,
          description: 'Employer overview and analytics',
          shortcut: 'D'
        },
        {
          label: 'Post Jobs',
          path: '/employer-dashboard?section=postJob',
          icon: HiPlus,
          badge: 'New',
          description: 'Create new job postings',
          shortcut: 'P'
        },
        {
          label: 'Applications',
          path: '/employer-dashboard?section=applications',
          icon: HiClipboardList,
          badge: null,
          description: 'Review candidate applications',
          shortcut: 'A'
        },
        {
          label: 'Manage Jobs',
          path: '/employer-dashboard?section=manageJobs',
          icon: HiBriefcase,
          badge: null,
          description: 'Edit and manage job listings',
          shortcut: 'M'
        }
      ];
    } else {
      // ✅ Keep existing jobseeker navigation unchanged
      return [
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
    }
  };

  const navigationItems = getNavigationItems();

  // ✅ Enhanced path matching for both role types
  const isActivePath = (path) => {
    if (userRole === 'employer') {
      // Handle employer dashboard with query parameters
      if (path === '/employer-dashboard' && location.pathname === '/employer-dashboard' && !location.search) {
        return true;
      }
      if (path.includes('?') && location.pathname + location.search === path) {
        return true;
      }
      return false;
    } else {
      // ✅ Keep existing jobseeker logic unchanged
      if (path === '/dashboard' && location.pathname === '/dashboard') return true;
      if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
      return false;
    }
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
                colorScheme={item.badge === 'Hot' ? 'red' : item.badge === 'New' ? 'green' : 'blue'} // ✅ Handle different badge colors
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