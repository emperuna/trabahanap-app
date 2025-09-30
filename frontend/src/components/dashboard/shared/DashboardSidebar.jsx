import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Divider,
  Icon,
  Card,
  useColorModeValue,
  useToast,
  Progress,
  Avatar,
  Flex,
  Tooltip,
  Switch,
  FormControl,
  FormLabel,
  useColorMode
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
  HiLightningBolt,
  HiTrendingUp,
  HiChevronDown,
  HiChevronUp,
  HiGlobe,
  HiMoon,
  HiSun
} from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const DashboardSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  // Enhanced state management
  const [profileCompletion, setProfileCompletion] = useState(75);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Online status detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLogout = async () => {
    try {
      toast({
        title: 'Signing out...',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });

      console.log('🚪 Job Seeker Sidebar: Logout button clicked');
      await logout();
      
      toast({
        title: 'Signed out successfully',
        description: 'Come back soon for more opportunities!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('❌ Job Seeker Sidebar: Logout failed:', error);
      toast({
        title: 'Logout failed',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700'); 
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  const activeColor = useColorModeValue('blue.600', 'blue.400');
  const textColor = useColorModeValue('gray.700', 'gray.200'); 
  const mutedColor = useColorModeValue('gray.500', 'gray.400'); 
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  // ✅ Menu items with badges and descriptions
  const menuItems = [
    {
      label: 'Dashboard',
      icon: HiHome,
      path: '/dashboard',
      badge: null,
      description: 'Overview & quick actions',
      color: 'blue'
    },
    {
      label: 'My Profile',
      icon: HiUser,
      path: '/dashboard/profile',
      badge: `${profileCompletion}%`,
      description: 'Manage your profile',
      color: 'orange'
    },
    {
      label: 'Find Jobs',
      icon: HiSearch,
      path: '/find-jobs',
      badge: 'Hot',
      description: 'Discover opportunities',
      color: 'red'
    },
    {
      label: 'Applications',
      icon: HiBriefcase,
      path: '/dashboard/applications',
      badge: '3',
      description: 'Track your applications',
      color: 'green'
    },
    {
      label: 'Saved Jobs',
      icon: HiHeart,
      path: '/dashboard/saved',
      badge: '12',
      description: 'Your bookmarked jobs',
      color: 'purple'
    },
    {
      label: 'Resume',
      icon: HiDocumentText,
      path: '/dashboard/resume',
      badge: null,
      description: 'CV builder & manager',
      color: 'cyan'
    },
    {
      label: 'Analytics',
      icon: HiChartBar,
      path: '/dashboard/analytics',
      badge: null,
      description: 'Job search insights',
      color: 'teal'
    },
  ];

  const isActivePath = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  // Get badge color based on type
  const getBadgeColor = (badge, color) => {
    if (!badge) return 'gray';
    if (badge === 'Hot') return 'red';
    if (badge === 'New') return 'green';
    if (badge.includes('%')) return 'orange';
    return color || 'blue';
  };

  return (
    <VStack spacing={4} align="stretch" h="full">
      {/* User Profile Card */}
      <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor} p={4}>
        <VStack spacing={3} align="stretch">
          <HStack spacing={3}>
            <Avatar 
              size="md" 
              name={user?.firstName || user?.username}
              src={user?.profilePicture}
            />
            <VStack spacing={0} align="start" flex={1}>
              <Text fontWeight="600" fontSize="sm" noOfLines={1}>
                {user?.firstName || user?.username}
              </Text>
              <HStack spacing={2}>
                <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                  Job Seeker
                </Badge>
                <Badge 
                  colorScheme={isOnline ? 'green' : 'red'} 
                  variant="subtle" 
                  fontSize="xs"
                >
                  {isOnline ? 'Online' : 'Offline'}
                </Badge>
              </HStack>
            </VStack>
          </HStack>
          
          {/* Profile Completion */}
          <Box>
            <Flex justify="space-between" mb={1}>
              <Text fontSize="xs" color={mutedColor}>Profile Complete</Text>
              <Text fontSize="xs" color={activeColor} fontWeight="600">
                {profileCompletion}%
              </Text>
            </Flex>
            <Progress 
              value={profileCompletion} 
              size="sm" 
              colorScheme="blue"
              borderRadius="full"
              bg={useColorModeValue('gray.100', 'gray.700')}
            />
          </Box>
        </VStack>
      </Card>

      {/* Main Navigation */}
      <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor} p={4}>
        <VStack spacing={1} align="stretch">
          <Text
            fontSize="xs"
            fontWeight="bold"
            color={mutedColor}
            textTransform="uppercase"
            letterSpacing="wider"
            mb={3}
          >
            <HStack spacing={2}>
              <HiLightningBolt />
              <Text>Quick Actions</Text>
            </HStack>
          </Text>

          {menuItems.map((item) => (
            <Tooltip
              key={item.path}
              label={item.description}
              placement="right"
              hasArrow
            >
              <Button
                as={Link}
                to={item.path}
                variant="ghost"
                justifyContent="flex-start"
                h={12}
                borderRadius="lg"
                bg={isActivePath(item.path) ? activeBg : 'transparent'}
                color={isActivePath(item.path) ? activeColor : textColor} 
                fontWeight={isActivePath(item.path) ? 'semibold' : 'medium'}
                _hover={{
                  bg: isActivePath(item.path) ? activeBg : hoverBg, 
                  color: isActivePath(item.path) ? activeColor : useColorModeValue('gray.800', 'gray.100'), 
                  transform: 'translateX(2px)',
                  boxShadow: 'sm'
                }}
                transition="all 0.2s ease"
                leftIcon={<Icon as={item.icon} boxSize={4} />}
                px={3}
              >
                <Box flex="1" textAlign="left">
                  <Text fontSize="sm">{item.label}</Text>
                </Box>
                {item.badge && (
                  <Badge
                    colorScheme={getBadgeColor(item.badge, item.color)}
                    variant="solid"
                    borderRadius="full"
                    fontSize="xs"
                    px={2}
                    py={0.5}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </Tooltip>
          ))}
        </VStack>
      </Card>

      {/* Quick Stats */}
      <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor} p={4}>
        <VStack spacing={3} align="stretch">
          <Text
            fontSize="xs"
            fontWeight="bold"
            color={mutedColor}
            textTransform="uppercase"
            letterSpacing="wider"
          >
            <HStack spacing={2}>
              <HiTrendingUp />
              <Text>This Week</Text>
            </HStack>
          </Text>
          
          <HStack justify="space-between">
            <VStack spacing={0} align="start">
              <Text fontSize="lg" fontWeight="bold" color={activeColor}>12</Text>
              <Text fontSize="xs" color={mutedColor}>Jobs Applied</Text>
            </VStack>
            <VStack spacing={0} align="start">
              <Text fontSize="lg" fontWeight="bold" color="green.500">5</Text>
              <Text fontSize="xs" color={mutedColor}>Profile Views</Text>
            </VStack>
            <VStack spacing={0} align="start">
              <Text fontSize="lg" fontWeight="bold" color="purple.500">8</Text>
              <Text fontSize="xs" color={mutedColor}>New Matches</Text>
            </VStack>
          </HStack>
        </VStack>
      </Card>

      {/* Settings & Account - Updated to navigate instead of expand */}
      <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor} p={4}>
        <VStack spacing={1} align="stretch">
          <Button
            as={Link}
            to="/settings"
            variant="ghost"
            justifyContent="flex-start"
            h={10}
            borderRadius="lg"
            color={textColor}
            fontWeight="medium"
            _hover={{ bg: hoverBg }}
            transition="all 0.2s ease"
            leftIcon={<Icon as={HiCog} boxSize={4} />}
          >
            <Box flex="1" textAlign="left">
              <Text fontSize="sm">Settings & Preferences</Text>
            </Box>
          </Button>

          <Divider my={2} />

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="ghost"
            justifyContent="flex-start"
            h={10}
            borderRadius="lg"
            fontWeight="medium"
            color={useColorModeValue('red.600', 'red.400')} 
            _hover={{ 
              bg: useColorModeValue('red.50', 'red.900'),
              transform: 'translateX(2px)',
              boxShadow: 'sm'
            }}
            transition="all 0.2s ease"
            leftIcon={<Icon as={HiLogout} boxSize={4} />}
          >
            <Text fontSize="sm">Sign Out</Text>
          </Button>
        </VStack>
      </Card>
    </VStack>
  );
};

export default DashboardSidebar;