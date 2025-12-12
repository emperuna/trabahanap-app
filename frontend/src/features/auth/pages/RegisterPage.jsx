import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Alert,
  AlertIcon,
  Image,
  useColorModeValue,
  Divider,
  Link,
} from '@chakra-ui/react';
import { HiUser, HiMail, HiLockClosed, HiCheckCircle } from 'react-icons/hi';

import { useRegistrationForm } from '../hooks/useRegistrationForm';
import PersonalInfoStep from '../components/PersonalInfoStep';
import AccountDetailsStep from '../components/AccountDetailsStep';
import SecurityStep from '../components/SecurityStep';
import StepProgress from '../components/StepProgress';
import logo from '../../../assets/logo/TrabaHanap-Logo.svg';

const Register = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    formData,
    errors,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    agreeTerms,
    setAgreeTerms,
    success,
    isLoading,
    error,
    handleChange,
    handleNext,
    handlePrevious,
    handleSubmit,
  } = useRegistrationForm();

  // Theme colors
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.900', 'white');

  const steps = [
    { number: 1, title: 'Personal Info', icon: HiUser },
    { number: 2, title: 'Account Details', icon: HiMail },
    { number: 3, title: 'Security', icon: HiLockClosed },
  ];

  // In the success state rendering, update the redirect message:
  if (success) {
    setTimeout(() => {
      navigate('/login', { state: { from: { pathname: '/dashboard' } } });
    }, 2000);

    return (
      <Box minH="100vh" bg={bgColor} display="flex" alignItems="center" justifyContent="center">
        <Container maxW="md" textAlign="center">
          <VStack spacing={6}>
            <Box
              p={4}
              bgGradient="linear(135deg, green.400 0%, green.500 100%)"
              borderRadius="full"
              display="inline-flex"
            >
              <HiCheckCircle size={48} color="white" />
            </Box>
            <VStack spacing={2}>
              <Heading size="lg" color={headingColor}>
                Account Created Successfully!
              </Heading>
              <Text color={textColor}>
                Welcome to TrabaHanap! Redirecting you to login...
              </Text>
              <Text fontSize="sm" color="gray.500">
                You'll be taken to your dashboard after signing in.
              </Text>
            </VStack>
          </VStack>
        </Container>
      </Box>
    );
  }

  const renderStepContent = () => {
    const stepProps = {
      formData,
      errors,
      onChange: handleChange,
      textColor,
    };

    switch (currentStep) {
      case 1:
        return <PersonalInfoStep {...stepProps} />;
      case 2:
        return <AccountDetailsStep {...stepProps} />;
      case 3:
        return (
          <SecurityStep
            {...stepProps}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            agreeTerms={agreeTerms}
            setAgreeTerms={setAgreeTerms}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box minH="100vh" bg={bgColor} py={12}>
      <Container maxW="lg" centerContent>
        <Box
          w="full"
          maxW="lg"
          bg={cardBg}
          boxShadow="2xl"
          borderRadius="3xl"
          border="1px solid"
          borderColor="gray.200"
          overflow="hidden"
        >
          {/* Header Section */}
          <Box
            bgGradient={useColorModeValue(
              'linear(135deg, blue.400 0%, blue.500 50%, blue.600 100%)',
              'linear(135deg, blue.500 0%, blue.600 50%, blue.700 100%)'
            )}
            px={8}
            py={8}
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              inset={0}
              backgroundImage={`radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 1px, transparent 0)`}
              backgroundSize="30px 30px"
              opacity={0.3}
              zIndex={0}
            />

            <VStack spacing={4} position="relative" zIndex={1}>
              <Box
                p={3}
                bg="whiteAlpha.200"
                borderRadius="2xl"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="whiteAlpha.300"
              >
                <Image
                  src={logo}
                  alt="TrabaHanap"
                  h={8}
                  w={8}
                  filter="brightness(0) invert(1)"
                />
              </Box>
              
              <VStack spacing={2}>
                <Heading size="lg" color="white" fontWeight="bold">
                  Join TrabaHanap
                </Heading>
                <Text color="whiteAlpha.900" fontSize="sm">
                  Create your account to start your career journey
                </Text>
              </VStack>

              <StepProgress steps={steps} currentStep={currentStep} />
            </VStack>
          </Box>

          {/* Form Section */}
          <Box px={8} py={8}>
            <VStack spacing={6}>
              {error && (
                <Alert status="error" borderRadius="xl" variant="left-accent">
                  <AlertIcon />
                  <Text fontSize="sm">{error}</Text>
                </Alert>
              )}

              <Box w="full">{renderStepContent()}</Box>

              {/* Navigation Buttons */}
              <HStack spacing={4} w="full" justify="space-between">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handlePrevious}
                  isDisabled={currentStep === 1}
                  borderRadius="xl"
                  flex={1}
                  colorScheme="gray"
                >
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    size="lg"
                    onClick={handleNext}
                    colorScheme="blue"
                    borderRadius="xl"
                    flex={1}
                    _hover={{
                      transform: 'translateY(-1px)'
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="lg"
                    onClick={handleSubmit}
                    colorScheme="blue"
                    isLoading={isLoading}
                    loadingText="Creating Account..."
                    borderRadius="xl"
                    flex={1}
                    _hover={{
                      transform: 'translateY(-1px)'
                    }}
                  >
                    Create Account
                  </Button>
                )}
              </HStack>

              <HStack w="full">
                <Divider />
                <Text fontSize="sm" color={textColor} whiteSpace="nowrap">
                  Already have an account?
                </Text>
                <Divider />
              </HStack>

              <Button
                as={RouterLink}
                to="/login"
                variant="ghost"
                size="lg"
                w="full"
                color="blue.500"
                fontWeight="600"
                borderRadius="xl"
                _hover={{ 
                  bg: useColorModeValue('blue.50', 'blue.900'),
                  transform: 'translateY(-1px)' 
                }}
              >
                Sign In Instead
              </Button>

              <Text textAlign="center" fontSize="sm" color={textColor}>
                <Link
                  as={RouterLink}
                  to="https://trabahanap.dev"
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
      </Container>
    </Box>
  );
};

export default Register;
