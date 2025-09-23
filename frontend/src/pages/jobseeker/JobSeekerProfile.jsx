import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  HStack,
  Flex,
  Text,
  Button,
  Card,
  CardBody,
  Heading,
  Badge,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';

import {
  ProfileHeader,
  AboutMe,
  Experience,
  Skills,
  Portfolio,
  Contact,
  ProfileQuickActions
} from '../../components/profile';

import { DashboardSidebar } from '../../components/dashboard';
import { Loading } from '../../components/common/feedback';

const JobSeekerProfile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();
  const { user } = useAuth();
  
  // Design system colors
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const primaryColor = '#153CF5';
  
  // Use actual user data or fallback to mock data
  const profileData = {
    name: user?.firstName && user?.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : user?.username || "Marc Justin Alberto",
    location: "Gilid, Laguna",
    profileImage: "/api/placeholder/200/200",
    jobExperience: "3+ Years",
    certificates: "5 Certificates",
    trainings: "2 Trainings",
    aboutMe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    detailedAbout: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    contacts: {
      mobile: "0123 456 7899",
      facebook: "www.facebook.com/MarcJustinAlberto",
      linkedin: "www.linkedin.com/in/marcjustinalberto",
      email: user?.email || "marcjustin.alberto@gmail.com",
      viber: "+63 912 345 6789"
    }
  };

  const tabItems = [
    { label: 'About Me', component: <AboutMe /> },
    { label: 'Experience', component: <Experience /> },
    { label: 'Skills', component: <Skills /> },
    { label: 'Portfolio', component: <Portfolio /> }
  ];

  return (
    <Box bg={bgColor} minH="100vh">
      <Container maxW="8xl" p={6}>
        <Grid templateColumns={{ base: '1fr', lg: '280px 1fr' }} gap={6}>
          {/* Sidebar */}
          <GridItem display={{ base: 'none', lg: 'block' }}>
            <Box position="sticky" top={6}>
              <DashboardSidebar />
            </Box>
          </GridItem>

          {/* Main Content */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Profile Header Card */}
              <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor} overflow="hidden">
                <Box bgGradient="linear(135deg, purple.500, blue.500)" p={8} color="white">
                  <ProfileHeader profileData={profileData} />
                </Box>
              </Card>

              {/* Profile Stats Cards */}
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
                <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor} p={6}>
                  <VStack spacing={3}>
                    <Text fontSize="2xl" fontWeight="bold" color={primaryColor}>
                      {profileData.jobExperience}
                    </Text>
                    <Text fontSize="sm" color="gray.500" textAlign="center">
                      Job Experience
                    </Text>
                  </VStack>
                </Card>
                
                <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor} p={6}>
                  <VStack spacing={3}>
                    <Text fontSize="2xl" fontWeight="bold" color={primaryColor}>
                      {profileData.certificates}
                    </Text>
                    <Text fontSize="sm" color="gray.500" textAlign="center">
                      Certificates Achieved
                    </Text>
                  </VStack>
                </Card>
                
                <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor} p={6}>
                  <VStack spacing={3}>
                    <Text fontSize="2xl" fontWeight="bold" color={primaryColor}>
                      {profileData.trainings}
                    </Text>
                    <Text fontSize="sm" color="gray.500" textAlign="center">
                      Trainings Completed
                    </Text>
                  </VStack>
                </Card>
              </Grid>

              {/* Main Content with Tabs */}
              <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
                {/* Left Column - Main Content */}
                <GridItem>
                  <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor}>
                    <CardBody p={0}>
                      <Tabs 
                        index={activeTab} 
                        onChange={setActiveTab}
                        variant="enclosed"
                        colorScheme="purple"
                      >
                        <TabList borderBottom="1px" borderColor={borderColor} px={6} pt={6}>
                          {tabItems.map((tab, index) => (
                            <Tab
                              key={index}
                              _selected={{
                                color: primaryColor,
                                borderColor: primaryColor,
                                borderBottomColor: cardBg,
                                bg: cardBg,
                                fontWeight: 'semibold'
                              }}
                              _hover={{
                                color: primaryColor,
                              }}
                              borderRadius="lg lg 0 0"
                              mr={2}
                            >
                              {tab.label}
                            </Tab>
                          ))}
                        </TabList>
                        
                        <TabPanels>
                          {tabItems.map((tab, index) => (
                            <TabPanel key={index} p={6}>
                              {tab.component}
                            </TabPanel>
                          ))}
                        </TabPanels>
                      </Tabs>
                    </CardBody>
                  </Card>
                </GridItem>

                {/* Right Column - Contact Sidebar */}
                <GridItem>
                  <VStack spacing={6}>
                    <Contact profileData={profileData} />
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

export default JobSeekerProfile;
