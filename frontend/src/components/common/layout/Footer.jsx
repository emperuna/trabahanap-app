import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Link,
  VStack,
  HStack,
  IconButton,
  Divider,
  Image,
  Heading,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram 
} from 'react-icons/fa';
import { 
  HiMail, 
  HiPhone, 
  HiLocationMarker 
} from 'react-icons/hi';
import logo from '../../../assets/logo/TrabaHanap-Logo.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const bgColor = useColorModeValue('gray.900', 'gray.900');
  const textColor = useColorModeValue('gray.300', 'gray.300');
  const headingColor = useColorModeValue('white', 'white');

  const footerLinks = {
    'For Job Seekers': [
      { label: 'Browse Jobs', href: '/jobs' },
      { label: 'Career Advice', href: '/career-advice' },
      { label: 'Resume Builder', href: '/resume-builder' },
      { label: 'Salary Guide', href: '/salary-guide' },
    ],
    'For Employers': [
      { label: 'Post a Job', href: '/post-job' },
      { label: 'Employer Dashboard', href: '/employer-dashboard' },
      { label: 'Pricing Plans', href: '/pricing' },
      { label: 'Recruitment Solutions', href: '/solutions' },
    ],
    'Company': [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Press & Media', href: '/press' },
    ],
    'Support': [
      { label: 'Help Center', href: '/dashboard/help' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com/trabahanap', label: 'Facebook' },
    { icon: FaTwitter, href: 'https://twitter.com/trabahanap', label: 'Twitter' },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/trabahanap', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://instagram.com/trabahanap', label: 'Instagram' },
  ];

  return (
    <Box bg={bgColor} color={textColor}>
      <Container maxW="7xl" py={16}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 6 }} spacing={8}>
          {/* Brand Section */}
          <VStack align="flex-start" spacing={6} gridColumn={{ lg: 'span 2' }}>
            <VStack align="flex-start" spacing={4}>
              <HStack spacing={3}>
                <Image
                  src={logo}
                  alt="TrabaHanap"
                  h={10}
                  w={10}
                  filter="brightness(0) invert(1)"
                />
                <Heading size="lg" color={headingColor} fontWeight="bold">
                  TrabaHanap
                </Heading>
              </HStack>
              
              <Text fontSize="md" maxW="300px" lineHeight="tall">
                The Philippines' leading job platform connecting talented professionals 
                with their dream careers at top companies.
              </Text>
            </VStack>

            {/* Contact Info */}
            <VStack align="flex-start" spacing={3}>
              <HStack spacing={3}>
                <Box color="#1554F5">
                  <HiMail size={18} />
                </Box>
                <Link href="mailto:hello@trabahanap.com" _hover={{ color: '#1554F5' }}>
                  hello@trabahanap.com
                </Link>
              </HStack>
              
              <HStack spacing={3}>
                <Box color="#1554F5">
                  <HiPhone size={18} />
                </Box>
                <Link href="tel:+639123456789" _hover={{ color: '#1554F5' }}>
                  +63 912 345 6789
                </Link>
              </HStack>
              
              <HStack spacing={3}>
                <Box color="#1554F5">
                  <HiLocationMarker size={18} />
                </Box>
                <Text fontSize="sm">
                  Makati City, Metro Manila, Philippines
                </Text>
              </HStack>
            </VStack>
          </VStack>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <VStack key={category} align="flex-start" spacing={4}>
              <Heading size="sm" color={headingColor} fontWeight="semibold">
                {category}
              </Heading>
              <VStack align="flex-start" spacing={3}>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    fontSize="sm"
                    _hover={{ 
                      color: '#1554F5',
                      textDecoration: 'none',
                      transform: 'translateX(4px)'
                    }}
                    transition="all 0.2s ease"
                  >
                    {link.label}
                  </Link>
                ))}
              </VStack>
            </VStack>
          ))}
        </SimpleGrid>

        <Divider my={12} borderColor="gray.700" />

        {/* Bottom Section */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={6}
        >
          {/* Copyright */}
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing={2}>
            <Text fontSize="sm">
              &copy; {currentYear} TrabaHanap. All rights reserved.
            </Text>
            <Text fontSize="sm" color="gray.400">
              Made with care in the Philippines
            </Text>
          </VStack>

          {/* Social Links */}
          <VStack spacing={4}>
            <Text fontSize="sm" fontWeight="semibold" color={headingColor}>
              Follow Us
            </Text>
            <HStack spacing={3}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  as="a"
                  href={social.href}
                  aria-label={social.label}
                  icon={<social.icon />}
                  variant="ghost"
                  color="gray.400"
                  size="lg"
                  borderRadius="full"
                  _hover={{ 
                    color: '#1554F5',
                    bg: 'gray.800',
                    transform: 'translateY(-2px)'
                  }}
                  transition="all 0.2s ease"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ))}
            </HStack>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;