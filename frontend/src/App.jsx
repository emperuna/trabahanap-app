import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext';
import theme from './theme';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Existing Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Coming Soon Routes */}
            <Route path="/jobs" element={<ComingSoon />} />
            <Route path="/post-job" element={<ComingSoon />} />
            <Route path="/career-advice" element={<ComingSoon />} />
            <Route path="/resume-builder" element={<ComingSoon />} />
            <Route path="/salary-guide" element={<ComingSoon />} />
            <Route path="/interview-tips" element={<ComingSoon />} />
            <Route path="/employer-dashboard" element={<ComingSoon />} />
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
            
            {/* 404 Route - Must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
