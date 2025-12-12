import React from 'react';
import ErrorPage from './ErrorPage';

const NotFound = () => {
  return (
    <ErrorPage
      errorCode="404"
      title="Oops! Page Not Found"
      message="The page you're looking for seems to have wandered off. Don't worry, even the best explorers sometimes take a wrong turn!"
      showComingSoon={false}
    />
  );
};

export default NotFound;