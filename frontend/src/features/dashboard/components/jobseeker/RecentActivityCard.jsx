import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  HStack,
  Text,
  Icon,
  Badge,
  Button,
  Box,
  Divider,
} from '@chakra-ui/react';
import {
  HiBriefcase,
  HiCheckCircle,
  HiClock,
  HiArrowRight,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const RecentActivityCard = ({ applications = [] }) => {
  const navigate = useNavigate();

  // Get recent activities (last 10, sorted by date)
  const recentActivities = applications
    .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
    .slice(0, 10)
    .map(app => ({
      id: app.id,
      type: 'application',
      title: `Applied to ${app.job?.title || 'Job'}`,
      company: app.job?.company || 'Company',
      status: app.status,
      timestamp: app.appliedAt,
      updatedAt: app.updatedAt,
    }));

  const getActivityIcon = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return { icon: HiCheckCircle, color: 'green' };
      case 'INTERVIEW':
        return { icon: HiCheckCircle, color: 'purple' };
      case 'REVIEWED':
        return { icon: HiCheckCircle, color: 'blue' };
      case 'REJECTED':
        return { icon: HiClock, color: 'red' };
      default:
        return { icon: HiClock, color: 'yellow' };
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      PENDING: 'yellow',
      REVIEWED: 'blue',
      INTERVIEW: 'purple',
      REJECTED: 'red',
      ACCEPTED: 'green',
    };
    return colors[status] || 'gray';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  if (applications.length === 0) {
    return (
      <Card boxShadow="lg" borderRadius="2xl">
        <CardHeader>
          <Heading size="md">Recent Activity</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} py={8} textAlign="center">
            <Icon as={HiBriefcase} boxSize="48px" color="gray.400" />
            <Text color="gray.600">No activity yet</Text>
            <Text fontSize="sm" color="gray.500">
              Start applying to jobs to see your activity here
            </Text>
            <Button
              colorScheme="blue"
              size="sm"
              onClick={() => navigate('/dashboard/find-jobs')}
              borderRadius="lg"
            >
              Find Jobs
            </Button>
          </VStack>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card boxShadow="lg" borderRadius="2xl">
      <CardHeader>
        <HStack justify="space-between">
          <Box>
            <Heading size="md">Recent Activity</Heading>
            <Text fontSize="sm" color="gray.600" mt={1}>
              Your latest job search actions
            </Text>
          </Box>
          <Button
            size="sm"
            variant="ghost"
            colorScheme="blue"
            rightIcon={<HiArrowRight />}
            onClick={() => navigate('/dashboard/applications')}
          >
            View All
          </Button>
        </HStack>
      </CardHeader>
      <CardBody>
        <VStack spacing={0} align="stretch" divider={<Divider />}>
          {recentActivities.map((activity) => {
            const { icon, color } = getActivityIcon(activity.status);
            
            return (
              <HStack
                key={activity.id}
                py={3}
                spacing={4}
                cursor="pointer"
                _hover={{ bg: 'gray.50' }}
                borderRadius="lg"
                px={2}
                onClick={() => navigate(`/dashboard/applications/${activity.id}`)}
              >
                <Box
                  bg={`${color}.100`}
                  p={2}
                  borderRadius="lg"
                  flexShrink={0}
                >
                  <Icon as={icon} color={`${color}.600`} boxSize="20px" />
                </Box>
                
                <VStack align="start" spacing={1} flex={1}>
                  <Text fontSize="sm" fontWeight="medium">
                    {activity.title}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {activity.company}
                  </Text>
                </VStack>
                
                <VStack align="end" spacing={1} flexShrink={0}>
                  <Badge
                    colorScheme={getStatusBadge(activity.status)}
                    fontSize="10px"
                  >
                    {activity.status}
                  </Badge>
                  <Text fontSize="xs" color="gray.500">
                    {formatTimestamp(activity.timestamp)}
                  </Text>
                </VStack>
              </HStack>
            );
          })}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default RecentActivityCard;
