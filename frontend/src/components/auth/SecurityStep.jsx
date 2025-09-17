import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Checkbox,
  Text,
  Link,
} from '@chakra-ui/react';
import { HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';

const SecurityStep = ({ 
  formData, 
  errors, 
  onChange, 
  textColor,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  agreeTerms,
  setAgreeTerms
}) => {
  return (
    <VStack spacing={5}>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel fontSize="sm" fontWeight="semibold" color={textColor}>
          Password
        </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <HiLockClosed color="gray.400" />
          </InputLeftElement>
          <Input
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={onChange}
            placeholder="Enter your password"
            size="lg"
            borderRadius="xl"
          />
          <InputRightElement>
            <IconButton
              variant="ghost"
              size="sm"
              icon={showPassword ? <HiEyeOff /> : <HiEye />}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            />
          </InputRightElement>
        </InputGroup>
        <FormHelperText fontSize="sm">
          Must be at least 6 characters
        </FormHelperText>
        <FormErrorMessage fontSize="sm">{errors.password}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.confirmPassword}>
        <FormLabel fontSize="sm" fontWeight="semibold" color={textColor}>
          Confirm Password
        </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <HiLockClosed color="gray.400" />
          </InputLeftElement>
          <Input
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={onChange}
            placeholder="Confirm your password"
            size="lg"
            borderRadius="xl"
          />
          <InputRightElement>
            <IconButton
              variant="ghost"
              size="sm"
              icon={showConfirmPassword ? <HiEyeOff /> : <HiEye />}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage fontSize="sm">{errors.confirmPassword}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.terms}>
        <Checkbox
          isChecked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
          colorScheme="purple"
        >
          <Text fontSize="sm" color={textColor}>
            I agree to the{' '}
            <Link as={RouterLink} to="/terms" color="purple.500" fontWeight="medium">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link as={RouterLink} to="/privacy" color="purple.500" fontWeight="medium">
              Privacy Policy
            </Link>
          </Text>
        </Checkbox>
        <FormErrorMessage fontSize="sm">{errors.terms}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

export default SecurityStep;