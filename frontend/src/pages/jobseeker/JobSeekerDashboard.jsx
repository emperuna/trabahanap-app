import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  useColorModeValue,
  Skeleton,
  Alert,
  AlertIcon,
  Button,
  Text,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';

import {
  DashboardSidebar,
  ProfileCompletionCard,
  StatsGrid,
  WelcomeSection,
  JobRecommendationsCard,
  QuickActionsCard,
  RecentActivityCard
} from '../../components/dashboard';

import { Loading } from '../../components/common/feedback';

const Dashboard = () => {
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

  // Design system colors
  const bgColor = useColorModeValue('gray.50', 'gray.900');

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
      <Box bg={bgColor} minH="100vh" p={6}>
        <Container maxW="8xl">
          <Grid templateColumns={{ base: '1fr', lg: '280px 1fr' }} gap={6}>
            <GridItem display={{ base: 'none', lg: 'block' }}>
              <Skeleton height="600px" borderRadius="xl" />
            </GridItem>
            <GridItem>
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
            </GridItem>
          </Grid>
        </Container>
      </Box>
    );
  }

  // Error state
  if (error && !userData && !user) {
    return (
      <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Container maxW="md" textAlign="center">
          <Alert status="error" borderRadius="xl" p={6}>
            <AlertIcon />
            <Box>
              <Text fontWeight="semibold">Failed to load dashboard</Text>
              <Text fontSize="sm" mt={1}>{error}</Text>
            </Box>
          </Alert>
          <Button mt={6} onClick={fetchUserData} colorScheme="purple" size="lg" borderRadius="xl">
            Try Again
          </Button>
        </Container>
      </Box>
    );
  }

  const currentUser = userData || user;

  return (
    <Box bg={bgColor} minH="100vh">
      <Container maxW="8xl" p={6}>
        <Grid templateColumns={{ base: '1fr', lg: '280px 1fr' }} gap={6}>
          {/* Sidebar */}
          <GridItem display={{ base: 'none', lg: 'block' }}>
            <Box position="sticky" top={6}>
              <DashboardSidebar />
            </Box>
          </GridItem>

          {/* Main Content */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Welcome Section */}
              <WelcomeSection user={currentUser} />

              {/* Stats Grid */}
              <StatsGrid stats={stats} />

              {/* Main Content Grid */}
              <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
                {/* Left Column */}
                <GridItem>
                  <VStack spacing={6}>
                    <QuickActionsCard />
                    <RecentActivityCard />
                  </VStack>
                </GridItem>

                {/* Right Column */}
                <GridItem>
                  <VStack spacing={6}>
                    <ProfileCompletionCard completion={stats.profileCompletion} />
                    <JobRecommendationsCard />
                  </VStack>
                </GridItem>
              </Grid>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;