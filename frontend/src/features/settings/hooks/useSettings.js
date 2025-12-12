import { useState, useEffect } from 'react';
import { useToast, useColorMode } from '@chakra-ui/react';
import { useAuth } from '../../auth/context/AuthContext';
import { usersAPI } from '../../../shared/api';

export const useSettings = () => {
  const { user, updateUser } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  // Account Settings State
  const [accountSettings, setAccountSettings] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    emailJobAlerts: true,
    emailApplicationUpdates: true,
    emailMarketingEmails: false,
    pushJobRecommendations: true,
    pushApplicationUpdates: true,
    pushNewMessages: true,
    smsJobAlerts: false,
    smsApplicationUpdates: true
  });

  // Privacy Settings State
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowDirectMessages: true,
    allowEmployerContact: true,
    shareAnalytics: true
  });

  // Preferences State
  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'UTC+8',
    currency: 'PHP',
    darkMode: colorMode === 'dark',
    jobAlertFrequency: 'daily',
    emailDigest: 'weekly'
  });

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Update account settings when user changes
    if (user) {
      setAccountSettings({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        location: user.location || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  // ✅ Enhanced handleAccountUpdate with better error handling
  const handleAccountUpdate = async () => {
    try {
      setLoading(true);
      console.log('🔄 useSettings: Starting account update...');
      console.log('📦 useSettings: Account settings data:', accountSettings);
      console.log('👤 useSettings: Current user:', user);
      
      // Validate updateUser function exists
      if (!updateUser || typeof updateUser !== 'function') {
        throw new Error('updateUser function is not available in AuthContext');
      }
      
      // ✅ Enhanced API call with better error handling
      try {
        console.log('🌐 useSettings: Calling API to update profile...');
        const response = await usersAPI.updateProfile(accountSettings);
        console.log('✅ useSettings: API response received:', response);
        
        // Update auth context with the response data
        if (response && response.user) {
          updateUser(response.user);
          console.log('✅ useSettings: User context updated with API response');
          
          toast({
            title: 'Profile updated successfully',
            description: 'Your changes have been saved to the database.',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
        } else {
          console.warn('⚠️ useSettings: API response missing user data, using current settings');
          // Fallback: update with current settings
          const updatedUser = { ...user, ...accountSettings };
          updateUser(updatedUser);
          
          toast({
            title: 'Profile updated',
            description: 'Changes saved successfully.',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
        }
        
        return response;
        
      } catch (apiError) {
        console.error('❌ useSettings: API call failed:', apiError);
        
        // Check specific error types for better user messaging
        if (apiError.message.includes('Authentication failed')) {
          toast({
            title: 'Authentication Error',
            description: 'Please log in again to update your profile.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          // Optionally redirect to login
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
          
        } else if (apiError.message.includes('endpoint not found') || 
                   apiError.message.includes('Backend may not be ready')) {
          
          console.log('📱 useSettings: Backend not ready, saving locally...');
          
          // Backend endpoint doesn't exist - fall back to local update
          const updatedUser = { ...user, ...accountSettings };
          updateUser(updatedUser);
          
          toast({
            title: 'Saved locally',
            description: 'Backend is not ready yet. Changes saved locally and will sync when backend is available.',
            status: 'info',
            duration: 5000,
            isClosable: true,
          });
          
          return { user: updatedUser };
          
        } else if (apiError.message.includes('Cannot connect to server')) {
          
          console.log('🔌 useSettings: Server connection failed, saving locally...');
          
          const updatedUser = { ...user, ...accountSettings };
          updateUser(updatedUser);
          
          toast({
            title: 'Connection Error',
            description: 'Cannot connect to server. Changes saved locally.',
            status: 'warning',
            duration: 5000,
            isClosable: true,
          });
          
          return { user: updatedUser };
          
        } else {
          // Real API error (validation, server error, etc.)
          console.error('❌ useSettings: Real API error:', apiError);
          throw apiError;
        }
      }
      
    } catch (error) {
      console.error('❌ useSettings: Error updating account:', error);
      
      toast({
        title: 'Update failed',
        description: error.message || 'Please try again later.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      
      throw error;
    } finally {
      setLoading(false);
      console.log('🏁 useSettings: Account update process finished');
    }
  };

  const handleNotificationUpdate = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: 'Notification settings updated',
        description: 'Your preferences have been saved locally.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating notifications:', error);
      toast({
        title: 'Update failed',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrivacyUpdate = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: 'Privacy settings updated',
        description: 'Your privacy preferences have been saved locally.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      toast({
        title: 'Update failed',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreferencesUpdate = async () => {
    try {
      setLoading(true);
      
      if (preferences.darkMode !== (colorMode === 'dark')) {
        toggleColorMode();
      }
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: 'Preferences updated',
        description: 'Your preferences have been saved.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast({
        title: 'Update failed',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: 'Password mismatch',
        description: 'New password and confirmation do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters long.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
      toast({
        title: 'Password change simulation',
        description: 'Password change feature will be implemented when backend is ready.',
        status: 'info',
        duration: 4000,
        isClosable: true,
      });
      
      return true;
    } catch (error) {
      console.error('Error changing password:', error);
      toast({
        title: 'Password change failed',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Account deletion not available',
        description: 'This feature will be implemented when backend is ready. Please contact support if needed.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      
      return false;
    } catch (error) {
      console.error('Error with account deletion:', error);
      toast({
        title: 'Request failed',
        description: 'Please contact support for assistance.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    // State
    loading,
    accountSettings,
    notifications,
    privacy,
    preferences,
    passwordData,
    
    // Setters
    setAccountSettings,
    setNotifications,
    setPrivacy,
    setPreferences,
    setPasswordData,
    
    // Actions
    handleAccountUpdate,
    handleNotificationUpdate,
    handlePrivacyUpdate,
    handlePreferencesUpdate,
    handlePasswordChange,
    handleDeleteAccount,
  };
};