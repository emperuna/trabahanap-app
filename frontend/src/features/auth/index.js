// Auth Feature Public Exports
export { default as LoginPage } from './pages/LoginPage';
export { default as RegisterPage } from './pages/RegisterPage';

// Guards
export { 
  default as GuestOnlyRoute 
} from './guards/GuestOnlyRoute';
export { 
  default as ProtectedRoute 
} from './guards/ProtectedRoute';
export { 
  default as JobSeekerOnlyRoute 
} from './guards/JobSeekerOnlyRoute';
export { 
  default as EmployerOnlyRoute 
} from './guards/EmployerOnlyRoute';

// Context
export { AuthProvider, useAuth } from './context/AuthContext';

// Hooks
export { default as useRegistrationForm } from './hooks/useRegistrationForm';

// Components
export { default as AccountDetailsStep } from './components/AccountDetailsStep';
export { default as PersonalInfoStep } from './components/PersonalInfoStep';
export { default as SecurityStep } from './components/SecurityStep';
export { default as StepProgress } from './components/StepProgress';
