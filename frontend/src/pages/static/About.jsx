import React from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import Navbar from '../../components/common/layout/Navbar';
import Footer from '../../components/common/layout/Footer';
import Team from '../../components/sections/about/Team';
import Header from '../../components/sections/about/Header';
import CompaniesSection from '../../components/sections/about/CompaniesSection';
import VisionSection from '../../components/sections/about/VisionSection';
import MissionSection from '../../components/sections/about/MissionSection';

const About = () => (
  <>
    <Navbar />
    <Box minH="100vh" py={10} bg="white" display="flex" flexDirection="column" alignItems="center">
      <Header />
      <CompaniesSection />
      <VisionSection />
      <MissionSection />
      <Team />
    </Box>
    <Footer />
  </>
);

export default About;