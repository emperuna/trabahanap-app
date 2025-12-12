import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from '../../components/common/layout/Navbar';
import Footer from '../../components/common/layout/Footer';
import HelpCenterComponent from '../../components/help-center/help-center';

const HelpCenter = () => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1">
        <HelpCenterComponent />
      </Box>
      <Footer />
    </Box>
  );
};

export default HelpCenter;
