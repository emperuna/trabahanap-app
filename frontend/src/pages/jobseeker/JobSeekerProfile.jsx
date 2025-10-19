import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
} from '@chakra-ui/react';
import JobSeekerLayout from '../../components/common/layout/JobSeekerLayout';
import {
  ProfileCard,
  ProfileNavigationMenu,
  ProfileContentArea,
} from '../../components/profile';
import {
  useProfileState,
  useProfileMenu,
  useProfileTheme,
} from '../../hooks';
import { getProfileComponent, getComponentProps } from '../../utils/profileHelpers';

const JobSeekerProfile = () => {
  const navigate = useNavigate();
  
  // Custom hooks
  const theme = useProfileTheme();
  const {
    activeSection,
    setActiveSection,
    resumes,
    profileData,
    PROFILE_SECTIONS,
  } = useProfileState();
  
  const { menuItems, getActiveMenuItem } = useProfileMenu(
    profileData,
    resumes,
    PROFILE_SECTIONS
  );

  // Handlers
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleEditProfile = () => {
    navigate('/settings/account');
  };

  // Get active menu item with component
  const activeMenuItem = useMemo(() => {
    const item = getActiveMenuItem(activeSection);
    if (!item) return null;

    // Get the component and props
    const Component = getProfileComponent(item.componentName);
    const props = getComponentProps(item.componentName, profileData, resumes);

    return {
      ...item,
      component: Component ? <Component {...props} /> : null,
    };
  }, [activeSection, getActiveMenuItem, profileData, resumes]);

  return (
    <JobSeekerLayout showSidebar={false}>
      <Box bg={theme.bgColor} minH="100vh">
        <Container maxW="7xl" px={{ base: 2, md: 4, lg: 6 }}>
          <Grid
            templateColumns={{ base: '1fr', lg: '320px 1fr' }}
            gap={6}
            alignItems="start"
          >
            {/* Sidebar */}
            <GridItem>
              <VStack spacing={6} position="sticky" top="80px">
                <ProfileCard
                  profileData={profileData}
                  theme={theme}
                  onEditProfile={handleEditProfile}
                />
                <ProfileNavigationMenu
                  menuItems={menuItems}
                  activeSection={activeSection}
                  theme={theme}
                  onSectionChange={handleSectionChange}
                />
              </VStack>
            </GridItem>

            {/* Content */}
            <GridItem>
              <ProfileContentArea
                activeMenuItem={activeMenuItem}
                theme={theme}
              />
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </JobSeekerLayout>
  );
};

export default JobSeekerProfile;