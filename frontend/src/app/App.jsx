import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProviders } from './providers';
import AppRoutes from './routes';
import { ErrorBoundary } from '../shared/components/feedback';

/**
 * Main App Component
 * Entry point for the application - uses AppProviders for context and AppRoutes for routing
 */
function App() {
  return (
    <AppProviders>
      <ErrorBoundary>
        <Router>
          <AppRoutes />
        </Router>
      </ErrorBoundary>
    </AppProviders>
  );
}

export default App;
