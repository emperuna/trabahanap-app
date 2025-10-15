import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  HiExclamationCircle, 
  HiCheckCircle, 
  HiLightningBolt,
  HiBriefcase,
} from 'react-icons/hi';

const PriorityBanner = ({ applications = [], savedJobs = [], stats = {} }) => {
  const bgColor = useColorModeValue('blue.50', 'blue.900');
  const borderColor = useColorModeValue('blue.200', 'blue.700');

  // Determine priority message based on data
  const getPriorityMessage = () => {
    // Profile incomplete
    if (stats.profileCompletion < 100) {
      return {
        status: 'warning',
        icon: HiExclamationCircle,
        title: 'Complete Your Profile',
        description: `Your profile is ${stats.profileCompletion}% complete. A complete profile increases your chances of getting hired by 3x!`,
        action: 'Complete Profile',
        link: '/dashboard/profile/edit',
        colorScheme: 'orange',
      };
    }

    // No applications
    if (applications.length === 0) {
      return {
        status: 'info',
        icon: HiLightningBolt,
        title: 'Start Your Job Search',
        description: 'Browse thousands of job opportunities and submit your first application today!',
        action: 'Browse Jobs',
        link: '/dashboard/find-jobs',
        colorScheme: 'blue',
      };
    }

    // Applications pending (no recent activity)
    const pendingApps = applications.filter(app => app.status === 'PENDING' || app.status === 'pending');
    if (pendingApps.length > 3) {
      return {
        status: 'info',
        icon: HiBriefcase,
        title: 'Follow Up on Your Applications',
        description: `You have ${pendingApps.length} pending applications. Consider following up with employers!`,
        action: 'View Applications',
        link: '/dashboard/applications',
        colorScheme: 'purple',
      };
    }

    // All good!
    return {
      status: 'success',
      icon: HiCheckCircle,
      title: 'You\'re All Set!',
      description: 'Your profile is complete and applications are being reviewed. Keep exploring new opportunities!',
      action: 'Find More Jobs',
      link: '/dashboard/find-jobs',
      colorScheme: 'green',
    };
  };

  const priority = getPriorityMessage();

  return (
    <Alert
      status={priority.status}
      variant="subtle"
      flexDirection="column"
      alignItems="flex-start"
      borderRadius="2xl"
      p={6}
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="md"
    >
      <HStack spacing={3} mb={3} w="full" justify="space-between" flexWrap="wrap">
        <HStack spacing={3}>
          <AlertIcon as={priority.icon} boxSize="24px" />
          <AlertTitle fontSize="lg" fontWeight="bold">
            {priority.title}
          </AlertTitle>
        </HStack>
        
        <Button
          as={RouterLink}
          to={priority.link}
          colorScheme={priority.colorScheme}
          size="sm"
          borderRadius="lg"
          leftIcon={<priority.icon />}
        >
          {priority.action}
        </Button>
      </HStack>

      <AlertDescription fontSize="sm" lineHeight="tall" color="gray.700">
        {priority.description}
      </AlertDescription>
    </Alert>
  );
};

export default PriorityBanner;