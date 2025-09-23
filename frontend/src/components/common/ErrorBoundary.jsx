import React from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { HiExclamation } from 'react-icons/hi';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

const ErrorFallback = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Box bg={bgColor} minH="100vh" py={20}>
      <Container maxW="md" centerContent>
        <VStack
          bg={cardBg}
          p={10}
          borderRadius="2xl"
          boxShadow="xl"
          spacing={6}
          textAlign="center"
        >
          <Icon
            as={HiExclamation}
            boxSize={16}
            color="red.500"
          />
          
          <Heading size="lg" color="gray.800">
            Something went wrong
          </Heading>
          
          <Text color="gray.600" fontSize="lg">
            We're sorry, but something unexpected happened.
          </Text>
          
          <Button
            colorScheme="blue"
            size="lg"
            onClick={handleReload}
          >
            Reload Page
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default ErrorBoundary;