import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  useColorModeValue,
  Skeleton,
  Alert,
  AlertIcon,
  Button,
  Text,
  VStack
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import { useLocation } from 'react-router-dom';

// Import components
import { DashboardSidebar } from '../../components/dashboard';
import JobSeekerNavbar from '../../components/common/layout/JobSeekerNavbar'; // ✅ CHANGED: Use new navbar
import JobSeekerDashboard from './JobSeekerDashboard';
import JobSeekerFindJobs from './JobSeekerFindJobs';
import JobSeekerProfile from './JobSeekerProfile';
import JobSeekerJobDetail from './JobSeekerJobDetail';
import JobSeekerApplications from './JobSeekerApplications';
import JobSeekerSavedJobs from './JobSeekerSavedJobs';

const JobSeekerPage = () => {
  // Custom scrollbar styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .hide-scrollbar {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none !important;
      }
      .dashboard-content-scrollbar {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      .dashboard-content-scrollbar::-webkit-scrollbar {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const { user } = useAuth();
  const location = useLocation();
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

  // Function to render content based on current route
  const renderContent = () => {
    const currentUser = userData || user;
    
    switch (location.pathname) {
      case '/dashboard':
        return <JobSeekerDashboard user={currentUser} stats={stats} />;
      
      case '/find-jobs':
        return <JobSeekerFindJobs />;
      
      case '/dashboard/profile':
      case '/dashboard/profile/edit':
      case '/dashboard/settings/profile':
        return <JobSeekerProfile />;
      
      case '/dashboard/applications':
        return <JobSeekerApplications />;
      
      case '/dashboard/saved':
        return <JobSeekerSavedJobs/>;
      
      case '/dashboard/resume':
        return (
          <VStack spacing={6} align="stretch">
            <Text fontSize="2xl" fontWeight="bold">Resume Builder</Text>
            <Text>Resume builder and management will be implemented here.</Text>
          </VStack>
        );
      
      case '/dashboard/analytics':
        return (
          <VStack spacing={6} align="stretch">
            <Text fontSize="2xl" fontWeight="bold">Analytics</Text>
            <Text>Your job search analytics will be displayed here.</Text>
          </VStack>
        );
      
      default:
        // Check if it's a job detail route
        if (location.pathname.startsWith('/jobs/')) {
          return <JobSeekerJobDetail />;
        }
        // Default to dashboard content
        return <JobSeekerDashboard user={currentUser} stats={stats} />;
    }
  };

  // Loading state
  if (loading) {
    return (
      <Box bg={bgColor} minH="100vh">
        <JobSeekerNavbar />
        <Container maxW="8xl" p={6} pt="5rem">
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
      <Box bg={bgColor} minH="100vh">
        <JobSeekerNavbar />
        <Box display="flex" alignItems="center" justifyContent="center" pt="4rem" minH="calc(100vh - 4rem)">
          <Container maxW="md" textAlign="center">
          <Alert status="error" borderRadius="xl" p={6}>
            <AlertIcon />
            <Box>
              <Text fontWeight="semibold">Failed to load dashboard</Text>
              <Text fontSize="sm" mt={1}>{error}</Text>
            </Box>
          </Alert>
          <Button mt={6} onClick={fetchUserData} colorScheme="blue" size="lg" borderRadius="xl">
            Try Again
          </Button>
        </Container>
        </Box>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh">
      <JobSeekerNavbar />
      <Container maxW="8xl" p={6} pt="5rem">
        <Grid templateColumns={{ base: '1fr', lg: '280px 1fr' }} gap={6}>
          {/* Sidebar */}
          <GridItem display={{ base: 'none', lg: 'block' }}>
            <Box position="sticky" top={6} pt={6}>
              <DashboardSidebar />
            </Box>
          </GridItem>

          {/* Dynamic Content Area */}
          <GridItem>
            <Box
              maxH="calc(100vh - 48px)"
              overflowY="auto"
              className="dashboard-content-scrollbar hide-scrollbar"
              position="relative"
              pt={6}
            >
              {renderContent()}
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default JobSeekerPage;