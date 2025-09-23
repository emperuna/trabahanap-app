import React from 'react';
import {
  VStack,
  HStack,
  Heading,
  Text,
  Avatar,
  Badge,
  Flex,
  Button,
  Icon,
} from '@chakra-ui/react';
import {
  HiLocationMarker,
  HiPencil,
  HiDownload,
  HiShare,
} from 'react-icons/hi';

const ProfileHeader = ({ profileData }) => {
  const primaryColor = '#153CF5';

  return (
    <VStack spacing={6} w="full">
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        align={{ base: 'center', md: 'start' }}
        gap={{ base: 6, md: 8 }}
        w="full"
      >
        {/* Avatar Section */}
        <Avatar
          size="2xl"
          src={profileData.profileImage}
          name={profileData.name}
          border="4px solid"
          borderColor="whiteAlpha.300"
          boxShadow="0 0 30px rgba(255, 255, 255, 0.3)"
          w={{ base: 24, md: 32 }}
          h={{ base: 24, md: 32 }}
          flexShrink={0}
        />
        
        {/* Content Section */}
        <VStack 
          align={{ base: 'center', md: 'start' }} 
          spacing={4} 
          flex="1"
          textAlign={{ base: 'center', md: 'left' }}
          w="full"
        >
          <VStack align={{ base: 'center', md: 'start' }} spacing={2}>
            <Text fontSize={{ base: 'md', md: 'lg' }} opacity={0.9}>
              Welcome back! 👋
            </Text>
            <Heading 
              size={{ base: 'xl', md: '2xl' }} 
              fontWeight="bold" 
              color="white"
              lineHeight="shorter"
            >
              {profileData.name}
            </Heading>
            <Badge 
              bg="whiteAlpha.200" 
              color="white" 
              px={4} 
              py={2} 
              borderRadius="full"
              fontSize="sm"
              fontWeight="medium"
            >
              Job Seeker
            </Badge>
          </VStack>
          
          <HStack spacing={2} opacity={0.9} justify={{ base: 'center', md: 'start' }}>
            <HiLocationMarker size={18} />
            <Text fontSize="md">
              {profileData.location}
            </Text>
          </HStack>
          
          <Text 
            fontSize={{ base: 'sm', md: 'md' }}
            opacity={0.8}
            lineHeight="relaxed"
            maxW={{ base: 'full', md: '2xl' }}
            noOfLines={{ base: 2, md: 3 }}
          >
            {profileData.aboutMe}
          </Text>
        </VStack>
      </Flex>

      {/* Action Buttons */}
      <HStack 
        spacing={4} 
        w="full" 
        justify={{ base: 'center', md: 'start' }}
        flexWrap="wrap"
      >
        <Button
          leftIcon={<Icon as={HiPencil} />}
          bg="whiteAlpha.200"
          color="white"
          size="md"
          borderRadius="lg"
          fontWeight="semibold"
          _hover={{
            bg: 'whiteAlpha.300',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
          _active={{
            transform: 'translateY(0px)',
          }}
          transition="all 0.2s ease"
        >
          Edit Profile
        </Button>
        
        <Button
          leftIcon={<Icon as={HiDownload} />}
          variant="outline"
          borderColor="whiteAlpha.300"
          color="white"
          size="md"
          borderRadius="lg"
          fontWeight="semibold"
          _hover={{
            bg: 'whiteAlpha.200',
            borderColor: 'whiteAlpha.400',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
          _active={{
            transform: 'translateY(0px)',
          }}
          transition="all 0.2s ease"
        >
          Download CV
        </Button>
        
        <Button
          leftIcon={<Icon as={HiShare} />}
          variant="ghost"
          color="white"
          size="md"
          borderRadius="lg"
          fontWeight="semibold"
          _hover={{
            bg: 'whiteAlpha.200',
            transform: 'translateY(-1px)',
          }}
          _active={{
            transform: 'translateY(0px)',
          }}
          transition="all 0.2s ease"
        >
          Share Profile
        </Button>
      </HStack>
    </VStack>
  );
};

export default ProfileHeader;