import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Auth Guards - will be updated to features path
import {
  GuestOnlyRoute,
  JobSeekerOnlyRoute,
  EmployerOnlyRoute
} from '../features/auth/guards';

// Auth Pages
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';

// Dashboard Pages
import JobSeekerDashboard from '../features/dashboard/pages/JobSeekerDashboard';
import EmployerDashboard from '../features/dashboard/pages/EmployerDashboard';

// Jobs Pages
import FindJobsPage from '../features/jobs/pages/FindJobsPage';
import JobDetailPage from '../features/jobs/pages/JobDetailPage';
import SavedJobsPage from '../features/jobs/pages/SavedJobsPage';
import PostJobPage from '../features/jobs/pages/PostJobPage';
import ManageJobsPage from '../features/jobs/pages/ManageJobsPage';

// Applications Pages
import MyApplicationsPage from '../features/applications/pages/MyApplicationsPage';
import EmployerApplicationsPage from '../features/applications/pages/EmployerApplicationsPage';

// Profile Pages
import JobSeekerProfilePage from '../features/profile/pages/JobSeekerProfilePage';

// Settings Pages
import SettingsPage from '../features/settings/pages/SettingsPage';

// Shared Pages
import ComingSoonPage from '../shared/components/error/ComingSoonPage';
import NotFoundPage from '../shared/components/error/NotFoundPage';
import EmployerPage from '../features/dashboard/pages/EmployerPage';

/**
 * Application Routes Configuration
 * Centralized route definitions for the entire app
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirects to login */}
      <Route path="/" element={<LoginPage />} />
      
      {/* 🔐 Auth Routes */}
      <Route path="/login" element={
        <GuestOnlyRoute>
          <LoginPage />
        </GuestOnlyRoute>
      } />
      
      <Route path="/register" element={
        <GuestOnlyRoute>
          <RegisterPage />
        </GuestOnlyRoute>
      } />

      {/* 👤 JobSeeker Routes */}
      <Route path="/dashboard" element={
        <JobSeekerOnlyRoute>
          <JobSeekerDashboard />
        </JobSeekerOnlyRoute>
      } />
      
      <Route path="/find-jobs" element={
        <JobSeekerOnlyRoute>
          <FindJobsPage />
        </JobSeekerOnlyRoute>
      } />
      
      <Route path="/jobs/:id" element={
        <JobSeekerOnlyRoute>
          <JobDetailPage />
        </JobSeekerOnlyRoute>
      } />
      
      <Route path="/dashboard/profile" element={
        <JobSeekerOnlyRoute>
          <JobSeekerProfilePage />
        </JobSeekerOnlyRoute>
      } />
      
      <Route path="/dashboard/applications" element={
        <JobSeekerOnlyRoute>
          <MyApplicationsPage />
        </JobSeekerOnlyRoute>
      } />
      
      <Route path="/dashboard/saved" element={
        <JobSeekerOnlyRoute>
          <SavedJobsPage />
        </JobSeekerOnlyRoute>
      } />
      
      <Route path="/dashboard/resume" element={
        <JobSeekerOnlyRoute>
          <ComingSoonPage />
        </JobSeekerOnlyRoute>
      } />
      
      <Route path="/dashboard/analytics" element={
        <JobSeekerOnlyRoute>
          <ComingSoonPage />
        </JobSeekerOnlyRoute>
      } />

      {/* ⚙️ Settings Routes */}
      <Route path="/settings" element={
        <JobSeekerOnlyRoute>
          <SettingsPage />
        </JobSeekerOnlyRoute>
      } />
      
      <Route path="/settings/account" element={
        <JobSeekerOnlyRoute>
          <SettingsPage />
        </JobSeekerOnlyRoute>
      } />
      
      <Route path="/settings/notifications" element={
        <JobSeekerOnlyRoute>
          <SettingsPage />
        </JobSeekerOnlyRoute>
      } />
      
      <Route path="/settings/privacy" element={
        <JobSeekerOnlyRoute>
          <SettingsPage />
        </JobSeekerOnlyRoute>
      } />
      
      <Route path="/settings/preferences" element={
        <JobSeekerOnlyRoute>
          <SettingsPage />
        </JobSeekerOnlyRoute>
      } />
      
      <Route path="/settings/security" element={
        <JobSeekerOnlyRoute>
          <SettingsPage />
        </JobSeekerOnlyRoute>
      } />

      {/* 🏢 Employer Routes */}
      <Route path="/employer-dashboard" element={
        <EmployerOnlyRoute>
          <EmployerPage />
        </EmployerOnlyRoute>
      } />
      
      <Route path="/employer/dashboard" element={
        <EmployerOnlyRoute>
          <EmployerDashboard />
        </EmployerOnlyRoute>
      } />
      
      <Route path="/employer/post-job" element={
        <EmployerOnlyRoute>
          <PostJobPage />
        </EmployerOnlyRoute>
      } />
      
      <Route path="/employer/applications" element={
        <EmployerOnlyRoute>
          <EmployerApplicationsPage />
        </EmployerOnlyRoute>
      } />
      
      <Route path="/employer/manage-jobs" element={
        <EmployerOnlyRoute>
          <ManageJobsPage />
        </EmployerOnlyRoute>
      } />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
