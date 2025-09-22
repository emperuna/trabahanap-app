import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Icon,
  Card,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiHome,
  HiPlus,
  HiBriefcase,
  HiClipboardList,
  HiUserGroup,
  HiChartBar,
  HiCog,
  HiSupport,
  HiLogout,
} from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const EmployerSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const navigationItems = [
    {
      label: 'Dashboard',
      icon: HiHome,
      path: '/employer-dashboard',
      badge: null,
    },
    {
      label: 'Post Job',
      icon: HiPlus,
      path: '/employer/post-job',
      badge: null,
    },
    {
      label: 'Manage Jobs',
      icon: HiBriefcase,
      path: '/employer/jobs',
      badge: '8',
    },
    {
      label: 'Applications',
      icon: HiClipboardList,
      path: '/employer/applications',
      badge: '23',
    },
    {
      label: 'Candidates',
      icon: HiUserGroup,
      path: '/employer/candidates',
      badge: null,
    },
    {
      label: 'Analytics',
      icon: HiChartBar,
      path: '/employer/analytics',
      badge: null,
    },
    {
      label: 'Settings',
      icon: HiCog,
      path: '/employer/settings',
      badge: null,
    },
  ];

  const isActive = (path) => {
    if (path === '/employer-dashboard') {
      return location.pathname === '/employer-dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Box
      bg={cardBg}
      borderRadius="2xl"
      border="1px"
      borderColor={borderColor}
      p={6}
      w="280px"
    >
      <VStack spacing={6} align="stretch">
        {/* Navigation Header */}
        <Box>
          <Text fontWeight="bold" color="gray.800" mb={4}>
            Employer Hub
          </Text>
          <VStack spacing={2} align="stretch">
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                as={Link}
                to={item.path}
                variant={isActive(item.path) ? 'solid' : 'ghost'}
                colorScheme={isActive(item.path) ? 'blue' : 'gray'}
                justifyContent="flex-start"
                h={12}
                px={4}
                borderRadius="xl"
                fontWeight="medium"
                bg={isActive(item.path) ? 'blue.500' : 'transparent'}
                color={isActive(item.path) ? 'white' : 'gray.700'}
                _hover={{
                  bg: isActive(item.path) ? 'blue.600' : 'gray.100',
                  transform: 'translateX(4px)',
                }}
                transition="all 0.2s ease"
              >
                <HStack spacing={3} w="full">
                  <Icon as={item.icon} boxSize={5} />
                  <Text flex="1" textAlign="left">
                    {item.label}
                  </Text>
                  {item.badge && (
                    <Badge
                      colorScheme={isActive(item.path) ? 'white' : 'blue'}
                      variant={isActive(item.path) ? 'outline' : 'solid'}
                      borderRadius="full"
                      px={2}
                      fontSize="xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </HStack>
              </Button>
            ))}
          </VStack>
        </Box>

        {/* Help Section */}
        <Box>
          <Text fontWeight="semibold" color="gray.800" mb={3} fontSize="sm">
            Support
          </Text>
          <VStack spacing={2} align="stretch">
            <Button
              as={Link}
              to="/help"
              variant="ghost"
              justifyContent="flex-start"
              h={10}
              px={4}
              borderRadius="xl"
              fontWeight="medium"
              color="gray.700"
              _hover={{ bg: 'gray.100', transform: 'translateX(4px)' }}
              transition="all 0.2s ease"
            >
              <HStack spacing={3}>
                <Icon as={HiSupport} boxSize={4} />
                <Text fontSize="sm">Help Center</Text>
              </HStack>
            </Button>

            <Button
              onClick={logout}
              variant="ghost"
              justifyContent="flex-start"
              h={10}
              px={4}
              borderRadius="xl"
              fontWeight="medium"
              color="red.600"
              _hover={{ bg: 'red.50', transform: 'translateX(4px)' }}
              transition="all 0.2s ease"
            >
              <HStack spacing={3}>
                <Icon as={HiLogout} boxSize={4} />
                <Text fontSize="sm">Logout</Text>
              </HStack>
            </Button>
          </VStack>
        </Box>

        {/* Upgrade Card */}
        <Card bg="blue.50" border="1px" borderColor="blue.200" p={4}>
          <VStack spacing={3}>
            <Text fontSize="sm" fontWeight="semibold" color="blue.800" textAlign="center">
              Upgrade to Premium
            </Text>
            <Text fontSize="xs" color="blue.600" textAlign="center">
              Get unlimited job posts and priority support
            </Text>
            <Button
              as={Link}
              to="/employer/pricing"
              size="sm"
              colorScheme="blue"
              w="full"
              borderRadius="lg"
            >
              Upgrade Now
            </Button>
          </VStack>
        </Card>
      </VStack>
    </Box>
  );
};

export default EmployerSidebar;