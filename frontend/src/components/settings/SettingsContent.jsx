import React from 'react';
import { VStack, Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import {
  AccountSettingsTab,
  NotificationSettingsTab,
  PrivacySettingsTab,
  PreferencesSettingsTab,
  SecuritySettingsTab
} from './index';

const SettingsContent = ({ activeSection }) => {
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const getSectionContent = () => {
    switch (activeSection) {
      case 'account':
        return {
          title: 'Account Settings',
          description: 'Manage your personal information, profile details, and account preferences.',
          component: <AccountSettingsTab />
        };
      case 'notifications':
        return {
          title: 'Notification Preferences',
          description: 'Control how and when you receive notifications about job opportunities and account activity.',
          component: <NotificationSettingsTab />
        };
      case 'privacy':
        return {
          title: 'Privacy Settings',
          description: 'Manage your profile visibility and control who can see your information.',
          component: <PrivacySettingsTab />
        };
      case 'preferences':
        return {
          title: 'General Preferences',
          description: 'Customize your experience with language, timezone, and appearance settings.',
          component: <PreferencesSettingsTab />
        };
      case 'security':
        return {
          title: 'Security & Privacy',
          description: 'Manage your password, two-factor authentication, and account security settings.',
          component: <SecuritySettingsTab />
        };
      default:
        return {
          title: 'Account Settings',
          description: 'Manage your personal information, profile details, and account preferences.',
          component: <AccountSettingsTab />
        };
    }
  };

  const { title, description, component } = getSectionContent();

  return (
    <VStack spacing={6} align="stretch">
      {/* Section Header */}
      <Box>
        <Heading size="lg" color={textColor} mb={2}>
          {title}
        </Heading>
        <Text color={mutedColor} fontSize="md">
          {description}
        </Text>
      </Box>

      {/* Section Content */}
      {component}
    </VStack>
  );
};

export default SettingsContent;