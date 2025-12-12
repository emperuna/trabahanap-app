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
import { Link } from 'react-router-dom';
import { useAuth } from '../../../features/auth/context/AuthContext';

const RoleAccessDenied = ({ attemptedRole, userRole }) => {
  const { user } = useAuth();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const getDashboardLink = () => {
    const userRoles = user?.roles || [];
    
    if (userRoles.includes('ROLE_EMPLOYER')) {
      return "/employer-dashboard";
    } else if (userRoles.includes('ROLE_ADMIN')) {
      return "/admin";
    } else {
      return "/dashboard";
    }
  };

  const getRoleDisplayName = (role) => {
    if (role === 'ROLE_EMPLOYER' || role === 'employer') return 'Employer';
    if (role === 'ROLE_USER' || role === 'user') return 'Job Seeker';
    if (role === 'ROLE_ADMIN' || role === 'admin') return 'Admin';
    return role;
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
            as={HiExclamationTriangle}
            boxSize={16}
            color="orange.500"
          />
          
          <Heading size="lg" color="gray.800">
            Access Restricted
          </Heading>
          
          <VStack spacing={3}>
            <Text color="gray.600" fontSize="lg">
              This page is only accessible to {getRoleDisplayName(attemptedRole)} accounts.
            </Text>
            
            <Text color="gray.500" fontSize="md">
              Your current role: <strong>{getRoleDisplayName(userRole)}</strong>
            </Text>
            
            <Text color="gray.500" fontSize="sm">
              You've been redirected because you don't have the required permissions to access this page.
            </Text>
          </VStack>

          <VStack spacing={3} w="full">
            <Button
              as={Link}
              to={getDashboardLink()}
              colorScheme="blue"
              size="lg"
              w="full"
            >
              Go to My Dashboard
            </Button>
            
            <Button
              as={Link}
              to="/jobs"
              variant="outline"
              size="md"
              w="full"
            >
              Browse Jobs
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default RoleAccessDenied;