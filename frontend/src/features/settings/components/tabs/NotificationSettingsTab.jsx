import React from 'react';
import {
  VStack, Card, CardBody, FormControl, FormLabel, Switch,
  Text, Button, useColorModeValue, Box
} from '@chakra-ui/react';
import { HiSave, HiBell } from 'react-icons/hi';
import { useSettings } from '../../hooks/useSettings'; // ✅ Updated import path

export const NotificationSettingsTab = () => {
  const { notifications, setNotifications, handleNotificationUpdate, loading } = useSettings();
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <VStack spacing={6} align="stretch">
      {/* Email Notifications */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardBody>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>Email Notifications</Text>
          <VStack spacing={4} align="stretch">
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb="0">Job Alert Emails</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Receive emails about new job matches
                </Text>
              </Box>
              <Switch
                isChecked={notifications.emailJobAlerts}
                onChange={(e) => setNotifications({
                  ...notifications,
                  emailJobAlerts: e.target.checked
                })}
                colorScheme="blue"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb="0">Application Updates</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Get notified when employers update your applications
                </Text>
              </Box>
              <Switch
                isChecked={notifications.emailApplicationUpdates}
                onChange={(e) => setNotifications({
                  ...notifications,
                  emailApplicationUpdates: e.target.checked
                })}
                colorScheme="blue"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb="0">Marketing Emails</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Receive newsletters and promotional content
                </Text>
              </Box>
              <Switch
                isChecked={notifications.emailMarketingEmails}
                onChange={(e) => setNotifications({
                  ...notifications,
                  emailMarketingEmails: e.target.checked
                })}
                colorScheme="blue"
              />
            </FormControl>
          </VStack>
        </CardBody>
      </Card>

      {/* Push Notifications */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardBody>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>Push Notifications</Text>
          <VStack spacing={4} align="stretch">
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb="0">Job Recommendations</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Get push notifications for personalized job matches
                </Text>
              </Box>
              <Switch
                isChecked={notifications.pushJobRecommendations}
                onChange={(e) => setNotifications({
                  ...notifications,
                  pushJobRecommendations: e.target.checked
                })}
                colorScheme="blue"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb="0">Application Updates</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Instant notifications for application status changes
                </Text>
              </Box>
              <Switch
                isChecked={notifications.pushApplicationUpdates}
                onChange={(e) => setNotifications({
                  ...notifications,
                  pushApplicationUpdates: e.target.checked
                })}
                colorScheme="blue"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb="0">New Messages</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Get notified when employers message you
                </Text>
              </Box>
              <Switch
                isChecked={notifications.pushNewMessages}
                onChange={(e) => setNotifications({
                  ...notifications,
                  pushNewMessages: e.target.checked
                })}
                colorScheme="blue"
              />
            </FormControl>
          </VStack>
        </CardBody>
      </Card>

      {/* SMS Notifications */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardBody>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>SMS Notifications</Text>
          <VStack spacing={4} align="stretch">
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb="0">Job Alerts via SMS</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Receive job alerts on your phone (charges may apply)
                </Text>
              </Box>
              <Switch
                isChecked={notifications.smsJobAlerts}
                onChange={(e) => setNotifications({
                  ...notifications,
                  smsJobAlerts: e.target.checked
                })}
                colorScheme="blue"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb="0">Application Updates via SMS</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Get SMS alerts for important application updates
                </Text>
              </Box>
              <Switch
                isChecked={notifications.smsApplicationUpdates}
                onChange={(e) => setNotifications({
                  ...notifications,
                  smsApplicationUpdates: e.target.checked
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
        onClick={handleNotificationUpdate}
        isLoading={loading}
        loadingText="Saving..."
      >
        Save Notification Preferences
      </Button>
    </VStack>
  );
};