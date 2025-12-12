import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import {
  HiBriefcase,
  HiBookmark,
  HiEye,
  HiCheckCircle,
} from 'react-icons/hi';
import StatsCard from './StatsCard';

const StatsGrid = ({ stats, columns = { base: 1, sm: 2, lg: 3, xl: 4 } }) => {
  const statsData = [
    {
      label: 'Applications',
      value: stats.applications,
      icon: HiBriefcase,
      color: 'blue',
      helpText: stats.applications === 0 ? 'Start applying!' : 'Total submitted',
    },
    {
      label: 'Saved Jobs',
      value: stats.savedJobs,
      icon: HiBookmark,
      color: 'purple',
      helpText: stats.savedJobs > 0 ? 'Review & apply' : 'Save jobs you like',
    },
    {
      label: 'Profile Views',
      value: stats.profileViews || 'Coming Soon',
      icon: HiEye,
      color: 'green',
      helpText: 'Employer interest',
      isComingSoon: stats.profileViews === 0,
    },
    {
      label: 'Profile Completion',
      value: `${stats.profileCompletion}%`,
      icon: HiCheckCircle,
      color: stats.profileCompletion >= 80 ? 'green' : 'yellow',
      helpText: stats.profileCompletion < 100 ? 'Complete your profile' : 'Well done!',
    },
  ];

  return (
    <SimpleGrid columns={columns} spacing={6} w="full">
      {statsData.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </SimpleGrid>
  );
};

export default StatsGrid;
