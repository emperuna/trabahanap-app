import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Home from "./pages/common/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/jobseeker/JobSeekerDashboard";
import JobSeekerProfile from "./pages/jobseeker/JobSeekerProfile";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import ComingSoon from "./pages/common/ComingSoon";

// Components
import ProtectedRoute from "./components/auth/ProtectedRoute";
import GuestOnlyRoute from "./components/auth/GuestOnlyRoute";

function App() {
  return (
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
            
            {/* 🔐 Job Seeker Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/profile" element={
              <ProtectedRoute>
                <JobSeekerProfile />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/profile/edit" element={
              <ProtectedRoute>
                <JobSeekerProfile />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/settings/profile" element={
              <ProtectedRoute>
                <JobSeekerProfile />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <ComingSoon />
              </ProtectedRoute>
            } />
            
            {/* 🏢 Employer Protected Routes */}
            <Route path="/employer-dashboard" element={
              <ProtectedRoute requiredRole="ROLE_EMPLOYER">
                <EmployerDashboard />
              </ProtectedRoute>
            } />
            
            {/* Employer sub-routes (all Coming Soon for now) */}
            <Route path="/employer/post-job" element={
              <ProtectedRoute requiredRole="ROLE_EMPLOYER">
                <ComingSoon />
              </ProtectedRoute>
            } />
            
            <Route path="/employer/jobs" element={
              <ProtectedRoute requiredRole="ROLE_EMPLOYER">
                <ComingSoon />
              </ProtectedRoute>
            } />
            
            <Route path="/employer/applications" element={
              <ProtectedRoute requiredRole="ROLE_EMPLOYER">
                <ComingSoon />
              </ProtectedRoute>
            } />
            
            <Route path="/employer/candidates" element={
              <ProtectedRoute requiredRole="ROLE_EMPLOYER">
                <ComingSoon />
              </ProtectedRoute>
            } />
            
            <Route path="/employer/analytics" element={
              <ProtectedRoute requiredRole="ROLE_EMPLOYER">
                <ComingSoon />
              </ProtectedRoute>
            } />
            
            <Route path="/employer/settings" element={
              <ProtectedRoute requiredRole="ROLE_EMPLOYER">
                <ComingSoon />
              </ProtectedRoute>
            } />
            
            <Route path="/employer/pricing" element={
              <ProtectedRoute requiredRole="ROLE_EMPLOYER">
                <ComingSoon />
              </ProtectedRoute>
            } />
            
            {/* 👑 Admin Protected Routes */}
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
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
