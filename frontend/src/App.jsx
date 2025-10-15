import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { AuthProvider } from "./context/AuthContext";

// Components
import {
  ProtectedRoute,
  GuestOnlyRoute,
  JobSeekerOnlyRoute,
  EmployerOnlyRoute
} from "./components/auth";

import { ErrorBoundary } from "./components/common/feedback";

// Public Pages
import Home from "./pages/common/Home";
import About from "./pages/static/About";
import Companies from "./pages/static/Companies";
import ComingSoon from "./pages/common/ComingSoon";
import NotFound from "./pages/common/NotFound";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// JobSeeker Pages
import JobSeekerDashboard from './pages/jobseeker/JobSeekerDashboard';
import JobSeekerFindJobs from './pages/jobseeker/JobSeekerFindJobs';
import JobSeekerProfile from './pages/jobseeker/JobSeekerProfile';
import JobSeekerJobDetail from './pages/jobseeker/JobSeekerJobDetail';
import JobSeekerApplications from './pages/jobseeker/JobSeekerApplications';
import JobSeekerSavedJobs from './pages/jobseeker/JobSeekerSavedJobs';

// Settings Pages
import SettingsPage from './pages/settings/SettingsPage';

// Employer Pages
import EmployerPage from "./pages/employer/EmployerPage";
import EmployerDashboard from './pages/employer/EmployerDashboard';
import EmployerPostJob from './pages/employer/EmployerPostJob';
import EmployerApplications from './pages/employer/EmployerApplications';
import EmployerManageJobs from './pages/employer/EmployerManageJobs';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ErrorBoundary>
          <Router>
            <Routes>
              {/* 🏠 Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/companies" element={<Companies />} />
              
              {/* 🔐 Auth Routes */}
              <Route path="/login" element={
                <GuestOnlyRoute>
                  <Login />
                </GuestOnlyRoute>
              } />
              
              <Route path="/register" element={
                <GuestOnlyRoute>
                  <Register />
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
                  <JobSeekerFindJobs />
                </JobSeekerOnlyRoute>
              } />
              
              <Route path="/jobs/:id" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerJobDetail />
                </JobSeekerOnlyRoute>
              } />
              
              <Route path="/dashboard/profile" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerProfile />
                </JobSeekerOnlyRoute>
              } />
              
              <Route path="/dashboard/profile/edit" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerEditProfile />
                </JobSeekerOnlyRoute>
              } />
              
              <Route path="/dashboard/applications" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerApplications />
                </JobSeekerOnlyRoute>
              } />
              
              <Route path="/dashboard/saved" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerSavedJobs />
                </JobSeekerOnlyRoute>
              } />
              
              <Route path="/dashboard/resume" element={
                <JobSeekerOnlyRoute>
                  <ComingSoon />
                </JobSeekerOnlyRoute>
              } />
              
              <Route path="/dashboard/analytics" element={
                <JobSeekerOnlyRoute>
                  <ComingSoon />
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
                  <EmployerPostJob />
                </EmployerOnlyRoute>
              } />
              
              <Route path="/employer/applications" element={
                <EmployerOnlyRoute>
                  <EmployerApplications />
                </EmployerOnlyRoute>
              } />
              
              <Route path="/employer/manage-jobs" element={
                <EmployerOnlyRoute>
                  <EmployerManageJobs />
                </EmployerOnlyRoute>
              } />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ErrorBoundary>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
