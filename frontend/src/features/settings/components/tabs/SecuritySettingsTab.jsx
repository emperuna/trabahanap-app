import React, { useState } from 'react';
import {
  VStack, Card, CardBody, FormControl, FormLabel, Input,
  Text, Button, HStack, IconButton, Alert, AlertIcon,
  useColorModeValue, Box, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { 
  HiLockClosed, HiEye, HiEyeOff, HiTrash, 
  HiExclamation, HiShieldCheck
} from 'react-icons/hi';
import { useSettings } from '../../hooks/useSettings';

export const SecuritySettingsTab = () => {
  const { passwordData, setPasswordData, handlePasswordChange, handleDeleteAccount, loading } = useSettings();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const handleDeleteConfirm = async () => {
    if (deleteConfirmText.toLowerCase() === 'delete') {
      const success = await handleDeleteAccount();
      if (success) {
        onDeleteModalClose();
        setDeleteConfirmText('');
      }
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Change Password */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardBody>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>Change Password</Text>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Current Password</FormLabel>
              <HStack>
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value
                  })}
                  placeholder="Enter your current password"
                />
                <IconButton
                  icon={showCurrentPassword ? <HiEyeOff /> : <HiEye />}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  variant="outline"
                  aria-label="Toggle password visibility"
                />
              </HStack>
            </FormControl>

            <FormControl>
              <FormLabel>New Password</FormLabel>
              <HStack>
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value
                  })}
                  placeholder="Enter your new password"
                />
                <IconButton
                  icon={showNewPassword ? <HiEyeOff /> : <HiEye />}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  variant="outline"
                  aria-label="Toggle password visibility"
                />
              </HStack>
            </FormControl>

            <FormControl>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value
                })}
                placeholder="Confirm your new password"
              />
            </FormControl>

            {/* Password Requirements */}
            <Box p={3} bg={useColorModeValue('blue.50', 'blue.900')} borderRadius="md">
              <Text fontSize="sm" fontWeight="medium" mb={2}>Password Requirements:</Text>
              <VStack align="start" spacing={1} fontSize="sm" color={mutedColor}>
                <Text>• At least 6 characters long</Text>
                <Text>• Contains uppercase and lowercase letters</Text>
                <Text>• Contains at least one number</Text>
                <Text>• Contains at least one special character</Text>
              </VStack>
            </Box>

            <Button
              colorScheme="blue"
              leftIcon={<HiLockClosed />}
              onClick={handlePasswordChange}
              isLoading={loading}
              loadingText="Changing Password..."
              isDisabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            >
              Change Password
            </Button>
          </VStack>
        </CardBody>
      </Card>

      {/* Two-Factor Authentication (Future Feature) */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardBody>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>Two-Factor Authentication</Text>
          <VStack spacing={4} align="stretch">
            <Box p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
              <HStack mb={2}>
                <HiShieldCheck /> {/* ✅ Updated icon */}
                <Text fontWeight="medium">Enhanced Security (Coming Soon)</Text>
              </HStack>
              <Text fontSize="sm" color={mutedColor}>
                Add an extra layer of security to your account with two-factor authentication. 
                This feature will be available in a future update.
              </Text>
            </Box>
            
            <Button
              variant="outline"
              isDisabled
              leftIcon={<HiShieldCheck />}
            >
              Enable Two-Factor Authentication
            </Button>
          </VStack>
        </CardBody>
      </Card>

      {/* Active Sessions (Future Feature) */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardBody>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>Active Sessions</Text>
          <VStack spacing={4} align="stretch">
            <Box p={4} bg={useColorModeValue('green.50', 'green.900')} borderRadius="md">
              <Text fontWeight="medium" color="green.600">Current Session</Text>
              <Text fontSize="sm" color={mutedColor}>
                This device • {new Date().toLocaleDateString()} • Active now
              </Text>
            </Box>
            
            <Text fontSize="sm" color={mutedColor}>
              Session management will be available in a future update to help you monitor 
              and control access to your account from different devices.
            </Text>
          </VStack>
        </CardBody>
      </Card>

      {/* Danger Zone */}
      <Card bg={cardBg} border="2px" borderColor="red.200">
        <CardBody>
          <Text fontSize="lg" fontWeight="semibold" mb={4} color="red.500">
            <HiExclamation style={{ display: 'inline', marginRight: '8px' }} />
            Danger Zone
          </Text>
          
          <Alert status="warning" mb={4}>
            <AlertIcon />
            <Box>
              <Text fontWeight="medium">Account Deletion is Permanent</Text>
              <Text fontSize="sm">
                Once you delete your account, there is no going back. All your data, 
                applications, and saved jobs will be permanently removed.
              </Text>
            </Box>
          </Alert>
          
          <VStack align="start" spacing={3}>
            <Text fontSize="sm" color={mutedColor}>
              If you're sure you want to delete your account, click the button below. 
              You'll be asked to confirm this action.
            </Text>
            
            <Button
              colorScheme="red"
              variant="outline"
              leftIcon={<HiTrash />}
              onClick={onDeleteModalOpen}
            >
              Delete My Account
            </Button>
          </VStack>
        </CardBody>
      </Card>

      {/* Delete Account Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="red.500">
            <HiExclamation style={{ display: 'inline', marginRight: '8px' }} />
            Delete Account
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="error" mb={4}>
              <AlertIcon />
              <Box>
                <Text fontWeight="medium">This action cannot be undone!</Text>
                <Text fontSize="sm">
                  This will permanently delete your account and all associated data.
                </Text>
              </Box>
            </Alert>
            
            <VStack spacing={3} align="stretch">
              <Text>
                Are you absolutely sure you want to delete your account? 
                This will immediately log you out and permanently remove:
              </Text>
              
              <Box pl={4}>
                <Text fontSize="sm" color={mutedColor}>• Your profile and personal information</Text>
                <Text fontSize="sm" color={mutedColor}>• All job applications and history</Text>
                <Text fontSize="sm" color={mutedColor}>• Saved jobs and preferences</Text>
                <Text fontSize="sm" color={mutedColor}>• Messages and communications</Text>
              </Box>
              
              <Text fontWeight="medium">
                To confirm, type <strong>DELETE</strong> in the box below:
              </Text>
              
              <Input
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type DELETE to confirm"
                bg={useColorModeValue('white', 'gray.700')}
              />
            </VStack>
          </ModalBody>
          
          <ModalFooter>
            <Button 
              variant="outline" 
              mr={3} 
              onClick={() => {
                onDeleteModalClose();
                setDeleteConfirmText('');
              }}
            >
              Cancel
            </Button>
            <Button 
              colorScheme="red" 
              onClick={handleDeleteConfirm}
              isLoading={loading}
              loadingText="Deleting..."
              isDisabled={deleteConfirmText.toLowerCase() !== 'delete'}
            >
              Delete Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};