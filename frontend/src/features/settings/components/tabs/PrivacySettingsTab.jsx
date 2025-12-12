import React from 'react';
import {
  VStack, Card, CardBody, FormControl, FormLabel, Switch,
  Text, Button, Select, useColorModeValue, Box
} from '@chakra-ui/react';
import { HiSave, HiLockClosed } from 'react-icons/hi';
import { useSettings } from '../../hooks/useSettings';

export const PrivacySettingsTab = () => {
  const { privacy, setPrivacy, handlePrivacyUpdate, loading } = useSettings();
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <VStack spacing={6} align="stretch">
      {/* Profile Privacy */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardBody>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>Profile Privacy</Text>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Profile Visibility</FormLabel>
              <Select
                value={privacy.profileVisibility}
                onChange={(e) => setPrivacy({
                  ...privacy,
                  profileVisibility: e.target.value
                })}
              >
                <option value="public">Public - Visible to all employers</option>
                <option value="limited">Limited - Only to employers I apply to</option>
                <option value="private">Private - Hidden from search</option>
              </Select>
              <Text fontSize="sm" color={mutedColor} mt={2}>
                Control who can see your profile in employer searches
              </Text>
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb="0">Show Email Address</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Allow employers to see your email in your profile
                </Text>
              </Box>
              <Switch
                isChecked={privacy.showEmail}
                onChange={(e) => setPrivacy({
                  ...privacy,
                  showEmail: e.target.checked
                })}
                colorScheme="blue"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb="0">Show Phone Number</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Allow employers to see your phone number in your profile
                </Text>
              </Box>
              <Switch
                isChecked={privacy.showPhone}
                onChange={(e) => setPrivacy({
                  ...privacy,
                  showPhone: e.target.checked
                })}
                colorScheme="blue"
              />
            </FormControl>
          </VStack>
        </CardBody>
      </Card>

      {/* Communication Preferences */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardBody>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>Communication Preferences</Text>
          <VStack spacing={4} align="stretch">
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb="0">Allow Direct Messages</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Let employers send you direct messages through the platform
                </Text>
              </Box>
              <Switch
                isChecked={privacy.allowDirectMessages}
                onChange={(e) => setPrivacy({
                  ...privacy,
                  allowDirectMessages: e.target.checked
                })}
                colorScheme="blue"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb="0">Allow Employer Contact</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Allow employers to contact you about job opportunities
                </Text>
              </Box>
              <Switch
                isChecked={privacy.allowEmployerContact}
                onChange={(e) => setPrivacy({
                  ...privacy,
                  allowEmployerContact: e.target.checked
                })}
                colorScheme="blue"
              />
            </FormControl>
          </VStack>
        </CardBody>
      </Card>

      {/* Data & Analytics */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardBody>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>Data & Analytics</Text>
          <VStack spacing={4} align="stretch">
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb="0">Share Analytics Data</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Help improve our service by sharing anonymous usage data
                </Text>
              </Box>
              <Switch
                isChecked={privacy.shareAnalytics}
                onChange={(e) => setPrivacy({
                  ...privacy,
                  shareAnalytics: e.target.checked
                })}
                colorScheme="blue"
              />
            </FormControl>
          </VStack>
        </CardBody>
      </Card>

      <Button
        colorScheme="blue"
        leftIcon={<HiSave />}
        onClick={handlePrivacyUpdate}
        isLoading={loading}
        loadingText="Saving..."
      >
        Save Privacy Settings
      </Button>
    </VStack>
  );
};