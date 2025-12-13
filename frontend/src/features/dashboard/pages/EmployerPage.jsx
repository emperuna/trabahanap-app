import React, {useEffect} from 'react';
import { Box, Container, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import { EmployerSidebar } from '../components/shared';
import EmployerDashboard from './EmployerDashboard';
import { useLocation, useNavigate } from 'react-router-dom';

import EmployerManageJobs from '../../jobs/pages/ManageJobsPage';
import EmployerApplications from '../../applications/pages/EmployerApplicationsPage';
import EmployerPostJob from '../../jobs/pages/PostJobPage';


import {
  HiHome,
  HiPlus,
  HiBriefcase,
  HiClipboardList,
  HiUserGroup,
  HiChartBar,
  HiCog,
} from 'react-icons/hi';

const SIDEBAR_OPTIONS = [
  { key: 'dashboard', label: 'Dashboard', icon: HiHome },
  { key: 'postJob', label: 'Post Job', icon: HiPlus },
  { key: 'manageJobs', label: 'Manage Jobs', icon: HiBriefcase },
  { key: 'applications', label: 'Applications', icon: HiClipboardList },
  // { key: 'candidates', label: 'Candidates', icon: HiUserGroup },
  // { key: 'analytics', label: 'Analytics', icon: HiChartBar },
  { key: 'settings', label: 'Settings', icon: HiCog },
];



const EmployerPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const [selected, setSelected] = React.useState('dashboard');
  const location = useLocation();
  const navigate = useNavigate();

    // ✅ Handle URL-based navigation
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const section = urlParams.get('section');
      
      if (section && SIDEBAR_OPTIONS.find(opt => opt.key === section)) {
        setSelected(section);
      }
    }, [location.search]);

  // ✅ Update URL when sidebar selection changes
    const handleSelect = (key) => {
      setSelected(key);
      navigate(`/employer-dashboard?section=${key}`, { replace: true });
    };

  let content = null;
  if (selected === 'dashboard') content = <EmployerDashboard />;
  else if (selected === 'postJob') content = <EmployerPostJob />;
  else if (selected === 'manageJobs') content = <EmployerManageJobs />;
  else if (selected === 'applications') content = <EmployerApplications />;

  return (
    <Box bg={bgColor} minH="100vh" w="100vw" overflow="hidden">
      <Box maxW="8xl" mx="auto" p={6} display="flex" flexDir="row" h="100vh">
        {/* Sidebar */}
        <Box
          display={{ base: 'none', lg: 'block' }}
          w="280px"
          flexShrink={0}
          h="100vh"
          position="sticky"
          top={0}
          left={0}
          zIndex={1}
          bg={bgColor}
          borderRightWidth="1px"
        >
          <EmployerSidebar
            selected={selected}
            onSelect={handleSelect}
            options={SIDEBAR_OPTIONS}
          />
        </Box>

        {/* Main Content */}
        <Box
          flex={1}
          h="100vh"
          overflowY="auto"
          pl={{ base: 0, lg: 6 }}
        >
          {content}
        </Box>
      </Box>
    </Box>
  );
};

export default EmployerPage;