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
      bgGradient="linear(120deg, brand.500 0%, brand.500 50%, blue.600 50%, blue.600 66.67%, blue.700 66.67%, blue.700 83.33%, blue.800 83.33%, blue.800 100%)" p={8} color="white"
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
        <Box flex="1" color="white" maxW="2xl">
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            mb={4}
            lineHeight="1.1"
            maxW="2xl"
          >
            Great Companies <br /> trust in us
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="whiteAlpha.900"
            maxW="2xl"
          >
            We partner with trusted companies across different industries to bring you a wide range of job openings. 
            From startups to established enterprises, Trabahanap is where top talent meets top employers.
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
                  h={company.name === "TESLA" ? 16 : 8}
                  maxW={company.name === "TESLA" ? "140px" : "100px"}
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