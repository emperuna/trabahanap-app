import React, {useEffect} from 'react';
import { Box, Container, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import EmployerSidebar from '../../components/dashboard/shared/EmployerSidebar';
import EmployerDashboard from './EmployerDashboard';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

import EmployerManageJobs from './EmployerManageJobs';
import EmployerApplications from './EmployerApplications';
import EmployerPostJob from './EmployerPostJob';
import SettingsContent from '../../components/settings/SettingsContent';
import SettingsSidebar from '../../components/settings/SettingsSidebar'; // ✅ Import SettingsSidebar

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
  { key: 'candidates', label: 'Candidates', icon: HiUserGroup },
  { key: 'analytics', label: 'Analytics', icon: HiChartBar },
  { key: 'settings', label: 'Settings', icon: HiCog },
];

const EmployerPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const [selected, setSelected] = React.useState('dashboard');
  const [settingsSection, setSettingsSection] = React.useState('account');
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // ✅ Handle URL-based navigation
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const section = urlParams.get('section');
    const settingsTab = urlParams.get('tab');
    
    if (section && SIDEBAR_OPTIONS.find(opt => opt.key === section)) {
      setSelected(section);
      
      if (section === 'settings' && settingsTab) {
        setSettingsSection(settingsTab);
      }
    }
  }, [location.search]);

  // ✅ Update URL when sidebar selection changes
  const handleSelect = (key) => {
    setSelected(key);
    if (key === 'settings') {
      navigate(`/employer-dashboard?section=${key}&tab=${settingsSection}`, { replace: true });
    } else {
      navigate(`/employer-dashboard?section=${key}`, { replace: true });
    }
  };

  // ✅ Handle settings section changes
  const handleSettingsSelect = (settingsKey) => {
    setSettingsSection(settingsKey);
    navigate(`/employer-dashboard?section=settings&tab=${settingsKey}`, { replace: true });
  };

  let content = null;
  if (selected === 'dashboard') content = <EmployerDashboard />;
  else if (selected === 'postJob') content = <EmployerPostJob />;
  else if (selected === 'manageJobs') content = <EmployerManageJobs />;
  else if (selected === 'applications') content = <EmployerApplications />;
  else if (selected === 'settings') {
    // ✅ Use Settings layout with both sidebar and content
    content = (
      <Grid templateColumns={{ base: '1fr', lg: '320px 1fr' }} gap={6} h="full">
        {/* Settings Sidebar */}
        <GridItem>
          <SettingsSidebar 
            activeSection={settingsSection}
            onSectionChange={handleSettingsSelect}
            userRole={user?.role} // ✅ Pass user role for role-specific sections
          />
        </GridItem>
        
        {/* Settings Content */}
        <GridItem>
          <SettingsContent 
            activeSection={settingsSection}
            userRole={user?.role}
          />
        </GridItem>
      </Grid>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" w="100vw" overflow="hidden">
      <Box maxW="8xl" mx="auto" p={6} display="flex" flexDir="row" h="100vh">
        {/* Main Sidebar - Only show when not in settings */}
        {selected !== 'settings' && (
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
        )}

        {/* Main Content */}
        <Box
          flex={1}
          h="100vh"
          overflowY="auto"
          pl={{ base: 0, lg: selected !== 'settings' ? 6 : 0 }} // ✅ Conditional padding
          p={selected === 'settings' ? 6 : 0} // ✅ Full padding for settings
        >
          {content}
        </Box>
      </Box>
    </Box>
  );
};

export default EmployerPage;