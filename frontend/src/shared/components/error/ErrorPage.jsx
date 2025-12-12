import React from 'react';
import { Box, Container, VStack } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useErrorPage } from '../../hooks/useErrorPage';
import ErrorBackground from './ErrorBackground';
import ErrorHeader from './ErrorHeader';
import ErrorContent from './ErrorContent';
import FeaturesPreview from './FeaturesPreview';
import ErrorActions from './ErrorActions';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ErrorPage = ({ 
  errorCode = '404',
  title = 'Page Under Construction',
  message = 'This feature is coming soon! We\'re working hard to bring you the best job search experience.',
  showComingSoon = true 
}) => {
  const { getFeatureName, handleGoBack, handleGoHome, handleRefresh } = useErrorPage();

  return (
    <Box 
      minH="100vh" 
      bgGradient="linear(135deg, blue.500, blue.500, blue.600)" 
      position="relative"
      overflow="hidden"
    >
      <ErrorBackground />

      <Container 
        maxW="6xl" 
        centerContent 
        minH="100vh" 
        py={16}
        position="relative"
        zIndex={1}
      >
        <VStack 
          spacing={12} 
          textAlign="center"
          animation={`${fadeIn} 1s ease-out`}
        >
          <ErrorHeader />
          
          <ErrorContent 
            errorCode={errorCode}
            title={title}
            message={message}
            showComingSoon={showComingSoon}
            featureName={getFeatureName()}
          />

          {showComingSoon && <FeaturesPreview />}

          <ErrorActions 
            onGoBack={handleGoBack}
            onGoHome={handleGoHome}
            onRefresh={handleRefresh}
          />
        </VStack>
      </Container>
    </Box>
  );
};

export default ErrorPage;