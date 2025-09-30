import { Box, Heading, Text, Flex, Image } from "@chakra-ui/react";
import TrabaHanapLogoWhite from "../../../assets/logo/TrabaHanap-Logo-White.svg";

function TrustSectionHeader() {
  return (
    <Box
      w="full"
      py={{ base: 4, md: 8 }}
      px={{ base: 4, md: 12 }}
      mb={{ base: 8, md: 16 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        maxW="7xl"
        mx="auto"
        gap={14}
        w="full"
      >
        <Box
          bg="#174AFF"
          borderRadius="2xl"
          p={{ base: 6, md: 12 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="lg"
          mb={{ base: 4, md: 0 }}
          minW={{ base: 32, md: 56 }}
          minH={{ base: 32, md: 56 }}
        >
          <Image
            src={TrabaHanapLogoWhite}
            alt="TrabaHanap Logo"
            boxSize={{ base: 28, md: 44 }}
          />
        </Box>
        <Box flex="1">
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
            color="slate.900"
            fontWeight="extrabold"
            mb={4}
            textAlign={{ base: "center", md: "left" }}
            lineHeight="1.1"
          >
            Find Your{" "}
            <Text as="span" color="blue.600" fontSize="inherit">
              Dream Job
            </Text>{" "}
            in Just One Click!
          </Heading>
          <Text
            color="gray.400"
            fontSize={{ base: "lg", md: "xl" }}
            textAlign={{ base: "center", md: "left" }}
            maxW="2xl"
            mb={2}
          >
            Trabahanap makes job hunting simple and accessible. Whether you’re a fresh graduate or an experienced professional, 
            our platform connects you with opportunities that match your skills, passion, and career goals.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default TrustSectionHeader;