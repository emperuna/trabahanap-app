import React, { useState, useEffect } from 'react';
import {
  Grid,
  GridItem,
  VStack,
  Skeleton,
  Alert,
  AlertIcon,
  Button,
  Text,
  Box,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { applicationsAPI } from '../../services/api';

// Layout
import JobSeekerLayout from '../../components/common/layout/JobSeekerLayout';

// Dashboard Components
import {
  JobRecommendationsCard,
  RecentActivityCard,
  ApplicationPipelineCard,
  PriorityBanner,
  QuickStatsCard,
  ComingSoonCard,
} from '../../components/dashboard';

import { HiChartBar, HiLightningBolt, HiTrendingUp } from 'react-icons/hi';

const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await applicationsAPI.getMyApplications();
      setApplications(response || []);
    } catch (err) {
      console.error('Failed to fetch applications:', err);
      setError('Failed to load applications');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate real stats from applications
  const stats = {
    applications: applications.length,
    savedJobs: 0,
    profileViews: 0,
    profileCompletion: 75,
  };

  // Loading state
  if (loading) {
    return (
      <JobSeekerLayout>
        <Grid templateColumns={{ base: '1fr', xl: '1fr 380px' }} gap={6}>
          <GridItem>
            <VStack spacing={6} align="stretch">
              <Skeleton height="180px" borderRadius="xl" />
              <Skeleton height="400px" borderRadius="xl" />
              <Skeleton height="300px" borderRadius="xl" />
            </VStack>
          </GridItem>
          <GridItem display={{ base: 'none', xl: 'block' }}>
            <VStack spacing={6}>
              <Skeleton height="200px" borderRadius="xl" />
              <Skeleton height="150px" borderRadius="xl" />
            </VStack>
          </GridItem>
        </Grid>
      </JobSeekerLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <JobSeekerLayout>
        <Box textAlign="center" py={10}>
          <Alert status="error" borderRadius="xl" p={6} maxW="md" mx="auto">
            <AlertIcon />
            <Box>
              <Text fontWeight="semibold">Failed to load dashboard</Text>
              <Text fontSize="sm" mt={1}>{error}</Text>
            </Box>
          </Alert>
          <Button 
            mt={6} 
            onClick={fetchApplications} 
            colorScheme="blue" 
            size="lg" 
            borderRadius="xl"
          >
            Try Again
          </Button>
        </Box>
      </JobSeekerLayout>
    );
  }

  return (
    <JobSeekerLayout>
      <Grid 
        templateColumns={{ base: '1fr', xl: '1fr 380px' }} 
        gap={6}
        alignItems="start"
      >
        {/* Left Column - Main Content */}
        <GridItem>
          <VStack spacing={6} align="stretch">
            <PriorityBanner 
              applications={applications} 
              savedJobs={[]} 
              stats={stats}
            />
            <ApplicationPipelineCard applications={applications} />
            <JobRecommendationsCard />
            
            {/* Recent Activity - Mobile/Tablet only */}
            <Box display={{ base: 'block', xl: 'none' }}>
              <RecentActivityCard applications={applications} />
            </Box>
          </VStack>
        </GridItem>

        {/* Right Column - Scrolls with content */}
        <GridItem display={{ base: 'none', xl: 'block' }}>
          <VStack spacing={6} align="stretch">
            <QuickStatsCard applications={applications} stats={stats} />
            <RecentActivityCard applications={applications} />
            
            <ComingSoonCard
              title="Job Market Insights"
              description="Salary trends, demand level, and market intelligence"
              icon={HiChartBar}
            />
            
            <ComingSoonCard
              title="AI Job Matching"
              description="Smart job recommendations with match scores"
              icon={HiLightningBolt}
            />
            
            <ComingSoonCard
              title="Performance Analytics"
              description="Track your application success rate and insights"
              icon={HiTrendingUp}
            />
          </VStack>
        </GridItem>
      </Grid>
    </JobSeekerLayout>
  );
};

export default JobSeekerDashboard;