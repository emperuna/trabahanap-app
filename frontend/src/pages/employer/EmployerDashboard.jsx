import React from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { useEmployerDashboard } from '../../hooks/useEmployerDashboard';

// Components
import EmployerSidebar from '../../components/dashboard/EmployerSidebar';
import WelcomeHeader from '../../components/dashboard/employer/WelcomeHeader';
import ActionAlert from '../../components/dashboard/employer/ActionAlert';
import QuickActions from '../../components/dashboard/employer/QuickActions';
import RecentJobs from '../../components/dashboard/employer/RecentJobs';
import HiringPipeline from '../../components/dashboard/employer/HiringPipeline';
import UpcomingInterviews from '../../components/dashboard/employer/UpcomingInterviews';
import Loading from '../../components/common/Loading';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const {
    loading,
    stats,
    recentJobs,
    upcomingInterviews,
    pipelineData,
    getGreeting
  } = useEmployerDashboard();

  const bgColor = useColorModeValue('gray.50', 'gray.900');

  if (loading) {
    return <Loading />;
  }

  return (
    <Box bg={bgColor} minH="100vh">
      <Container maxW="8xl" p={6}>
        <Grid templateColumns={{ base: '1fr', lg: '280px 1fr' }} gap={6}>
          {/* Sidebar */}
          <GridItem display={{ base: 'none', lg: 'block' }}>
            <Box position="sticky" top={6}>
              <EmployerSidebar />
            </Box>
          </GridItem>

          {/* Main Content */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Welcome Header */}
              <WelcomeHeader 
                user={user} 
                greeting={getGreeting()} 
                stats={stats} 
              />

              {/* Action Alert */}
              <ActionAlert />

              {/* Main Dashboard Grid */}
              <Grid templateColumns={{ base: '1fr', xl: '2fr 1fr' }} gap={6}>
                {/* Left Column */}
                <GridItem>
                  <VStack spacing={6}>
                    <QuickActions />
                    <RecentJobs jobs={recentJobs} />
                  </VStack>
                </GridItem>

                {/* Right Column */}
                <GridItem>
                  <VStack spacing={6}>
                    <HiringPipeline pipelineData={pipelineData} />
                    <UpcomingInterviews interviews={upcomingInterviews} />
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

export default EmployerDashboard;