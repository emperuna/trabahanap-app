import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loading from '../common/Loading';

const ProtectedRoute = ({ children, requiredRole, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRoles = user.roles || [];
  
  // Check for specific required role
  if (requiredRole) {
    const hasRequiredRole = userRoles.includes(requiredRole) || 
                           userRoles.includes(requiredRole.replace('ROLE_', ''));
    
    if (!hasRequiredRole) {
      console.log('❌ Access denied. Required role:', requiredRole);
      console.log('User roles:', userRoles);
      
      // Redirect to appropriate dashboard based on user's actual role
      return getRedirectBasedOnRole(userRoles);
    }
  }

  // Check for allowed roles (for pages that allow multiple roles)
  if (allowedRoles && allowedRoles.length > 0) {
    const hasAllowedRole = allowedRoles.some(role => 
      userRoles.includes(role) || userRoles.includes(role.replace('ROLE_', ''))
    );
    
    if (!hasAllowedRole) {
      console.log('❌ Access denied. Allowed roles:', allowedRoles);
      console.log('User roles:', userRoles);
      
      // Redirect to appropriate dashboard based on user's actual role
      return getRedirectBasedOnRole(userRoles);
    }
  }

  // ✅ ROLE VALIDATION: Prevent cross-role access
  const currentPath = location.pathname;
  
  // Check if employer is trying to access job seeker pages
  if (userRoles.includes('ROLE_EMPLOYER')) {
    const jobSeekerPaths = ['/dashboard', '/dashboard/profile', '/dashboard/settings'];
    const isJobSeekerPath = jobSeekerPaths.some(path => currentPath.startsWith(path));
    
    if (isJobSeekerPath) {
      console.log('🚫 Employer trying to access job seeker page:', currentPath);
      return <Navigate to="/employer-dashboard" replace />;
    }
  }
  
  // Check if job seeker is trying to access employer pages
  if (userRoles.includes('ROLE_USER') || (!userRoles.includes('ROLE_EMPLOYER') && !userRoles.includes('ROLE_ADMIN'))) {
    const employerPaths = ['/employer-dashboard', '/employer/'];
    const isEmployerPath = employerPaths.some(path => currentPath.startsWith(path));
    
    if (isEmployerPath) {
      console.log('🚫 Job seeker trying to access employer page:', currentPath);
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

// Helper function to redirect based on user role
const getRedirectBasedOnRole = (userRoles) => {
  if (userRoles.includes('ROLE_EMPLOYER')) {
    return <Navigate to="/employer-dashboard" replace />;
  } else if (userRoles.includes('ROLE_ADMIN')) {
    return <Navigate to="/admin" replace />;
  } else {
    return <Navigate to="/dashboard" replace />;
  }
};

export default ProtectedRoute;