import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button, HStack, VStack, Text, Avatar, Menu, MenuButton, MenuList,
  MenuItem, MenuDivider, Badge
} from '@chakra-ui/react';
import { HiBriefcase, HiUser, HiCog, HiGlobe, HiLogout, HiChevronDown } from 'react-icons/hi';

const UserMenu = ({ user, profileCompletion, onLogout }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        size="sm"
        borderRadius="lg"
        rightIcon={<HiChevronDown size={14} />}
        _hover={{ bg: 'gray.100' }}
        display={{ base: 'none', md: 'flex' }}
      >
        <HStack spacing={2}>
          <Avatar 
            size="sm" 
            name={user?.firstName || user?.username}
            src={user?.profilePicture}
          />
          <VStack spacing={0} align="start">
            <Text fontSize="sm" fontWeight="500" lineHeight="1">
              {user?.firstName || user?.username}
            </Text>
            <Text fontSize="xs" color="gray.500" lineHeight="1">
              Job Seeker
            </Text>
          </VStack>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem
          as={RouterLink}
          to="/dashboard"
          icon={<HiBriefcase />}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          as={RouterLink}
          to="/dashboard/profile"
          icon={<HiUser />}
        >
          My Profile
          <Badge ml={2} colorScheme="orange" size="sm">
            {profileCompletion}%
          </Badge>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          as={RouterLink}
          to="/dashboard/settings"
          icon={<HiCog />}
        >
          Settings
        </MenuItem>
        <MenuItem icon={<HiGlobe />}>
          Language: English
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={onLogout}
          icon={<HiLogout />}
          color="red.500"
        >
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;