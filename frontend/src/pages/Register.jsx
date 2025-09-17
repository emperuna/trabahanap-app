import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import PersonalInfoStep from '../components/auth/PersonalInfoStep';
import AccountDetailsStep from '../components/auth/AccountDetailsStep';
import SecurityStep from '../components/auth/SecurityStep';
import StepProgress from '../components/auth/StepProgress';
import logo from '../assets/logo/TrabaHanap-Logo.svg';

const Register = () => {
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

  if (success) {
    return (
      <Box minH="100vh" bg={bgColor} display="flex" alignItems="center" justifyContent="center">
        <Container maxW="md" textAlign="center">
          <VStack spacing={6}>
            <Box p={6} bg="green.50" borderRadius="full" display="inline-block">
              <HiCheckCircle size={48} color="green" />
            </Box>
            <VStack spacing={2}>
              <Heading size="lg" color={headingColor}>
                Account Created Successfully!
              </Heading>
              <Text color={textColor}>
                Welcome to TrabaHanap! Redirecting you to the login page...
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
            bgGradient="linear(135deg, purple.500, blue.500)"
            px={8}
            py={8}
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            <VStack spacing={4} position="relative" zIndex={1}>
              <Box
                p={3}
                bg="whiteAlpha.200"
                borderRadius="2xl"
                backdropFilter="blur(10px)"
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
                >
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    size="lg"
                    onClick={handleNext}
                    bgGradient="linear(135deg, purple.500, blue.500)"
                    color="white"
                    _hover={{
                      bgGradient: "linear(135deg, purple.600, blue.600)",
                      transform: 'translateY(-1px)'
                    }}
                    borderRadius="xl"
                    flex={1}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="lg"
                    onClick={handleSubmit}
                    bgGradient="linear(135deg, purple.500, blue.500)"
                    color="white"
                    isLoading={isLoading}
                    loadingText="Creating Account..."
                    _hover={{
                      bgGradient: "linear(135deg, purple.600, blue.600)",
                      transform: 'translateY(-1px)'
                    }}
                    borderRadius="xl"
                    flex={1}
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
                color="purple.500"
                fontWeight="600"
                borderRadius="xl"
                _hover={{ bg: 'purple.50', transform: 'translateY(-1px)' }}
              >
                Sign In Instead
              </Button>

              <Text textAlign="center" fontSize="sm" color={textColor}>
                <Link
                  as={RouterLink}
                  to="/"
                  color="purple.500"
                  fontWeight="medium"
                  _hover={{ color: 'purple.600', textDecoration: 'none' }}
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
