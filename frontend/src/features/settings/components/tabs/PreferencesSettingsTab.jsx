import React from 'react';
import {
  VStack, Card, CardBody, FormControl, FormLabel, Switch,
  Text, Button, Select, Grid, useColorModeValue, Box
} from '@chakra-ui/react';
import { HiSave, HiGlobe, HiMoon } from 'react-icons/hi';
import { useSettings } from '../../hooks/useSettings';

export const PreferencesSettingsTab = () => {
  const { preferences, setPreferences, handlePreferencesUpdate, loading } = useSettings();
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <VStack spacing={6} align="stretch">
      {/* General Preferences */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardBody>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>General Preferences</Text>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
            <FormControl>
              <FormLabel>Language</FormLabel>
              <Select
                value={preferences.language}
                onChange={(e) => setPreferences({
                  ...preferences,
                  language: e.target.value
                })}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Timezone</FormLabel>
              <Select
                value={preferences.timezone}
                onChange={(e) => setPreferences({
                  ...preferences,
                  timezone: e.target.value
                })}
              >
                <option value="UTC-12">UTC-12 (Baker Island)</option>
                <option value="UTC-11">UTC-11 (American Samoa)</option>
                <option value="UTC-10">UTC-10 (Hawaii)</option>
                <option value="UTC-9">UTC-9 (Alaska)</option>
                <option value="UTC-8">UTC-8 (Pacific Time)</option>
                <option value="UTC-7">UTC-7 (Mountain Time)</option>
                <option value="UTC-6">UTC-6 (Central Time)</option>
                <option value="UTC-5">UTC-5 (Eastern Time)</option>
                <option value="UTC+0">UTC+0 (GMT)</option>
                <option value="UTC+1">UTC+1 (Central European)</option>
                <option value="UTC+8">UTC+8 (China/Singapore)</option>
                <option value="UTC+9">UTC+9 (Japan/Korea)</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Currency</FormLabel>
              <Select
                value={preferences.currency}
                onChange={(e) => setPreferences({
                  ...preferences,
                  currency: e.target.value
                })}
              >
                <option value="USD">USD - US Dollar ($)</option>
                <option value="EUR">EUR - Euro (€)</option>
                <option value="GBP">GBP - British Pound (£)</option>
                <option value="CAD">CAD - Canadian Dollar (C$)</option>
                <option value="AUD">AUD - Australian Dollar (A$)</option>
                <option value="JPY">JPY - Japanese Yen (¥)</option>
                <option value="CNY">CNY - Chinese Yuan (¥)</option>
                <option value="INR">INR - Indian Rupee (₹)</option>
                <option value="PHP">PHP - Philippine Peso (₱)</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Job Alert Frequency</FormLabel>
              <Select
                value={preferences.jobAlertFrequency}
                onChange={(e) => setPreferences({
                  ...preferences,
                  jobAlertFrequency: e.target.value
                })}
              >
                <option value="immediate">Immediate</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Summary</option>
                <option value="never">Never</option>
              </Select>
            </FormControl>
          </Grid>
        </CardBody>
      </Card>

      {/* Appearance */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardBody>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>Appearance</Text>
          <VStack spacing={4} align="stretch">
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb="0" display="flex" alignItems="center" gap={2}>
                  <HiMoon />
                  Dark Mode
                </FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Switch between light and dark themes
                </Text>
              </Box>
              <Switch
                isChecked={preferences.darkMode}
                onChange={(e) => setPreferences({
                  ...preferences,
                  darkMode: e.target.checked
                })}
                colorScheme="blue"
              />
            </FormControl>
          </VStack>
        </CardBody>
      </Card>

      {/* Email Preferences */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardBody>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>Email Preferences</Text>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Email Digest Frequency</FormLabel>
              <Select
                value={preferences.emailDigest}
                onChange={(e) => setPreferences({
                  ...preferences,
                  emailDigest: e.target.value
                })}
              >
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Summary</option>
                <option value="monthly">Monthly Report</option>
                <option value="never">No Digest</option>
              </Select>
              <Text fontSize="sm" color={mutedColor} mt={2}>
                Choose how often you want to receive summarized activity emails
              </Text>
            </FormControl>
          </VStack>
        </CardBody>
      </Card>

      <Button
        colorScheme="blue"
        leftIcon={<HiSave />}
        onClick={handlePreferencesUpdate}
        isLoading={loading}
        loadingText="Saving..."
      >
        Save Preferences
      </Button>
    </VStack>
  );
};