import React, { useState } from 'react';
import {
  Box, Container, Grid, GridItem, useColorModeValue
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import JobSeekerNavbar from '../../../shared/components/layout/JobSeekerNavbar';
import SettingsSidebar from '../components/SettingsSidebar';
import SettingsContent from '../components/SettingsContent';

const SettingsPage = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(() => {
    // Determine active section from URL
    const path = location.pathname;
    if (path.includes('/notifications')) return 'notifications';
    if (path.includes('/privacy')) return 'privacy';
    if (path.includes('/preferences')) return 'preferences';
    if (path.includes('/security')) return 'security';
    return 'account'; // default
  });

  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box bg={bgColor} minH="100vh">
      <JobSeekerNavbar />
      <Container maxW="8xl" p={6} pt="5rem">
        <Grid templateColumns={{ base: '1fr', lg: '300px 1fr' }} gap={8}>
          {/* Settings Sidebar */}
          <GridItem display={{ base: 'none', lg: 'block' }}>
            <Box position="sticky" top={6}>
              <SettingsSidebar 
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </Box>
          </GridItem>

          {/* Settings Content */}
          <GridItem>
            <SettingsContent activeSection={activeSection} />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default SettingsPage;