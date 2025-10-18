import React from 'react';
import { Box, Flex, HStack, Container, useColorModeValue, Alert, AlertIcon, Text } from '@chakra-ui/react';
import { useAuth } from '../../../context/AuthContext';
import { useNavbarState } from '../../../hooks/useNavbarState';
import NavbarLogo from './navbar/NavbarLogo';
import NavbarNavigation from './navbar/NavbarNavigation';
import NavbarActions from './navbar/NavbarActions';
import NavbarMobileDrawer from './navbar/NavbarMobileDrawer';

const EmployerNavbar = () => {
  const { user } = useAuth();
  const navbarState = useNavbarState();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <>
      <Box
        bg={bgColor}
        borderBottom="1px"
        borderColor={borderColor}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        backdropFilter="blur(10px)"
        boxShadow="sm"
      >
        <Container maxW="8xl" px={6}>
          <Flex h={16} alignItems="center" justify="space-between">
            <NavbarLogo 
              profileCompletion={navbarState.profileCompletion}
              isOnline={navbarState.isOnline}
              userRole="employer" // ✅ Pass employer role
            />
            
            {/* ✅ No search for employers - they don't need to search for jobs */}
            
            <NavbarNavigation userRole="employer" /> {/* ✅ Pass employer role */}
            
            <NavbarActions 
              user={user}
              notifications={navbarState.notifications}
              unreadCount={navbarState.unreadCount}
              profileCompletion={navbarState.profileCompletion}
              onMarkAsRead={navbarState.markAsRead}
              onLogout={navbarState.handleLogout}
              onOpenMobile={navbarState.onOpen}
              userRole="employer" // ✅ Pass employer role
            />
          </Flex>
        </Container>

        {!navbarState.isOnline && (
          <Alert status="warning" size="sm" py={1}>
            <AlertIcon boxSize={3} />
            <Text fontSize="xs">You're offline. Some features may not work.</Text>
          </Alert>
        )}
      </Box>

      <NavbarMobileDrawer 
        isOpen={navbarState.isOpen}
        onClose={navbarState.onClose}
        user={user}
        navbarState={navbarState}
        userRole="employer" // ✅ Pass employer role
      />
    </>
  );
};

export default EmployerNavbar;