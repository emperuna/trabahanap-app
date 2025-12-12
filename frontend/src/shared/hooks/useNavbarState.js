import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDisclosure, useToast, useColorMode } from '@chakra-ui/react';
import { useAuth } from '../../features/auth/context/AuthContext';

export const useNavbarState = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(5);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(75);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Navigation items
  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'HiHome',
      badge: null,
      description: 'Overview and quick actions',
      shortcut: 'D'
    },
    {
      label: 'Find Jobs',
      path: '/find-jobs',
      icon: 'HiSearch',
      badge: 'Hot',
      description: 'Browse and search for jobs',  
      shortcut: 'F'
    }
  ];

  // Initialize data
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        title: 'Application Update',
        message: 'Your application for Software Developer at TechCorp has been reviewed',
        type: 'application',
        time: '2 min ago',
        unread: true
      },
      {
        id: 2,
        title: 'New Job Match',
        message: '3 new jobs match your preferences',
        type: 'match',
        time: '1 hour ago',
        unread: true
      },
      {
        id: 3,
        title: 'Profile View',
        message: 'Your profile was viewed by InnovateTech HR',
        type: 'profile',
        time: '3 hours ago',
        unread: false
      }
    ]);

    const saved = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(saved.slice(0, 5));
  }, []);

  // Online status detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            document.getElementById('navbar-search')?.focus();
            break;
          case 'd':
            e.preventDefault();
            navigate('/dashboard');
            break;
          case 'f':
            e.preventDefault();
            navigate('/find-jobs');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  // Quick search handler
  const handleQuickSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      navigate(`/find-jobs?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, unread: false } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // ✅ FIXED: Logout handler using actual logout function
  const handleLogout = async () => {
    try {
      console.log('🔐 Attempting to logout...');
      await logout(); // Use the actual logout function from AuthContext
      
      toast({
        title: 'Signed out successfully',
        description: 'Come back soon for more opportunities!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      navigate('/');
      console.log('✅ Logout successful, redirected to home');
    } catch (error) {
      console.error('❌ Logout error:', error);
      toast({
        title: 'Error signing out',
        description: error.message || 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Check if path is active
  const isActivePath = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Get notification type color
  const getNotificationTypeColor = (type) => {
    switch (type) {
      case 'application': return 'blue';
      case 'match': return 'green';
      case 'profile': return 'purple';
      default: return 'gray';
    }
  };

  return {
    // State
    searchQuery,
    setSearchQuery,
    notifications,
    unreadCount,
    isSearchFocused,
    setIsSearchFocused,
    recentSearches,
    profileCompletion,
    isOnline,
    navigationItems,
    
    // Drawer state
    isOpen,
    onOpen,
    onClose,
    
    // Theme
    colorMode,
    toggleColorMode,
    
    // Handlers
    handleQuickSearch,
    markAsRead,
    handleLogout,
    isActivePath,
    getNotificationTypeColor
  };
};