import React, { useState, useEffect } from 'react';
import {
  IconButton, Button, useToast, Tooltip
} from '@chakra-ui/react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { savedJobsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const SaveJobButton = ({ 
  jobId, 
  size = 'md', 
  variant = 'icon', // 'icon' or 'button'
  colorScheme = 'red',
  onSaveChange // Callback when save status changes
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (isAuthenticated && jobId) {
      checkSavedStatus();
    }
  }, [jobId, isAuthenticated]);

  const checkSavedStatus = async () => {
    try {
      const saved = await savedJobsAPI.isJobSaved(jobId);
      setIsSaved(saved);
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const handleSaveToggle = async () => {
    if (!isAuthenticated) {
      toast({
        title: 'Please log in',
        description: 'You need to be logged in to save jobs',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      if (isSaved) {
        await savedJobsAPI.removeSavedJob(jobId);
        setIsSaved(false);
        toast({
          title: 'Job removed',
          description: 'Job removed from your saved list',
          status: 'info',
          duration: 2000,
          isClosable: true,
        });
      } else {
        await savedJobsAPI.saveJob(jobId);
        setIsSaved(true);
        toast({
          title: 'Job saved!',
          description: 'Job added to your saved list',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }

      // Notify parent component of change
      if (onSaveChange) {
        onSaveChange(jobId, !isSaved);
      }

    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'button') {
    return (
      <Button
        leftIcon={isSaved ? <HiHeart /> : <HiOutlineHeart />}
        onClick={handleSaveToggle}
        isLoading={loading}
        colorScheme={isSaved ? colorScheme : 'gray'}
        variant={isSaved ? 'solid' : 'outline'}
        size={size}
      >
        {isSaved ? 'Saved' : 'Save Job'}
      </Button>
    );
  }

  return (
    <Tooltip label={isSaved ? 'Remove from saved' : 'Save job'} hasArrow>
      <IconButton
        icon={isSaved ? <HiHeart /> : <HiOutlineHeart />}
        onClick={handleSaveToggle}
        isLoading={loading}
        colorScheme={isSaved ? colorScheme : 'gray'}
        variant={isSaved ? 'solid' : 'outline'}
        size={size}
        aria-label={isSaved ? 'Remove from saved' : 'Save job'}
      />
    </Tooltip>
  );
};

export default SaveJobButton;