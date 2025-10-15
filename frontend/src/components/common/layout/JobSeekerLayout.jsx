import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import JobSeekerNavbar from './JobSeekerNavbar';
import { DashboardSidebar } from '../../dashboard';

const JobSeekerLayout = ({ children, showSidebar = true, maxW = "8xl" }) => {
  return (
    <>
      {/* Fixed Navbar */}
      <JobSeekerNavbar />
      
      {/* Main Content */}
      <Box bg="gray.50" minH="100vh" pt="80px">
        {showSidebar ? (
          <Flex>
            {/* Fixed Sidebar */}
            <Box
              display={{ base: 'none', lg: 'block' }}
              position="fixed"
              left={0}
              top="80px"
              width="280px"
              height="calc(100vh - 80px)"
              overflowY="auto"
              bg="gray.50"
              borderRight="1px solid"
              borderColor="gray.200"
              zIndex={10}
              css={{
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#CBD5E0',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#A0AEC0',
                },
              }}
            >
              <Box p={6}>
                <DashboardSidebar />
              </Box>
            </Box>

            {/* Content Area with Left Margin for Sidebar */}
            <Box
              flex={1}
              ml={{ base: 0, lg: '280px' }}
            >
              <Container maxW={maxW} px={6} py={6}>
                {children}
              </Container>
            </Box>
          </Flex>
        ) : (
          // No sidebar layout
          <Container maxW={maxW} px={6} py={6}>
            {children}
          </Container>
        )}
      </Box>
    </>
  );
};

export default JobSeekerLayout;