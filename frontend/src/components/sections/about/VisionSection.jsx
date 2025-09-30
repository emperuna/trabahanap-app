import { Box, Heading, Text, Flex, Image } from "@chakra-ui/react";
import GlobalMap from "../../../assets/images/world.svg"; // Use your global map image here

function VisionSection() {
  return (
    <Box
      w="full"
      bg="white"
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
        {/* Left: Global map diagram */}
        <Box flex="1" display="flex" alignItems="center" justifyContent="center" bg="transparent">
          <Image
            src={GlobalMap}
            alt="Global Map"
            maxW={{ base: "100%", md: "600px" }}
            w="100%"
            h={{ base: "auto", md: "500px" }}
            objectFit="contain"
            borderRadius="xl"
            filter="invert(34%) sepia(99%) saturate(749%) hue-rotate(191deg) brightness(97%) contrast(101%)" // blue.500 filter
          />
        </Box>
        {/* Right: Vision text */}
        <Box flex="1" maxW="2xl">
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            mb={4}
            color="blue.600"
            lineHeight="1.1"
          >
            Our Vision
          </Heading>
          {/* Added spacing below the heading */}
          <Box h={{ base: 4, md: 6 }} />
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.700"
            maxW="2xl"
            textAlign="justify"
          >
            At TrabaHanap, we envision a future where opportunities are no longer limited by borders, circumstances, or access. We strive to create a transformative platform that empowers job seekers to find not just employment, but careers that match their skills, passions, and aspirations. By leveraging innovation and technology, we aim to bridge the gap between talent and opportunity, ensuring that every individual—whether in bustling cities or remote communities—has equal access to meaningful work.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default VisionSection;