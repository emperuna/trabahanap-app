import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Button,
  Image,
  Container,
  Text,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { HiMenu, HiX } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo/TrabaHanap-Logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      bg="bg.glass"
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Container maxW="7xl">
        <Flex justify="space-between" h={16}>
          {/* Logo */}
          <Flex align="center">
            <Link to="/">
              <Image
                src={logo}
                alt="TrabaHanap"
                h={8}
                w="auto"
              />
            </Link>
          </Flex>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <Button
              as={Link}
              to="/"
              variant="ghost"
              color="gray.800"
              _hover={{ color: 'purple.400' }}
              px={3}
              py={2}
              fontSize="sm"
              fontWeight="medium"
            >
              Home
            </Button>
            <Button
              as={Link}
              to="/jobs"
              variant="ghost"
              color="gray.800"
              _hover={{ color: 'purple.400' }}
              px={3}
              py={2}
              fontSize="sm"
              fontWeight="medium"
            >
              Find Jobs
            </Button>
            <Button
              as={Link}
              to="/companies"
              variant="ghost"
              color="gray.800"
              _hover={{ color: 'purple.400' }}
              px={3}
              py={2}
              fontSize="sm"
              fontWeight="medium"
            >
              For Employers
            </Button>
            <Button
              as={Link}
              to="/about"
              variant="ghost"
              color="gray.800"
              _hover={{ color: 'purple.400' }}
              px={3}
              py={2}
              fontSize="sm"
              fontWeight="medium"
            >
              About
            </Button>

            {user ? (
              <HStack spacing={4}>
                <Button
                  as={Link}
                  to="/dashboard"
                  variant="ghost"
                  color="gray.800"
                  _hover={{ color: 'purple.400' }}
                  px={3}
                  py={2}
                  fontSize="sm"
                  fontWeight="medium"
                >
                  Dashboard
                </Button>
                <Text color="gray.500" fontSize="sm">
                  Welcome, {user.name}
                </Text>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  px={4}
                  py={2}
                  borderRadius="md"
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  Logout
                </Button>
              </HStack>
            ) : (
              <HStack spacing={4}>
                <Button
                  as={Link}
                  to="/login"
                  variant="ghost"
                  color="gray.800"
                  _hover={{ color: 'purple.400' }}
                  px={3}
                  py={2}
                  fontSize="sm"
                  fontWeight="medium"
                >
                  Sign In
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="primaryGradient"
                  px={5}
                  py={2}
                  borderRadius="md"
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  Get Started
                </Button>
              </HStack>
            )}
          </HStack>

          {/* Mobile Menu Button */}
          <Flex align="center" display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={toggleMenu}
              variant="ghost"
              color="gray.800"
              aria-label="Toggle menu"
              icon={isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            />
          </Flex>
        </Flex>

        {/* Mobile Menu */}
        {isOpen && (
          <Box
            display={{ base: 'block', md: 'none' }}
            borderTop="1px solid"
            borderColor="border.subtle"
            bg="bg.glass"
            px={2}
            pt={2}
            pb={3}
          >
            <VStack spacing={1} align="stretch">
              <Button as={Link} to="/" variant="ghost" color="gray.800" _hover={{ color: 'purple.400', bg: 'whiteAlpha.100' }} onClick={closeMenu}>Home</Button>
              <Button as={Link} to="/jobs" variant="ghost" color="gray.800" _hover={{ color: 'purple.400', bg: 'whiteAlpha.100' }} onClick={closeMenu}>Find Jobs</Button>
              <Button as={Link} to="/companies" variant="ghost" color="gray.800" _hover={{ color: 'purple.400', bg: 'whiteAlpha.100' }} onClick={closeMenu}>For Employers</Button>
              <Button as={Link} to="/about" variant="ghost" color="gray.800" _hover={{ color: 'purple.400', bg: 'whiteAlpha.100' }} onClick={closeMenu}>About</Button>
              {user ? (
                <>
                  <Button as={Link} to="/dashboard" variant="ghost" color="gray.800" _hover={{ color: 'purple.400', bg: 'whiteAlpha.100' }} onClick={closeMenu}>Dashboard</Button>
                  <Button onClick={() => { handleLogout(); closeMenu(); }} variant="outline" w="full">Logout</Button>
                </>
              ) : (
                <>
                  <Button as={Link} to="/login" variant="ghost" color="gray.800" _hover={{ color: 'purple.400', bg: 'whiteAlpha.100' }} onClick={closeMenu}>Sign In</Button>
                  <Button as={Link} to="/register" variant="primaryGradient" w="full" onClick={closeMenu}>Get Started</Button>
                </>
              )}
            </VStack>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Navbar;