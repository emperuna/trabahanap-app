import React from 'react';
import {
  Card,
  CardBody,
  VStack,
  HStack,
  Heading,
  Text,
  Avatar,
  Button,
  Icon,
  Divider,
} from '@chakra-ui/react';
import {
  HiCog,
  HiMail,
  HiPhone,
  HiLocationMarker,
} from 'react-icons/hi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const ProfileCard = ({ profileData, theme, onEditProfile }) => (
  <Card
    bg={theme.cardBg}
    borderRadius="2xl"
    border="1px"
    borderColor={theme.borderColor}
    w="full"
    boxShadow="md"
  >
    <CardBody p={6}>
      <VStack spacing={4}>
        {/* Avatar & Name */}
        <Avatar
          size="2xl"
          name={`${profileData.firstName} ${profileData.lastName}`}
          bg={theme.accentColor}
          color="white"
          boxShadow="lg"
        />
        
        <VStack spacing={1} textAlign="center">
          <Heading size="md" color={theme.textColor}>
            {profileData.firstName} {profileData.lastName}
          </Heading>
          <Text fontSize="sm" color={theme.mutedColor} fontWeight="medium">
            {profileData.title}
          </Text>
          <HStack spacing={2} mt={2}>
            <Icon as={HiLocationMarker} color={theme.mutedColor} boxSize={4} />
            <Text fontSize="xs" color={theme.mutedColor}>
              {profileData.location}
            </Text>
          </HStack>
        </VStack>

        <Divider />

        {/* Contact Info */}
        <VStack spacing={2} w="full" align="start">
          <HStack spacing={2} fontSize="xs">
            <Icon as={HiMail} color={theme.accentColor} boxSize={4} />
            <Text color={theme.mutedColor} noOfLines={1}>
              {profileData.email}
            </Text>
          </HStack>
          <HStack spacing={2} fontSize="xs">
            <Icon as={HiPhone} color={theme.accentColor} boxSize={4} />
            <Text color={theme.mutedColor}>
              {profileData.phoneNumber}
            </Text>
          </HStack>
        </VStack>

        <Divider />

        {/* Social Links */}
        <HStack spacing={3} justify="center" w="full">
          <Button
            as="a"
            href={`https://${profileData.socialLinks.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            variant="ghost"
            colorScheme="linkedin"
            leftIcon={<FaLinkedin />}
            fontSize="xs"
          >
            LinkedIn
          </Button>
          <Button
            as="a"
            href={`https://${profileData.socialLinks.github}`}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            variant="ghost"
            colorScheme="gray"
            leftIcon={<FaGithub />}
            fontSize="xs"
          >
            GitHub
          </Button>
        </HStack>

        <Divider />

        {/* Edit Button */}
        <Button
          leftIcon={<HiCog />}
          colorScheme="blue"
          variant="outline"
          size="sm"
          w="full"
          onClick={onEditProfile}
          borderRadius="lg"
        >
          Edit Profile
        </Button>
      </VStack>
    </CardBody>
  </Card>
);

export default ProfileCard;