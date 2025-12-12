import React from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Avatar,
  HStack,
  Icon,
  Link,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { HiMail, HiPhone } from 'react-icons/hi';
import { FaLinkedin, FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';

// Import team member images
import AlbertoImg from '../../../assets/images/Alberto.png';
import GarinImg from '../../../assets/images/Garin.png';
import MesiasImg from '../../../assets/images/Mesias.png';
import AquinoImg from '../../../assets/images/Aquino.png';

const ContactTeam = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textPrimary = useColorModeValue('gray.900', 'gray.100');
  const textSecondary = useColorModeValue('gray.600', 'gray.400');

  const teamMembers = [
    {
      name: 'Jeremy Garin',
      role: 'Fullstack Developer',
      email: 'jeremy.garin@trabahanap.com',
      phone: '+63 917 123 4567',
      image: GarinImg,
      social: {
        facebook: 'https://facebook.com/SupremeNovaAE',
        twitter: 'https://twitter.com/emperuna',
        github: 'https://github.com/emperuna',
        linkedin: 'https://linkedin.com/in/jeremy-garin-b9299036a'
      }
    },
    {
      name: 'Jose Aquino III',
      role: 'Backend Specialist',
      email: 'jose.aquino@trabahanap.com',
      phone: '+63 917 234 5678',
      image: AquinoImg,
      social: {
        facebook: 'https://facebook.com/aquinojxse',
        twitter: 'https://twitter.com/jose_aquino',
        github: 'https://github.com/fyodorrrrr',
        linkedin: 'https://linkedin.com/in/jose-aquino'
      }
    },
    {
      name: 'Ian Patrick Mesias',
      role: 'Tester & QA',
      email: 'ian.mesias@trabahanap.com',
      phone: '+63 917 345 6789',
      image: MesiasImg,
      social: {
        facebook: 'https://facebook.com/mesias02',
        twitter: 'https://twitter.com/ian_mesias',
        github: 'https://github.com/imPickleRiick',
        linkedin: 'https://linkedin.com/in/ian-mesias'
      }
    },
    {
      name: 'Marc Alberto',
      role: 'Frontend Specialist',
      email: 'marc.alberto@trabahanap.com',
      phone: '+63 917 456 7890',
      image: AlbertoImg,
      social: {
        facebook: 'https://facebook.com/MarcJustinAlberto',
        twitter: 'https://twitter.com/marc_alberto',
        github: 'https://github.com/MarcJustin1',
        linkedin: 'https://linkedin.com/in/marc-alberto'
      }
    }
  ];

  return (
    <Box py={12}>
      <Container maxW="7xl">
        <VStack spacing={8} align="stretch">
          <VStack spacing={3} textAlign="center">
            <Heading size="xl" color={textPrimary}>
              Get in Touch with Our Team
            </Heading>
            <Text fontSize="lg" color={textSecondary} maxW="2xl">
              Our dedicated support team is here to help you. Reach out to any of our team members directly.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mt={6}>
            {teamMembers.map((member, index) => (
              <Box
                key={index}
                bg={cardBg}
                border="1px"
                borderColor={borderColor}
                borderRadius="xl"
                p={6}
                _hover={{
                  transform: 'translateY(-4px)',
                  shadow: 'xl',
                  borderColor: 'blue.300'
                }}
                transition="all 0.3s"
              >
                <VStack spacing={4}>
                  <Box
                    boxSize="120px"
                    borderRadius="full"
                    overflow="hidden"
                    border="3px solid"
                    borderColor="blue.400"
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                    />
                  </Box>
                  <VStack spacing={1}>
                    <Heading size="md" color={textPrimary}>
                      {member.name}
                    </Heading>
                    <Text fontSize="sm" color="blue.500" fontWeight="semibold">
                      {member.role}
                    </Text>
                  </VStack>

                  <VStack spacing={2} w="full" align="start">
                    <Link
                      href={`mailto:${member.email}`}
                      _hover={{ textDecoration: 'none' }}
                    >
                      <HStack spacing={2} color={textSecondary} _hover={{ color: 'blue.500' }}>
                        <Icon as={HiMail} />
                        <Text fontSize="sm">{member.email}</Text>
                      </HStack>
                    </Link>

                    <Link
                      href={`tel:${member.phone}`}
                      _hover={{ textDecoration: 'none' }}
                    >
                      <HStack spacing={2} color={textSecondary} _hover={{ color: 'blue.500' }}>
                        <Icon as={HiPhone} />
                        <Text fontSize="sm">{member.phone}</Text>
                      </HStack>
                    </Link>
                  </VStack>

                  <HStack spacing={3} pt={2}>
                    <Link href={member.social.facebook} isExternal>
                      <Icon
                        as={FaFacebook}
                        boxSize={5}
                        color={textSecondary}
                        _hover={{ color: 'blue.500' }}
                      />
                    </Link>
                    <Link href={member.social.twitter} isExternal>
                      <Icon
                        as={FaTwitter}
                        boxSize={5}
                        color={textSecondary}
                        _hover={{ color: 'blue.400' }}
                      />
                    </Link>
                    <Link href={member.social.github} isExternal>
                      <Icon
                        as={FaGithub}
                        boxSize={5}
                        color={textSecondary}
                        _hover={{ color: 'gray.700' }}
                      />
                    </Link>
                    <Link href={member.social.linkedin} isExternal>
                      <Icon
                        as={FaLinkedin}
                        boxSize={5}
                        color={textSecondary}
                        _hover={{ color: 'blue.600' }}
                      />
                    </Link>
                  </HStack>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          <Box
            bg="blue.50"
            borderRadius="xl"
            p={8}
            textAlign="center"
            mt={8}
          >
            <VStack spacing={4}>
              <Heading size="md" color="blue.800">
                General Inquiries
              </Heading>
              <Text color="blue.700">
                For general questions, email us at{' '}
                <Link
                  href="mailto:support@trabahanap.com"
                  color="blue.600"
                  fontWeight="semibold"
                  _hover={{ textDecoration: 'underline' }}
                >
                  support@trabahanap.com
                </Link>
              </Text>
              <Text color="blue.700" fontSize="sm">
                We typically respond within 24 hours during business days
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactTeam;
