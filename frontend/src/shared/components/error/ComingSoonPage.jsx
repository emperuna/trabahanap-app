import React from 'react';
import ErrorPage from './ErrorPage';

const ComingSoon = () => {
  return (
    <ErrorPage
      errorCode="🚧"
      title="Amazing Things Are Coming"
      message="We're crafting something special just for you! Our team is working around the clock to bring you the most innovative job search experience."
      showComingSoon={true}
    />
  );
};

export default ComingSoon;