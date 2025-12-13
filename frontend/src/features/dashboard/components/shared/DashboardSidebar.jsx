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
  HiTrendingUp
} from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/context/AuthContext';
import { savedJobsAPI } from '../../../../shared/api';

const DashboardSidebar = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  // State management
  const [profileCompletion, setProfileCompletion] = useState(75);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [savedJobsCount, setSavedJobsCount] = useState(0);
  const [loadingSavedJobs, setLoadingSavedJobs] = useState(false);

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

  // ✅ Fetch initial saved jobs count
  const fetchSavedJobsCount = async () => {
    if (!isAuthenticated) {
      setSavedJobsCount(0);
      return;
    }

    try {
      setLoadingSavedJobs(true);
      console.log('📊 Fetching saved jobs count for sidebar...');
      const count = await savedJobsAPI.getSavedJobsCount();
      console.log('✅ Sidebar: Saved jobs count fetched:', count);
      setSavedJobsCount(count);
    } catch (error) {
      console.error('❌ Sidebar: Error fetching saved jobs count:', error);
      setSavedJobsCount(0);
    } finally {
      setLoadingSavedJobs(false);
    }
  };

  // ✅ Initial fetch on authentication change
  useEffect(() => {
    fetchSavedJobsCount();
  }, [isAuthenticated]);

  // ✅ Listen for real-time saved job events
  useEffect(() => {
    const handleSavedJobAdded = (event) => {
      console.log('🔔 Sidebar: Received savedJobAdded event:', event.detail);
      setSavedJobsCount(prevCount => {
        const newCount = prevCount + 1;
        console.log(`📊 Sidebar: Saved jobs count updated: ${prevCount} → ${newCount}`);
        return newCount;
      });
    };

    const handleSavedJobRemoved = (event) => {
      console.log('🔔 Sidebar: Received savedJobRemoved event:', event.detail);
      setSavedJobsCount(prevCount => {
        const newCount = Math.max(0, prevCount - 1);
        console.log(`📊 Sidebar: Saved jobs count updated: ${prevCount} → ${newCount}`);
        return newCount;
      });
    };

    // ✅ Add event listeners
    window.addEventListener('savedJobAdded', handleSavedJobAdded);
    window.addEventListener('savedJobRemoved', handleSavedJobRemoved);
    
    return () => {
      window.removeEventListener('savedJobAdded', handleSavedJobAdded);
      window.removeEventListener('savedJobRemoved', handleSavedJobRemoved);
    };
  }, []);

  // ✅ Refresh count when sidebar becomes visible (optional)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isAuthenticated) {
        console.log('👁️ Sidebar: Document became visible, refreshing count...');
        fetchSavedJobsCount();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthenticated]);

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
      
      // Reset saved jobs count on logout
      setSavedJobsCount(0);
      
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

  // ✅ Menu items with dynamic saved jobs count
  const menuItems = [
    {
      label: 'Dashboard',
      icon: HiHome,
      path: '/dashboard',
      badge: null,
      description: 'Overview & quick actions',
      color: 'blue'
    },
    // {
    //   label: 'My Profile',
    //   icon: HiUser,
    //   path: '/dashboard/profile',
    //   badge: `${profileCompletion}%`,
    //   description: 'Manage your profile',
    //   color: 'orange'
    // },
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
      badge: savedJobsCount > 0 ? savedJobsCount.toString() : null,
      description: 'Your bookmarked jobs',
      color: 'purple',
      isLoading: loadingSavedJobs
    },
  ];

  const isActivePath = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const getBadgeColor = (badge, color) => {
    if (!badge) return 'gray';
    if (badge === 'Hot') return 'red';
    if (badge === 'New') return 'green';
    if (badge.includes('%')) return 'orange';
    return color || 'blue';
  };

  const getBadgeText = (item) => {
    if (item.isLoading && item.label === 'Saved Jobs') {
      return '...';
    }
    return item.badge;
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
                {/* ✅ Dynamic badge display */}
                {(item.badge || item.isLoading) && (
                  <Badge
                    colorScheme={getBadgeColor(item.badge, item.color)}
                    variant="solid"
                    borderRadius="full"
                    fontSize="xs"
                    px={2}
                    py={0.5}
                    opacity={item.isLoading ? 0.7 : 1}
                    // ✅ Add special styling for saved jobs count
                    bg={item.label === 'Saved Jobs' && savedJobsCount > 0 ? 'purple.500' : undefined}
                  >
                    {getBadgeText(item)}
                  </Badge>
                )}
              </Button>
            </Tooltip>
          ))}
        </VStack>
      </Card>
    </VStack>
  );
};

export default DashboardSidebar;