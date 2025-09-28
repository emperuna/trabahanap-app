import { Box, Heading, Text, Flex, SimpleGrid, Image } from "@chakra-ui/react";
import MetaLogo from "../../../assets/logo/meta.svg";
import GoogleLogo from "../../../assets/logo/google.svg";
import AccentureLogo from "../../../assets/logo/accenture.svg";
import SlackLogo from "../../../assets/logo/slack.svg";
import TeslaLogo from "../../../assets/logo/tesla.svg";
import MicrosoftLogo from "../../../assets/logo/microsoft.svg";

const companies = [
  { name: "Meta", logo: MetaLogo },
  { name: "Google", logo: GoogleLogo },
  { name: "accenture", logo: AccentureLogo },
  { name: "slack", logo: SlackLogo },
  { name: "TESLA", logo: TeslaLogo },
  { name: "Microsoft", logo: MicrosoftLogo },
];

function CompaniesSection() {
  return (
    <Box
      w="full"
      bg="#174AFF"
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
        {/* Left: Heading and description */}
        <Box flex="1" color="white" maxW="2xl"> {/* Increased max width */}
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            mb={4}
            lineHeight="1.1"
            maxW="2xl" // Increased max width
          >
            Great Companies <br /> trust in us
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="whiteAlpha.900"
            maxW="2xl" // Increased max width
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Box>
        {/* Right: Companies grid */}
        <Box flex="1" display="flex" alignItems="center" justifyContent="center">
          <SimpleGrid
            columns={3}
            spacing={0}
            bg="white"
            borderRadius="xl"
            boxShadow="md"
            minW={{ base: "300px", md: "420px" }}
            maxW="420px"
            w="full"
            overflow="hidden"
          >
            {companies.map((company, idx) => (
              <Flex
                key={company.name}
                align="center"
                justify="center"
                py={6}
                px={4}
                borderBottom={idx < 3 ? "1px solid #E5E7EB" : undefined}
                borderRight={idx % 3 !== 2 ? "1px solid #E5E7EB" : undefined}
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  h={company.name === "TESLA" ? 16 : 8} // Tesla logo much bigger
                  maxW={company.name === "TESLA" ? "140px" : "100px"} // Increase max width for Tesla
                  objectFit="contain"
                />
              </Flex>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  );
}

export default CompaniesSection;