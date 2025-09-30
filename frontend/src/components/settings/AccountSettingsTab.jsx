import React, { useEffect } from 'react';
import {
  Card, CardBody, VStack, Grid, FormControl, FormLabel, Input,
  Textarea, Button, HStack, Avatar, IconButton, Text, Box,
  useColorModeValue, useToast
} from '@chakra-ui/react';
import { HiSave, HiCamera } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../hooks/useSettings';
export const AccountSettingsTab = () => {
  const { user } = useAuth();
  const { accountSettings, setAccountSettings, handleAccountUpdate, loading } = useSettings();
  const toast = useToast();
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  // ✅ Debug logging
  useEffect(() => {
    console.log('👤 AccountSettingsTab - Current user:', user);
    console.log('⚙️ AccountSettingsTab - Account settings:', accountSettings);
  }, [user, accountSettings]);

  // ✅ Enhanced save handler with validation
  const handleSave = async () => {
    try {
      // Basic validation
      if (!accountSettings.firstName?.trim() || !accountSettings.lastName?.trim()) {
        toast({
          title: 'Validation Error',
          description: 'First name and last name are required.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (!accountSettings.email?.trim()) {
        toast({
          title: 'Validation Error',
          description: 'Email address is required.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(accountSettings.email)) {
        toast({
          title: 'Invalid Email',
          description: 'Please enter a valid email address.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      console.log('💾 AccountSettingsTab - Saving with data:', accountSettings);
      await handleAccountUpdate();
      console.log('✅ AccountSettingsTab - Save completed successfully');
      
    } catch (error) {
      console.error('❌ AccountSettingsTab - Save failed:', error);
      toast({
        title: 'Save Failed',
        description: error.message || 'Unable to save changes. Please try again.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // ✅ Handle profile picture change (placeholder for now)
  const handleProfilePictureChange = () => {
    toast({
      title: 'Coming Soon',
      description: 'Profile picture upload will be available soon!',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Card bg={cardBg} border="1px" borderColor={borderColor}>
      <CardBody>
        <VStack spacing={6} align="stretch">
          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={4}>Account Information</Text>
            
            {/* Profile Picture */}
            <HStack spacing={6} mb={6}>
              <Box position="relative">
                <Avatar 
                  size="2xl" 
                  name={`${accountSettings.firstName || 'User'} ${accountSettings.lastName || ''}`}
                  src={user?.profilePicture}
                  bg="blue.500"
                  color="white"
                />
                <IconButton
                  icon={<HiCamera />}
                  size="sm"
                  colorScheme="blue"
                  borderRadius="full"
                  position="absolute"
                  bottom={0}
                  right={0}
                  aria-label="Change profile picture"
                  onClick={handleProfilePictureChange}
                  _hover={{ transform: 'scale(1.1)' }}
                  transition="all 0.2s"
                />
              </Box>
              <VStack align="start" flex="1">
                <Text fontWeight="semibold">Profile Picture</Text>
                <Text fontSize="sm" color={mutedColor}>
                  Upload a professional photo to make a great first impression
                </Text>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleProfilePictureChange}
                >
                  Change Photo
                </Button>
              </VStack>
            </HStack>

            {/* Personal Information */}
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mb={6}>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  value={accountSettings.firstName || ''}
                  onChange={(e) => setAccountSettings({
                    ...accountSettings,
                    firstName: e.target.value
                  })}
                  placeholder="Enter your first name"
                  bg={useColorModeValue('white', 'gray.700')}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  value={accountSettings.lastName || ''}
                  onChange={(e) => setAccountSettings({
                    ...accountSettings,
                    lastName: e.target.value
                  })}
                  placeholder="Enter your last name"
                  bg={useColorModeValue('white', 'gray.700')}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  value={accountSettings.email || ''}
                  onChange={(e) => setAccountSettings({
                    ...accountSettings,
                    email: e.target.value
                  })}
                  placeholder="Enter your email address"
                  bg={useColorModeValue('white', 'gray.700')}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  value={accountSettings.phoneNumber || ''} 
                  onChange={(e) => setAccountSettings({
                    ...accountSettings,
                    phoneNumber: e.target.value
                  })}
                  placeholder="Enter your phone number"
                  bg={useColorModeValue('white', 'gray.700')}
                />
              </FormControl>
              
              <FormControl gridColumn={{ md: "span 2" }}>
                <FormLabel>Location</FormLabel>
                <Input
                  value={accountSettings.location || ''}
                  onChange={(e) => setAccountSettings({
                    ...accountSettings,
                    location: e.target.value
                  })}
                  placeholder="City, State/Country"
                  bg={useColorModeValue('white', 'gray.700')}
                />
              </FormControl>
            </Grid>

            <FormControl mb={6}>
              <FormLabel>Bio</FormLabel>
              <Textarea
                value={accountSettings.bio || ''}
                onChange={(e) => setAccountSettings({
                  ...accountSettings,
                  bio: e.target.value
                })}
                rows={4}
                placeholder="Tell employers about yourself..."
                bg={useColorModeValue('white', 'gray.700')}
                resize="vertical"
              />
            </FormControl>

            {/* ✅ Enhanced Save Button */}
            <HStack spacing={4}>
              <Button
                colorScheme="blue"
                leftIcon={<HiSave />}
                onClick={handleSave}
                isLoading={loading}
                loadingText="Saving..."
                size="lg"
                _hover={{ transform: 'translateY(-1px)' }}
                transition="all 0.2s"
              >
                Save Account Changes
              </Button>

              {/* ✅ Reset Button */}
              <Button
                variant="outline"
                onClick={() => {
                  // Reset to original user data
                  setAccountSettings({
                    firstName: user?.firstName || '',
                    lastName: user?.lastName || '',
                    email: user?.email || '',
                    phoneNumber: user?.phoneNumber || '',
                    location: user?.location || '',
                    bio: user?.bio || ''
                  });
                  toast({
                    title: 'Form Reset',
                    description: 'Changes have been discarded.',
                    status: 'info',
                    duration: 2000,
                    isClosable: true,
                  });
                }}
                isDisabled={loading}
              >
                Reset
              </Button>
            </HStack>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};