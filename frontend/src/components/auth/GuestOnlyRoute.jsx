import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import Loading from '../common/feedback/Loading';

const GuestOnlyRoute = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();
  const toast = useToast();

  // Debug logging
  console.log('🔒 GuestOnlyRoute check:', {
    isAuthenticated,
    isLoading,
    user: user ? { id: user.id, roles: user.roles } : null,
    currentPath: location.pathname
  });

  useEffect(() => {
    if (isAuthenticated && !isLoading && user) {
      // Show toast notification when redirecting authenticated users
      toast({
        title: 'Already logged in',
        description: 'You have been redirected to your dashboard.',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
        containerStyle: {
          bg: 'blue.500',
          color: 'white',
        }
      });
    }
  }, [isAuthenticated, isLoading, user, toast]);

  // Show loading while checking authentication
  if (isLoading) {
    console.log('⏳ GuestOnlyRoute: Loading...');
    return <Loading />;
  }

  // If user is authenticated, redirect to appropriate dashboard
  if (isAuthenticated && user) {
    const userRoles = user.roles || [];
    console.log('🚫 Authenticated user trying to access guest page:', location.pathname);
    
    let redirectTo = '/dashboard'; // Default for job seekers
    
    if (userRoles.includes('ROLE_EMPLOYER')) {
      redirectTo = '/employer-dashboard';
      console.log('🏢 Redirecting employer to:', redirectTo);
    } else if (userRoles.includes('ROLE_ADMIN')) {
      redirectTo = '/admin';
      console.log('👑 Redirecting admin to:', redirectTo);
    }
    
    console.log(`🔄 Redirecting from ${location.pathname} to ${redirectTo}`);
    
    return <Navigate to={redirectTo} replace />;
  }

  // If not authenticated, render the guest page
  console.log('✅ Guest access granted to:', location.pathname);
  return children;
};

export default GuestOnlyRoute;