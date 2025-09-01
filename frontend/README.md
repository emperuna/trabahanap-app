# Trabahanap Frontend

A modern React application for the Trabahanap job portal, built with Vite and styled with Tailwind CSS.

## Technologies Used

- **React 19** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **ESLint** - Code linting and formatting

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Loading.jsx
│   ├── Navbar.jsx
│   └── Footer.jsx
├── pages/          # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── services/       # API services and utilities
│   └── api.js
├── context/        # React Context providers
│   └── AuthContext.jsx
├── assets/         # Static assets
├── App.jsx         # Main application component
├── main.jsx        # Application entry point
└── index.css       # Global styles and Tailwind configuration
```

## Features

- ✅ Responsive design with Tailwind CSS
- ✅ React Router for navigation
- ✅ Authentication context and state management
- ✅ Reusable UI components (Button, Input, Loading)
- ✅ Modern navbar with mobile menu
- ✅ Comprehensive footer with links
- ✅ Login and registration forms
- ✅ API service layer with Axios
- ✅ Error handling and loading states
- ✅ Form validation

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
VITE_API_URL=http://localhost:8080/api
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Component Guidelines

### Button Component
```jsx
import Button from './components/Button';

<Button variant="primary" size="medium" loading={false}>
  Click me
</Button>
```

Variants: `primary`, `secondary`, `outline`, `danger`, `success`
Sizes: `small`, `medium`, `large`

### Input Component
```jsx
import Input from './components/Input';

<Input
  label="Email"
  name="email"
  type="email"
  required
  error={errors.email}
  helperText="Enter a valid email address"
/>
```

### Loading Component
```jsx
import Loading from './components/Loading';

<Loading size="medium" text="Loading..." />
```

## Authentication

The app uses React Context for authentication state management. The `AuthProvider` wraps the entire application and provides:

- User login/logout functionality
- Authentication state
- Protected routes capability
- Token management

```jsx
import { useAuth } from './context/AuthContext';

const { user, login, logout, isAuthenticated, isLoading } = useAuth();
```

## API Integration

API calls are centralized in `src/services/api.js`:

```jsx
import { authAPI, jobsAPI } from './services/api';

// Login
const result = await authAPI.login({ username, password });

// Get jobs
const jobs = await jobsAPI.getAllJobs({ page: 1, limit: 10 });
```

## Styling

The project uses Tailwind CSS with custom utility classes defined in `index.css`:

- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling
- `.btn-outline` - Outline button styling
- `.input-field` - Input field styling
- `.card` - Card container styling
- `.navbar-link` - Navbar link styling

## Responsive Design

All components are designed mobile-first with responsive breakpoints:

- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up

## Environment Variables

- `VITE_API_URL` - Backend API base URL (default: http://localhost:8080/api)

## Next Steps

1. **Authentication Integration**: Connect login/register forms to backend API
2. **Job Listings**: Create job search and listing pages
3. **User Profile**: Build user profile and dashboard
4. **Company Pages**: Add company profiles and job posting
5. **Advanced Search**: Implement filters and search functionality
6. **File Upload**: Add resume upload capability
7. **Real-time Notifications**: Implement notification system
8. **Testing**: Add unit and integration tests

## Contributing

1. Follow the established component structure
2. Use TypeScript for new components (optional but recommended)
3. Ensure responsive design for all new features
4. Add proper error handling and loading states
5. Update this README when adding new features+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
