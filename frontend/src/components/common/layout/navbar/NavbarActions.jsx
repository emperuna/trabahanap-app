import React from 'react';
import { HStack, IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { HiMoon, HiSun, HiMenu } from 'react-icons/hi';
import NotificationMenu from './NotificationMenu';
import UserMenu from './UserMenu';

const NavbarActions = ({ 
  user, 
  notifications, 
  unreadCount, 
  profileCompletion, 
  onMarkAsRead, 
  onLogout, 
  onOpenMobile 
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack spacing={3}>
      {/* Dark Mode Toggle */}
      <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}>
        <IconButton
          icon={colorMode === 'light' ? <HiMoon /> : <HiSun />}
          variant="ghost"
          size="sm"
          borderRadius="lg"
          onClick={toggleColorMode}
          _hover={{ bg: 'gray.100' }}
          aria-label="Toggle color mode"
        />
      </Tooltip>

      {/* Notifications */}
      <NotificationMenu
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAsRead={onMarkAsRead}
      />

      {/* User Menu */}
      <UserMenu
        user={user}
        profileCompletion={profileCompletion}
        onLogout={onLogout}
      />

      {/* Mobile Menu Button */}
      <IconButton
        icon={<HiMenu />}
        variant="ghost"
        size="sm"
        onClick={onOpenMobile}
        display={{ base: 'flex', lg: 'none' }}
        aria-label="Open menu"
      />
    </HStack>
  );
};

export default NavbarActions;