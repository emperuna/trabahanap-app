import React from "react";
import { 
  Box, 
  Text, 
  VStack, 
  HStack,
  Flex, 
  Image, 
  SimpleGrid 
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

// Import team member images and social media icons
import AlbertoImg from "../../../assets/images/Alberto.png";
import GarinImg from "../../../assets/images/Garin.png";
import MesiasImg from "../../../assets/images/Mesias.png";
import AquinoImg from "../../../assets/images/Aquino.png";
import TwitterLogo from "../../../assets/icons/Twitter.svg";
import FacebookLogo from "../../../assets/icons/Facebook.svg";
import GithubLogo from "../../../assets/icons/Github.svg";
import LinkedinLogo from "../../../assets/icons/Linkedin.svg";
import TrabaHanapLogo from "../../../assets/logo/TrabaHanap-Logo.svg";

const teamMembers = [
  {
    id: 1,
    name: "Jeremy Garin",
    role: "Fullstack Developer",
    image: GarinImg,
    social: {
      facebook: "https://facebook.com/SupremeNovaAE",
      twitter: "https://twitter.com/emperuna",
      github: "https://github.com/emperuna",
      linkedin: "https://linkedin.com/in/jeremy-garin-b9299036a"
    }
  },
  {
    id: 2,
    name: "Jose Aquino III",
    role: "Backend Specialist",
    image: AquinoImg,
    social: {
      facebook: "https://facebook.com/aquinojxse",
      twitter: "https://twitter.com/jose_aquino",
      github: "https://github.com/fyodorrrrr",
      linkedin: "https://linkedin.com/in/jose-aquino"
    }
  },
  {
    id: 3,
    name: "Ian Patrick Mesias",
    role: "Tester & QA",
    image: MesiasImg,
    social: {
      facebook: "https://facebook.com/mesias02",
      twitter: "https://twitter.com/ian_mesias",
      github: "https://github.com/imPickleRiick",
      linkedin: "https://linkedin.com/in/ian-mesias"
    }
  },
  {
    id: 4,
    name: "Marc Alberto",
    role: "Frontend Specialist",
    image: AlbertoImg,
    social: {
      facebook: "https://facebook.com/MarcJustinAlberto",
      twitter: "https://twitter.com/marc_alberto",
      github: "https://github.com/MarcJustin1",
      linkedin: "https://linkedin.com/in/marc-alberto"
    }
  },
];

function SocialIcon({ src, alt, href, isBlueVersion = false }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Image
      src={src}
      alt={alt}
      boxSize={5}
      cursor="pointer"
      filter={isBlueVersion ? "brightness(0) invert(1)" : ""}
      transition={isBlueVersion ? "transform 0.2s ease" : "all 0.3s ease"}
      _hover={{ transform: "scale(1.1)" }}
      _groupHover={!isBlueVersion ? { filter: "brightness(0) invert(1)" } : {}}
      onClick={handleClick}
    />
  );
}

