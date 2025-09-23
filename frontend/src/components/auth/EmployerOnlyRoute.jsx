import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loading from '../common/Loading';

const EmployerOnlyRoute = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const userRoles = user.roles || [];
  
  // Only allow employers
  const isEmployer = userRoles.includes('ROLE_EMPLOYER');
  
  if (!isEmployer) {
    console.log('🚫 Non-employer trying to access employer page');
    console.log('User roles:', userRoles);
    
    // Redirect job seekers to their dashboard
    if (userRoles.includes('ROLE_USER') || 
        (!userRoles.includes('ROLE_ADMIN') && !userRoles.includes('ROLE_EMPLOYER'))) {
      return <Navigate to="/dashboard" replace />;
    }
    
    // Redirect admins to their dashboard
    if (userRoles.includes('ROLE_ADMIN')) {
      return <Navigate to="/admin" replace />;
    }
  }

  return children;
};

export default EmployerOnlyRoute;