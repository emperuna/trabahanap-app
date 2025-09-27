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

// Pages
import Home from "./pages/common/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import JobSeekerPage from "./pages/jobseeker/JobSeekerPage";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import ComingSoon from "./pages/common/ComingSoon";
import NotFound from "./pages/common/NotFound";
import PostJob from './pages/employer/EmployerPostJob';
import JobDetail from './pages/jobseeker/JobSeekerJobDetail';
import EmployerApplications from './pages/employer/EmployerApplications';
import EmployerManageJobs from './pages/employer/EmployerManageJobs';

function App() {
  // Temporary dev button state
  const [showDevButton, setShowDevButton] = React.useState(true);

  return (
    <ErrorBoundary>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Router>
            <Routes>
              {/* 🔒 Guest-Only Routes */}
              <Route path="/" element={
                <GuestOnlyRoute>
                  <Home />
                </GuestOnlyRoute>
              } />
              
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
              
              {/* 🔐 Job Seeker ONLY Routes - Unified Layout */}
              <Route path="/dashboard" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerPage />
                </JobSeekerOnlyRoute>
              } />
              
              <Route path="/find-jobs" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerPage />
                </JobSeekerOnlyRoute>
              } />

              <Route path="/jobs/:id" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerPage />
                </JobSeekerOnlyRoute>
              } />
              
              <Route path="/dashboard/profile" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerPage />
                </JobSeekerOnlyRoute>
              } />

              {/* <Route path="/dashboard/profile" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerProfile />
                </JobSeekerOnlyRoute>
              } /> */}
              
              <Route path="/dashboard/profile/edit" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerPage />
                </JobSeekerOnlyRoute>
              } />
              
              <Route path="/dashboard/settings/profile" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerPage />
                </JobSeekerOnlyRoute>
              } />
              
              <Route path="/dashboard/applications" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerPage />
                </JobSeekerOnlyRoute>
              } />
              
              <Route path="/dashboard/saved" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerPage />
                </JobSeekerOnlyRoute>
              } />
              
              <Route path="/dashboard/resume" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerPage />
                </JobSeekerOnlyRoute>
              } />
              
              <Route path="/dashboard/analytics" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerPage />
                </JobSeekerOnlyRoute>
              } />
              
              <Route path="/dashboard/settings" element={
                <JobSeekerOnlyRoute>
                  <JobSeekerPage />
                </JobSeekerOnlyRoute>
              } />
              
              {/* 🏢 Employer ONLY Routes */}
              <Route path="/employer-dashboard" element={
                <EmployerOnlyRoute>
                  <EmployerDashboard />
                </EmployerOnlyRoute>
              } />
              
              <Route path="/employer/post-job" element={
                <ProtectedRoute requiredRoles={['ROLE_EMPLOYER']}>
                  <PostJob />
                </ProtectedRoute>
              } />
              
              <Route path="/employer/jobs" element={
                <EmployerOnlyRoute>
                  <ComingSoon />
                </EmployerOnlyRoute>
              } />
              
              <Route path="/employer/applications" element={
                <EmployerOnlyRoute>
                  <EmployerApplications />
                </EmployerOnlyRoute>
              } />
              
              <Route path="/employer/candidates" element={
                <EmployerOnlyRoute>
                  <ComingSoon />
                </EmployerOnlyRoute>
              } />
              
              <Route path="/employer/analytics" element={
                <EmployerOnlyRoute>
                  <ComingSoon />
                </EmployerOnlyRoute>
              } />
              
              <Route path="/employer/settings" element={
                <EmployerOnlyRoute>
                  <ComingSoon />
                </EmployerOnlyRoute>
              } />
              
              <Route path="/employer/pricing" element={
                <EmployerOnlyRoute>
                  <ComingSoon />
                </EmployerOnlyRoute>
              } />
              
              <Route path="/employer/interviews" element={
                <EmployerOnlyRoute>
                  <ComingSoon />
                </EmployerOnlyRoute>
              } />
              
              <Route path="/employer/manage-jobs" element={
                <EmployerOnlyRoute>
                  <EmployerManageJobs />
                </EmployerOnlyRoute>
              } />
              
              {/* 👑 Admin ONLY Routes */}
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="ROLE_ADMIN">
                  <ComingSoon />
                </ProtectedRoute>
              } />
              
              {/* 🌐 Public Routes */}
              <Route path="/jobs" element={<ComingSoon />} />
              <Route path="/companies" element={<ComingSoon />} />
              <Route path="/post-job" element={<ComingSoon />} />
              <Route path="/career-advice" element={<ComingSoon />} />
              <Route path="/resume-builder" element={<ComingSoon />} />
              <Route path="/salary-guide" element={<ComingSoon />} />
              <Route path="/interview-tips" element={<ComingSoon />} />
              <Route path="/pricing" element={<ComingSoon />} />
              <Route path="/solutions" element={<ComingSoon />} />
              <Route path="/hire" element={<ComingSoon />} />
              <Route path="/about" element={<ComingSoon />} />
              <Route path="/mission" element={<ComingSoon />} />
              <Route path="/careers" element={<ComingSoon />} />
              <Route path="/press" element={<ComingSoon />} />
              <Route path="/contact" element={<ComingSoon />} />
              <Route path="/help" element={<ComingSoon />} />
              <Route path="/faq" element={<ComingSoon />} />
              <Route path="/privacy" element={<ComingSoon />} />
              <Route path="/terms" element={<ComingSoon />} />
              <Route path="/cookies" element={<ComingSoon />} />
              <Route path="/forgot-password" element={<ComingSoon />} />
              
              {/* 🚫 404 Catch-All Route - MUST BE LAST */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ChakraProvider>
    </ErrorBoundary>
  );
}

export default App;
