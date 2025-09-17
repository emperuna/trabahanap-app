import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Add more routes here as you create more pages */}
              <Route path="/jobs" element={<div className="p-8 text-center">Jobs Page - Coming Soon</div>} />
              <Route path="/companies" element={<div className="p-8 text-center">Companies Page - Coming Soon</div>} />
              <Route path="/about" element={<div className="p-8 text-center">About Page - Coming Soon</div>} />
              <Route path="/contact" element={<div className="p-8 text-center">Contact Page - Coming Soon</div>} />
              <Route path="*" element={<div className="p-8 text-center">404 - Page Not Found</div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
