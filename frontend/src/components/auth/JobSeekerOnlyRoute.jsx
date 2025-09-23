import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loading from '../common/feedback/Loading';

const JobSeekerOnlyRoute = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const userRoles = user.roles || [];
  
  // Only allow job seekers (ROLE_USER) or users without specific employer/admin roles
  const isJobSeeker = userRoles.includes('ROLE_USER') || 
                     (!userRoles.includes('ROLE_EMPLOYER') && !userRoles.includes('ROLE_ADMIN'));
  
  if (!isJobSeeker) {
    console.log('🚫 Non-job seeker trying to access job seeker page');
    console.log('User roles:', userRoles);
    
    // Redirect employers to their dashboard
    if (userRoles.includes('ROLE_EMPLOYER')) {
      return <Navigate to="/employer-dashboard" replace />;
    }
    
    // Redirect admins to their dashboard
    if (userRoles.includes('ROLE_ADMIN')) {
      return <Navigate to="/admin" replace />;
    }
  }

  return children;
};

export default JobSeekerOnlyRoute;