import React from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { HiUser, HiMail } from 'react-icons/hi';

const AccountDetailsStep = ({ formData, errors, onChange, textColor }) => {
  return (
    <VStack spacing={5}>
      <FormControl isInvalid={!!errors.username}>
        <FormLabel fontSize="sm" fontWeight="semibold" color={textColor}>
          Username
        </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <HiUser color="gray.400" />
          </InputLeftElement>
          <Input
            name="username"
            value={formData.username}
            onChange={onChange}
            placeholder="johndoe"
            size="lg"
            borderRadius="xl"
          />
        </InputGroup>
        <FormHelperText fontSize="sm">
          Must be at least 3 characters
        </FormHelperText>
        <FormErrorMessage fontSize="sm">{errors.username}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.email}>
        <FormLabel fontSize="sm" fontWeight="semibold" color={textColor}>
          Email Address
        </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <HiMail color="gray.400" />
          </InputLeftElement>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            placeholder="john@example.com"
            size="lg"
            borderRadius="xl"
          />
        </InputGroup>
        <FormErrorMessage fontSize="sm">{errors.email}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

export default AccountDetailsStep;