// TeamCard Component
function TeamCard({ member }) {
  return (
    <Box
      w="260px"
      h="360px"
      position="relative"
      role="group"
      cursor="pointer"
    >
      {/* Base Card (Light Blue Background) */}
      <Box
        w="100%"
        h="100%"
        borderRadius="xl"
        bgGradient="linear(135deg, blue.50 0%, blue.100 100%)"
        boxShadow="sm"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        position="absolute"
        top="0"
        left="0"
        zIndex={1}
        transition="all 0.3s ease"
        _groupHover={{
          transform: "scale(1.06)",
          boxShadow: "lg",
        }}
      >
        {/* Header with Logo and Social Icons */}
        <Flex px={6} pt={5} justify="space-between" align="center">
          <Image
            src={TrabaHanapLogo}
            alt="TrabaHanap Logo"
            boxSize={7}
            transition="filter 0.3s ease"
            _groupHover={{
              filter: "brightness(0) invert(1)"
            }}
          />
          <HStack spacing={3}>
            <SocialIcon 
              src={FacebookLogo} 
              alt="Facebook" 
              href={member.social.facebook} 
            />
            <SocialIcon 
              src={TwitterLogo} 
              alt="Twitter" 
              href={member.social.twitter} 
            />
            <SocialIcon 
              src={GithubLogo} 
              alt="Github" 
              href={member.social.github} 
            />
            <SocialIcon 
              src={LinkedinLogo} 
              alt="Linkedin" 
              href={member.social.linkedin} 
            />
          </HStack>
        </Flex>

        {/* Member Info */}
        <VStack align="start" spacing={1} px={6} pt={4} pb={2}>
          <Text 
            fontSize="lg" 
            fontWeight="bold" 
            color="blue.600"
            transition="color 0.3s ease"
            _groupHover={{
              color: "white"
            }}
          >
            {member.name}
          </Text>
          <Text 
            fontSize="sm" 
            color="blue.600"
            transition="color 0.3s ease"
            _groupHover={{
              color: "white"
            }}
          >
            {member.role}
          </Text>
        </VStack>

        {/* Member Image */}
        <Box
          flex={1}
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          mt={2}
          mb={0}
          px={0}
          position="relative"
          zIndex={2}
          minH="160px"
        >
          <Image
            src={member.image}
            alt={member.name}
            w="100%"
            h="auto"
            objectFit="contain"
            position="absolute"
            bottom="0"
            left="50%"
            transform="translateX(-50%)"
            bg="transparent"
          />
        </Box>
      </Box>

      {/* Hover Overlay (Blue Background) */}
      <Box
        w="100%"
        h="100%"
        borderRadius="xl"
        bgGradient="linear(135deg, blue.500 0%, blue.600 100%)"
        boxShadow="lg"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        position="absolute"
        top="0"
        left="0"
        zIndex={2}
        opacity={0}
        transform="scale(1)"
        transition="all 0.3s ease"
        _groupHover={{
          opacity: 1,
          transform: "scale(1.06)",
        }}
      >
        {/* Header with Logo and Social Icons - Blue Version */}
        <Flex px={6} pt={5} justify="space-between" align="center">
          <Image
            src={TrabaHanapLogo}
            alt="TrabaHanap Logo"
            boxSize={7}
            filter="brightness(0) invert(1)"
          />
          <HStack spacing={3}>
            <SocialIcon 
              src={FacebookLogo} 
              alt="Facebook" 
              href={member.social.facebook} 
              isBlueVersion={true}
            />
            <SocialIcon 
              src={TwitterLogo} 
              alt="Twitter" 
              href={member.social.twitter} 
              isBlueVersion={true}
            />
            <SocialIcon 
              src={GithubLogo} 
              alt="Github" 
              href={member.social.github} 
              isBlueVersion={true}
            />
            <SocialIcon 
              src={LinkedinLogo} 
              alt="Linkedin" 
              href={member.social.linkedin} 
              isBlueVersion={true}
            />
          </HStack>
        </Flex>

        {/* Member Info - Blue Version */}
        <VStack align="start" spacing={1} px={6} pt={4} pb={2}>
          <Text 
            fontSize="lg" 
            fontWeight="bold" 
            color="white"
          >
            {member.name}
          </Text>
          <Text 
            fontSize="sm" 
            color="white"
          >
            {member.role}
          </Text>
        </VStack>

        {/* Member Image - Blue Version */}
        <Box
          flex={1}
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          mt={2}
          mb={0}
          px={0}
          position="relative"
          zIndex={2}
          minH="160px"
        >
          <Image
            src={member.image}
            alt={member.name}
            w="100%"
            h="auto"
            objectFit="contain"
            position="absolute"
            bottom="0"
            left="50%"
            transform="translateX(-50%)"
            bg="transparent"
          />
        </Box>
      </Box>
    </Box>
  );
}

function Team() {
  return (
    <Box py={16} px={8} bg="white">
      <Box mb={8}>
        <Text
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="extrabold"
          color="blue.600"
          textAlign="center"
        >
          Meet the team
        </Text>
      </Box>
      <SimpleGrid 
        spacing={8} 
        justify="center" 
        align="center" 
        columns={{ base: 1, sm: 2, md: 4 }}
      >
        {teamMembers.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Team;
