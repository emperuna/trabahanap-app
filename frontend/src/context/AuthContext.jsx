import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOGOUT: 'LOGOUT',
  LOAD_USER: 'LOAD_USER',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_LOADING_FALSE: 'SET_LOADING_FALSE',
};

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOAD_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };

    case AUTH_ACTIONS.SET_LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verify token on app startup
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken();
    } else {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING_FALSE });
    }
  }, []);

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('🔄 AuthContext: Initializing authentication...');
        const token = localStorage.getItem('token');
        
        if (token) {
          console.log('🔑 AuthContext: Token found, verifying...');
          try {
            const userData = await authAPI.verifyToken();
            console.log('✅ AuthContext: User verified:', userData);
            setUser(userData);
            setIsAuthenticated(true);
          } catch (error) {
            console.error('❌ AuthContext: Token verification failed:', error);
            localStorage.removeItem('token');
            setUser(null);
            setIsAuthenticated(false);
          }
        } else {
          console.log('🚫 AuthContext: No token found');
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('💥 AuthContext: Initialization error:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
        console.log('✅ AuthContext: Initialization complete');
      }
    };

    initializeAuth();
  }, []);

  const verifyToken = async () => {
    try {
      const response = await authAPI.verifyToken();
      dispatch({
        type: AUTH_ACTIONS.LOAD_USER,
        payload: {
          id: response.id,
          username: response.username,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          phoneNumber: response.phoneNumber,
          roles: response.roles
        }
      });
    } catch (error) {
      localStorage.removeItem('token');
      dispatch({ type: AUTH_ACTIONS.SET_LOADING_FALSE });
    }
  };

  const login = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOGIN_START });
      console.log('🔐 AuthContext: Starting login with credentials:', credentials);
      
      const response = await authAPI.login(credentials);
      console.log('📡 AuthContext: API response:', response);
      
      if (response.token) {
        // Store token
        localStorage.setItem('token', response.token);
        
        // Extract user data - check multiple possible locations
        const userData = response.user || response.userInfo || response.data?.user || response;
        console.log('👤 AuthContext: Extracted user data:', userData);
        
        if (userData && userData.id) {
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: {
              user: {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                roles: userData.roles
              },
              token: response.token
            },
          });
          
          return {
            success: true,
            user: userData,
            data: response
          };
        } else {
          console.error('❌ AuthContext: No valid user data in response');
          return {
            success: false,
            error: 'Invalid user data received'
          };
        }
      } else {
        console.error('❌ AuthContext: No token in response');
        return {
          success: false,
          error: response.message || 'Login failed'
        };
      }
    } catch (error) {
      console.error('💥 AuthContext: Login error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Network error'
      };
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING_FALSE });
    }
  };

  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });
    try {
      await authAPI.register(userData);
      dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS });
      return { success: true };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        payload: error.message || 'Registration failed',
      });
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 AuthContext: Starting logout process...');
      
      // Clear localStorage
      localStorage.removeItem('token');
      console.log('🗑️ AuthContext: Token removed from localStorage');
      
      // Clear sessionStorage as well (just in case)
      sessionStorage.clear();
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      console.log('✅ AuthContext: User state cleared');
      
      // Optional: Call backend logout endpoint if you have one
      try {
        await authAPI.logout();
      } catch (error) {
        console.warn('Backend logout failed, but continuing with client logout');
      }
      
      // Force reload to ensure all state is cleared
      setTimeout(() => {
        window.location.href = '/login';
      }, 100);
      
      console.log('🔄 AuthContext: Redirecting to login page');
      
    } catch (error) {
      console.error('❌ AuthContext: Logout error:', error);
      // Even if there's an error, clear the state and redirect
      localStorage.removeItem('token');
      sessionStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = '/login';
    }
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    register,
    logout,
    clearError,
  };

  const contextValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register
  };

  console.log('🔍 AuthContext State:', {
    isAuthenticated,
    isLoading,
    hasUser: !!user,
    userRoles: user?.roles || []
  });

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
