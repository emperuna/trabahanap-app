import { useState, useEffect } from 'react';

export const useEmployerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeJobs: 8,
    totalApplications: 127,
    interviewsScheduled: 12,
    hiredCandidates: 6,
    profileViews: 89,
    responseRate: 85
  });

  const [recentJobs, setRecentJobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      location: 'Makati, Metro Manila',
      type: 'Full-time',
      status: 'Active',
      applications: 23,
      postedDate: '2 days ago'
    },
    {
      id: 2,
      title: 'Marketing Manager',
      location: 'BGC, Taguig',
      type: 'Full-time',
      status: 'Active',
      applications: 18,
      postedDate: '5 days ago'
    }
  ]);

  const [upcomingInterviews, setUpcomingInterviews] = useState([
    {
      id: 1,
      candidateName: 'John Doe',
      position: 'Frontend Developer',
      date: 'Today, 2:00 PM',
      type: 'Technical Interview'
    },
    {
      id: 2,
      candidateName: 'Jane Smith',
      position: 'Marketing Manager',
      date: 'Tomorrow, 10:00 AM',
      type: 'Final Interview'
    }
  ]);

  const [pipelineData, setPipelineData] = useState([
    { label: 'New Applications', count: 45, progress: 75, colorScheme: 'blue' },
    { label: 'Under Review', count: 23, progress: 60, colorScheme: 'purple' },
    { label: 'Interviews', count: 12, progress: 40, colorScheme: 'green' },
    { label: 'Offers Extended', count: 6, progress: 85, colorScheme: 'orange' }
  ]);

  useEffect(() => {
    // Simulate API call
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Here you would make actual API calls:
        // const statsResponse = await employerAPI.getStats();
        // const jobsResponse = await employerAPI.getRecentJobs();
        // setStats(statsResponse.data);
        // setRecentJobs(jobsResponse.data);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return {
    loading,
    stats,
    recentJobs,
    upcomingInterviews,
    pipelineData,
    getGreeting
  };
};