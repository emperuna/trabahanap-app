import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  GridItem,
  VStack,
  Skeleton,
  Alert,
  AlertIcon,
  Button,
  Text,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';

import {
  ProfileProgressCard,
  ProfileCompletionCard,
  StatsGrid,
  WelcomeSection,
  JobRecommendationsCard,
  QuickActionsCard,
  RecentActivityCard
} from '../../components/dashboard';

import { Loading } from '../../components/common/feedback';

const Dashboard = ({ user: propUser, stats: propStats }) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    applications: 12,
    savedJobs: 8,
    profileViews: 24,
    profileCompletion: 75
  });



  useEffect(() => {
    fetchUserData();
    fetchUserStats();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      try {
        const response = await authAPI.verifyToken();
        setUserData(response);
      } catch (apiError) {
        console.log('Using context user data as fallback');
        setUserData(user);
      }
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      setError('Failed to load user data');
      setUserData(user);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      // Mock data - replace with actual API calls
      setStats({
        applications: 12,
        savedJobs: 8,
        profileViews: 24,
        profileCompletion: 75
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  // Loading state
  if (loading) {
    return (
      <VStack spacing={6}>
        <Skeleton height="200px" width="100%" borderRadius="xl" />
        <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={6} w="full">
          <Skeleton height="120px" borderRadius="xl" />
          <Skeleton height="120px" borderRadius="xl" />
          <Skeleton height="120px" borderRadius="xl" />
          <Skeleton height="120px" borderRadius="xl" />
        </Grid>
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} w="full">
          <Skeleton height="400px" borderRadius="xl" />
          <Skeleton height="400px" borderRadius="xl" />
        </Grid>
      </VStack>
    );
  }

  // Error state
  if (error && !userData && !user) {
    return (
      <Box textAlign="center" py={10}>
        <Alert status="error" borderRadius="xl" p={6} maxW="md" mx="auto">
          <AlertIcon />
          <Box>
            <Text fontWeight="semibold">Failed to load dashboard</Text>
            <Text fontSize="sm" mt={1}>{error}</Text>
          </Box>
        </Alert>
        <Button mt={6} onClick={fetchUserData} colorScheme="blue" size="lg" borderRadius="xl">
          Try Again
        </Button>
      </Box>
    );
  }

  // Use props if available, otherwise fallback to fetched data
  const currentUser = propUser || userData || user;
  const currentStats = propStats || stats;

  return (
    <VStack spacing={6} align="stretch">
      <WelcomeSection user={currentUser} />
      <StatsGrid stats={currentStats} />
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        <GridItem>
          <VStack spacing={6}>
            <QuickActionsCard />
            <RecentActivityCard />
          </VStack>
        </GridItem>
        <GridItem>
          <VStack spacing={6}>
            <ProfileProgressCard completion={currentStats.profileCompletion} />
            <JobRecommendationsCard />
          </VStack>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Dashboard;