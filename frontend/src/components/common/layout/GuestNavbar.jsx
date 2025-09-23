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
  Spacer,
} from '@chakra-ui/react';
import { HiMenu, HiX } from 'react-icons/hi';
import logo from '../../../assets/logo/TrabaHanap-Brandname.svg';

const GuestNavbar = () => {
  // Detect if current page is home
  const isHome = window.location.pathname === '/';
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      bg={isHome ? "rgba(255, 255, 255, 0.95)" : "#153CF5"}
      backdropFilter={isHome ? "blur(20px)" : undefined}
      borderBottom={isHome ? "1px solid" : undefined}
      borderColor={isHome ? "gray.100" : undefined}
      boxShadow="sm"
      w="100%"
    >
      <Container maxW="7xl" px={{ base: 4, md: 6 }}>
        <Flex align="center" h={20}>
          {/* Logo & Brand */}
          <Flex align="center" gap={4}>
            <Link to="/">
              <Image
                src={logo}
                alt="TrabaHanap"
                h={{ base: 6, sm: 7 }}
                w="auto"
                transition="all 0.3s ease"
                filter={isHome ? undefined : 'brightness(0) invert(1)'}
                _hover={{ 
                  transform: 'scale(1.05)',
                  filter: isHome ? 'brightness(1.1)' : 'brightness(1.2) invert(1)'
                }}
              />
            </Link>
          </Flex>

          <Spacer />

          {/* Desktop Navigation */}
          <HStack spacing={1} display={{ base: 'none', lg: 'flex' }}>
            <Button
              as={Link}
              to="/"
              variant="ghost"
              color={isHome ? "gray.600" : "white"}
              fontWeight="500"
              fontSize="sm"
              px={5}
              py={2}
              h={10}
              borderRadius="xl"
              _hover={{ 
                color: isHome ? 'gray.900' : 'white',
                bg: isHome ? 'gray.50' : 'rgba(21, 60, 245, 0.8)',
                transform: 'translateY(-1px)'
              }}
              transition="all 0.2s ease"
            >
              Home
            </Button>
            <Button
              as={Link}
              to="/jobs"
              variant="ghost"
              color={isHome ? "gray.600" : "white"}
              fontWeight="500"
              fontSize="sm"
              px={5}
              py={2}
              h={10}
              borderRadius="xl"
              _hover={{ 
                color: 'gray.900',
                bg: 'gray.50',
                transform: 'translateY(-1px)'
              }}
              transition="all 0.2s ease"
            >
              Browse Jobs
            </Button>
            <Button
              as={Link}
              to="/companies"
              variant="ghost"
              color={isHome ? "gray.600" : "white"}
              fontWeight="500"
              fontSize="sm"
              px={5}
              py={2}
              h={10}
              borderRadius="xl"
              _hover={{ 
                color: 'gray.900',
                bg: 'gray.50',
                transform: 'translateY(-1px)'
              }}
              transition="all 0.2s ease"
            >
              Companies
            </Button>
            <Button
              as={Link}
              to="/about"
              variant="ghost"
              color={isHome ? "gray.600" : "white"}
              fontWeight="500"
              fontSize="sm"
              px={5}
              py={2}
              h={10}
              borderRadius="xl"
              _hover={{ 
                color: 'gray.900',
                bg: 'gray.50',
                transform: 'translateY(-1px)'
              }}
              transition="all 0.2s ease"
            >
              About
            </Button>

            {/* Elegant Divider */}
            <Box 
              w="1px" 
              h={6} 
              bg={isHome ? "gray.200" : "whiteAlpha.700"} 
              mx={4}
              opacity={0.7}
            />

            {/* Auth Buttons */}
            {isHome && (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="ghost"
                  color={isHome ? "gray.600" : "white"}
                  fontWeight="600"
                  fontSize="sm"
                  px={5}
                  py={2}
                  h={10}
                  borderRadius="xl"
                  _hover={{ 
                    color: 'gray.900',
                    bg: 'gray.50',
                    transform: 'translateY(-1px)'
                  }}
                  transition="all 0.2s ease"
                >
                  Sign In
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  size="lg"
                  h={12}
                  px={8}
                  ml={2}
                  bg="#2563eb"
                  color="white"
                  fontWeight="600"
                  fontSize="sm"
                  letterSpacing="0.025em"
                  borderRadius="2xl"
                  boxShadow="0 4px 15px rgba(21, 60, 245, 0.4)"
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bg: "#0F2ECC",
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(21, 60, 245, 0.6)',
                    _before: {
                      opacity: 1
                    }
                  }}
                  _active={{
                    transform: 'translateY(-1px)',
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  <Text position="relative" zIndex={1}>
                    Get Started
                  </Text>
                </Button>
              </>
            )}
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: 'flex', lg: 'none' }}
            onClick={toggleMenu}
            variant="ghost"
            color="gray.600"
            size="lg"
            borderRadius="xl"
            aria-label="Toggle menu"
            icon={isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            _hover={{ 
              bg: 'gray.50',
              transform: 'scale(1.05)'
            }}
            transition="all 0.2s ease"
          />
        </Flex>

        {/* Enhanced Mobile Menu */}
        {isOpen && (
          <Box
            display={{ base: 'block', lg: 'none' }}
            borderTop="1px solid"
            borderColor="gray.100"
            py={6}
            bg="rgba(255, 255, 255, 0.98)"
            backdropFilter="blur(20px)"
            borderRadius="0 0 3xl 3xl"
            mt={-1}
            boxShadow="0 10px 40px rgba(0, 0, 0, 0.1)"
          >
            <VStack spacing={2} align="stretch">
              <Button 
                as={Link} 
                to="/" 
                variant="ghost" 
                color="gray.600"
                fontWeight="500"
                h={12}
                justifyContent="flex-start"
                borderRadius="2xl"
                _hover={{ 
                  color: 'gray.900', 
                  bg: 'gray.50',
                  transform: 'translateX(4px)'
                }}
                transition="all 0.2s ease"
                onClick={closeMenu}
              >
                Home
              </Button>
              <Button 
                as={Link} 
                to="/jobs" 
                variant="ghost" 
                color="gray.600"
                fontWeight="500"
                h={12}
                justifyContent="flex-start"
                borderRadius="2xl"
                _hover={{ 
                  color: 'gray.900', 
                  bg: 'gray.50',
                  transform: 'translateX(4px)'
                }}
                transition="all 0.2s ease"
                onClick={closeMenu}
              >
                Browse Jobs
              </Button>
              <Button 
                as={Link} 
                to="/companies" 
                variant="ghost" 
                color="gray.600"
                fontWeight="500"
                h={12}
                justifyContent="flex-start"
                borderRadius="2xl"
                _hover={{ 
                  color: 'gray.900', 
                  bg: 'gray.50',
                  transform: 'translateX(4px)'
                }}
                transition="all 0.2s ease"
                onClick={closeMenu}
              >
                Companies
              </Button>
              <Button 
                as={Link} 
                to="/about" 
                variant="ghost" 
                color="gray.600"
                fontWeight="500"
                h={12}
                justifyContent="flex-start"
                borderRadius="2xl"
                _hover={{ 
                  color: 'gray.900', 
                  bg: 'gray.50',
                  transform: 'translateX(4px)'
                }}
                transition="all 0.2s ease"
                onClick={closeMenu}
              >
                About
              </Button>

              {/* Mobile Auth Section */}
              <Box pt={6} borderTop="1px solid" borderColor="gray.100" mt={4}>
                <VStack spacing={3}>
                  <Button 
                    as={Link} 
                    to="/login" 
                    variant="outline"
                    borderColor="gray.200"
                    color="gray.700"
                    fontWeight="600"
                    h={12}
                    w="full"
                    borderRadius="2xl"
                    _hover={{ 
                      borderColor: 'gray.300', 
                      bg: 'gray.50',
                      transform: 'translateY(-1px)'
                    }}
                    transition="all 0.2s ease"
                    onClick={closeMenu}
                  >
                    Sign In
                  </Button>
                  
                  <Button 
                    as={Link} 
                    to="/register"
                    size="lg"
                    h={14}
                    w="full"
                    bg="#2563eb"
                    color="white"
                    fontWeight="600"
                    letterSpacing="0.025em"
                    borderRadius="2xl"
                    boxShadow="0 4px 15px rgba(21, 60, 245, 0.4)"
                    _hover={{
                      bg: "#0F2ECC",
                      transform: 'translateY(-2px)',
                      boxShadow: "0 8px 25px rgba(21, 60, 245, 0.6)"
                    }}
                    transition="all 0.3s ease"
                    onClick={closeMenu}
                  >
                    Get Started Free
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default GuestNavbar;