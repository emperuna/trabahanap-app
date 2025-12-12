import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import {
  AccountSettingsTab,
  NotificationSettingsTab,
  PrivacySettingsTab,
  PreferencesSettingsTab,
  SecuritySettingsTab
} from './index';

export const SettingsTabs = () => {
  return (
    <Tabs variant="enclosed" colorScheme="blue">
      <TabList>
        <Tab>Account</Tab>
        <Tab>Notifications</Tab>
        <Tab>Privacy</Tab>
        <Tab>Preferences</Tab>
        <Tab>Security</Tab>
      </TabList>

      <TabPanels>
        <TabPanel px={0}>
          <AccountSettingsTab />
        </TabPanel>

        <TabPanel px={0}>
          <NotificationSettingsTab />
        </TabPanel>

        <TabPanel px={0}>
          <PrivacySettingsTab />
        </TabPanel>

        <TabPanel px={0}>
          <PreferencesSettingsTab />
        </TabPanel>

        <TabPanel px={0}>
          <SecuritySettingsTab />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};