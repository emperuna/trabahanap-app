import { Box, Heading, Text, Flex, Image } from "@chakra-ui/react";
import BusinessImage from "../../../assets/images/BusinessImage.jpg";

function MissionSection() {
  return (
    <Box
      w="full"
      py={{ base: 10, md: 16 }}
      px={{ base: 4, md: 12 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        maxW="7xl"
        mx="auto"
        w="full"
        gap={10}
      >
        {/* Left: Mission text */}
        <Box flex="1" maxW="2xl">
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            mb={4}
            color="blue.600"
            lineHeight="1.1"
          >
            Our Mission
          </Heading>
          <Box h={{ base: 4, md: 6 }} />
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.700"
            maxW="2xl"
            textAlign="justify"
          >
            Our mission at TrabaHanap is to empower individuals and organizations
            by providing a seamless, user-friendly, and accessible job-matching
            platform. We are committed to helping job seekers discover
            opportunities that align with their skills and aspirations, while
            enabling employers to connect with diverse talent efficiently and
            effectively. Through innovation, inclusivity, and trust, we aim to
            break barriers, create meaningful connections, and drive growth for
            both people and businesses worldwide.
          </Text>
        </Box>
        {/* Right: Business image with blue rounded background */}
        <Box flex="1" display="flex" alignItems="center" justifyContent="center">
          <Box
            position="relative"
            w={{ base: "100%", md: "540px" }}
            h={{ base: "auto", md: "340px" }}
          >
            {/* Blue square overlapping top left */}
            <Box
              position="absolute"
              top="-32px"
              left="-32px"
              w="90%"
              h="90%"
              bg="blue.600"
              borderRadius="3xl"
              zIndex="0"
            />
            <Image
              src={BusinessImage}
              alt="Business Team"
              w="100%"
              h={{ base: "auto", md: "340px" }}
              objectFit="cover"
              borderRadius="2xl"
              boxShadow="lg"
              position="relative"
              zIndex="1"
            />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default MissionSection;