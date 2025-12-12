import React from 'react';
import {
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';
import { HiUser, HiPhone, HiUserGroup } from 'react-icons/hi';

const PersonalInfoStep = ({ formData, errors, onChange, textColor }) => {
  return (
    <VStack spacing={5}>
      <SimpleGrid columns={2} spacing={4} w="full">
        <FormControl isInvalid={!!errors.firstName}>
          <FormLabel fontSize="sm" fontWeight="semibold" color={textColor}>
            First Name
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <HiUser color="gray.400" />
            </InputLeftElement>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={onChange}
              placeholder="John"
              size="lg"
              borderRadius="xl"
            />
          </InputGroup>
          <FormErrorMessage fontSize="sm">{errors.firstName}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lastName}>
          <FormLabel fontSize="sm" fontWeight="semibold" color={textColor}>
            Last Name
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <HiUser color="gray.400" />
            </InputLeftElement>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={onChange}
              placeholder="Doe"
              size="lg"
              borderRadius="xl"
            />
          </InputGroup>
          <FormErrorMessage fontSize="sm">{errors.lastName}</FormErrorMessage>
        </FormControl>
      </SimpleGrid>

      <FormControl isInvalid={!!errors.phoneNumber}>
        <FormLabel fontSize="sm" fontWeight="semibold" color={textColor}>
          Phone Number
        </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <HiPhone color="gray.400" />
          </InputLeftElement>
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onChange}
            placeholder="+63 912 345 6789"
            size="lg"
            borderRadius="xl"
          />
        </InputGroup>
        <FormErrorMessage fontSize="sm">{errors.phoneNumber}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel fontSize="sm" fontWeight="semibold" color={textColor}>
          Account Type
        </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <HiUserGroup color="gray.400" />
          </InputLeftElement>
          <Select
            name="role"
            value={formData.role}
            onChange={onChange}
            size="lg"
            borderRadius="xl"
            pl={10}
          >
            <option value="user">Job Seeker</option>
            <option value="employer">Employer</option>
          </Select>
        </InputGroup>
      </FormControl>
    </VStack>
  );
};

export default PersonalInfoStep;