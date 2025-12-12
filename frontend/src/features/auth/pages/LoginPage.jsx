import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Checkbox,
  Link,
  Alert,
  AlertIcon,
  Image,
  Flex,
  useColorModeValue,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import { HiUser, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import logo from '../../../assets/logo/TrabaHanap-Logo.svg';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access, or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');
  
  const headerGradient = useColorModeValue(
    'linear(135deg, blue.600 12%, blue.500 63%, blue.400 100%)',
    'linear(135deg, blue.700 12%, blue.600 63%, blue.500 100%)'
  );
  
  // ✅ ADDED: Button gradients
  const buttonGradient = useColorModeValue(
    'linear(135deg, blue.600 12%, blue.500 63%, blue.400 100%)',
    'linear(135deg, blue.700 12%, blue.600 63%, blue.500 100%)'
  );
  
  const buttonHoverGradient = useColorModeValue(
    'linear(135deg, blue.700 12%, blue.600 63%, blue.500 100%)',
    'linear(135deg, blue.800 12%, blue.700 63%, blue.600 100%)'
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    console.log('🚀 Starting login process...');
    const result = await login(formData);
    
    console.log('📦 Full login result:', result);
    
    if (result.success) {
      const user = result.user || result.data?.user || result.data;
      console.log('🔍 Extracted user:', user);
      
      const userRoles = user?.roles || [];
      console.log('🎭 User roles:', userRoles);
      
      // Add a small delay to ensure auth context is updated
      setTimeout(() => {
        if (userRoles.includes('ROLE_EMPLOYER')) {
          console.log('🏢 Redirecting to employer dashboard');
          window.location.href = '/employer-dashboard'; 
        } else if (userRoles.includes('ROLE_ADMIN')) {
          console.log('👑 Redirecting to admin dashboard');
          window.location.href = '/admin';
        } else {
          console.log('💼 Redirecting to job seeker dashboard');
          window.location.href = '/dashboard';
        }
      }, 100);
      
    } else {
      console.error('❌ Login failed:', result.error);
      setErrors({
        submit: result.error || 'Login failed. Please try again.'
      });
    }
  };

  return (
    <Box minH="100vh" bg={bgColor} py={12}>
      <Container maxW="lg" centerContent>
        <Box
          w="full"
          maxW="md"
          bg={cardBg}
          boxShadow="2xl"
          borderRadius="3xl"
          border="1px solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          overflow="hidden"
        >
          {/* Header Section */}
          <Box
            bgGradient={headerGradient}
            px={8}
            py={12}
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            {/* Background Pattern */}
            <Box
              position="absolute"
              top="-50%"
              left="-50%"
              w="200%"
              h="200%"
              bg="whiteAlpha.100"
              borderRadius="50%"
              transform="rotate(15deg)"
            />
            
            <VStack spacing={4} position="relative" zIndex={1}>
              <Box
                p={4}
                bg="whiteAlpha.200"
                borderRadius="2xl"
                backdropFilter="blur(10px)"
              >
                <Image
                  src={logo}
                  alt="TrabaHanap"
                  h={10}
                  w={10}
                  filter="brightness(0) invert(1)"
                />
              </Box>
              
              <VStack spacing={2}>
                <Heading size="lg" color="white" fontWeight="bold">
                  Welcome Back
                </Heading>
                <Text color="whiteAlpha.900" fontSize="sm">
                  Sign in to access your dashboard
                </Text>
              </VStack>
            </VStack>
          </Box>

          {/* Form Section */}
          <Box px={8} py={8}>
            <VStack spacing={6}>
              {/* Error Alert */}
              {error && (
                <Alert 
                  status="error" 
                  borderRadius="xl" 
                  bg={useColorModeValue('red.50', 'red.900')}
                  border="1px" 
                  borderColor={useColorModeValue('red.200', 'red.700')}
                >
                  <AlertIcon color={useColorModeValue('red.500', 'red.400')} /> 
                  <Text color={useColorModeValue('red.700', 'red.300')} fontSize="sm">
                    {error}
                  </Text>
                </Alert>
              )}

              {/* Login Form */}
              <Box as="form" onSubmit={handleSubmit} w="full">
                <VStack spacing={6}>
                  {/* Username Field */}
                  <FormControl isInvalid={!!errors.username}>
                    <FormLabel color={textColor} fontSize="sm" fontWeight="600">
                      Username
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <HiUser color={useColorModeValue('gray.400', 'gray.500')} /> 
                      </InputLeftElement>
                      <Input
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        size="lg"
                        borderRadius="xl"
                        borderColor={useColorModeValue('gray.200', 'gray.600')}
                        _hover={{ borderColor: useColorModeValue('gray.300', 'gray.500') }}
                        _focus={{
                          borderColor: 'blue.500',
                          boxShadow: useColorModeValue(
                            '0 0 0 1px rgba(59, 130, 246, 0.4)',
                            '0 0 0 1px rgba(96, 165, 250, 0.4)'
                          )
                        }}
                      />
                    </InputGroup>
                    <FormErrorMessage fontSize="sm">
                      {errors.username}
                    </FormErrorMessage>
                  </FormControl>

                  {/* Password Field */}
                  <FormControl isInvalid={!!errors.password}>
                    <FormLabel color={textColor} fontSize="sm" fontWeight="600">
                      Password
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <HiLockClosed color={useColorModeValue('gray.400', 'gray.500')} />
                      </InputLeftElement>
                      <Input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        size="lg"
                        borderRadius="xl"
                        borderColor={useColorModeValue('gray.200', 'gray.600')}
                        _hover={{ borderColor: useColorModeValue('gray.300', 'gray.500') }}
                        _focus={{
                          borderColor: 'blue.500',
                          boxShadow: useColorModeValue(
                            '0 0 0 1px rgba(59, 130, 246, 0.4)',
                            '0 0 0 1px rgba(96, 165, 250, 0.4)'
                          )
                        }}
                      />
                      <InputRightElement>
                        <IconButton
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          icon={showPassword ? <HiEyeOff /> : <HiEye />}
                          color={useColorModeValue('gray.400', 'gray.500')}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage fontSize="sm">
                      {errors.password}
                    </FormErrorMessage>
                  </FormControl>

                  {/* Remember Me & Forgot Password */}
                  <Flex justify="space-between" w="full" align="center">
                    <Checkbox
                      isChecked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      colorScheme="blue"
                      size="sm"
                    >
                      <Text fontSize="sm" color={textColor}>
                        Remember me
                      </Text>
                    </Checkbox>
                    
                    <Link
                      as={RouterLink}
                      to="/forgot-password"
                      fontSize="sm"
                      color="blue.500"
                      fontWeight="medium"
                      _hover={{
                        color: "blue.600",
                        textDecoration: 'none'
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Flex>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    w="full"
                    h={12}
                    bgGradient={buttonGradient}
                    color="white"
                    fontWeight="600"
                    borderRadius="xl"
                    isLoading={isLoading}
                    loadingText="Signing in..."
                    _hover={{
                      bgGradient: buttonHoverGradient,
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg'
                    }}
                    _active={{
                      transform: 'translateY(0)',
                    }}
                    transition="all 0.2s ease"
                  >
                    Sign In
                  </Button>
                </VStack>
              </Box>

              {/* Divider */}
              <HStack w="full">
                <Divider />
                <Text fontSize="sm" color={textColor} whiteSpace="nowrap">
                  New to TrabaHanap?
                </Text>
                <Divider />
              </HStack>

              {/* Sign Up Link */}
              <Button
                as={RouterLink}
                to="/register"
                variant="outline"
                size="lg"
                w="full"
                h={12}
                borderColor="blue.500"
                color="blue.500"
                fontWeight="600"
                borderRadius="xl"
                _hover={{
                  bg: useColorModeValue('blue.50', 'blue.900'),
                  borderColor: 'blue.600',
                  transform: 'translateY(-1px)'
                }}
                transition="all 0.2s ease"
              >
                Create New Account
              </Button>

              {/* Back to Home */}
              <Text textAlign="center" fontSize="sm" color={textColor}>
                <Link
                  as={RouterLink}
                  to="/"
                  color="blue.500"
                  fontWeight="medium"
                  _hover={{
                    color: "blue.600",
                    textDecoration: 'none'
                  }}
                >
                  ← Back to Home
                </Link>
              </Text>
            </VStack>
          </Box>
        </Box>

        {/* Footer Text */}
        <Text mt={8} fontSize="sm" color={textColor} textAlign="center">
          By signing in, you agree to our{' '}
          <Link color="blue.500" fontWeight="medium">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link color="blue.500" fontWeight="medium">
            Privacy Policy
          </Link>
        </Text>
      </Container>
    </Box>
  );
};

export default Login;
