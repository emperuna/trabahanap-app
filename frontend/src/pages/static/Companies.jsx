import React from 'react';
import { Box, Flex, Container, Heading, Text, Center, VStack } from '@chakra-ui/react';
import { Navbar, Footer } from '../../components/common/layout';
import CompaniesHero from '../../components/sections/companies/Hero';
import StatsBand from '../../components/sections/companies/StatsBand';
import PartnersGrid from '../../components/sections/companies/PartnersGrid';
import CompaniesCTA from '../../components/sections/companies/CTA';

// Use real logos from assets/logo
import AccentureLogo from '../../assets/logo/Accenture.svg';
import GoogleLogo from '../../assets/logo/google.svg';
import MetaLogo from '../../assets/logo/Meta.svg';
import MicrosoftLogo from '../../assets/logo/Microsoft.svg';
import SlackLogo from '../../assets/logo/Slack.svg';
import TeslaLogo from '../../assets/logo/Tesla.svg';
import AdidasLogo from '../../assets/logo/Adidas.svg';
import AmazonLogo from '../../assets/logo/Amazon.svg';
import SamsungLogo from '../../assets/logo/Samsung.svg';
import SonyLogo from '../../assets/logo/Sony.svg';
import ToyotaLogo from '../../assets/logo/Toyota.svg';
import CodechumLogo from '../../assets/logo/Codechum.svg';
import BDOLogo from '../../assets/logo/BDO.svg';
import IBMLogo from '../../assets/logo/IBM.svg';
import EbayLogo from '../../assets/logo/Ebay.svg';

const sampleCompanies = [
  { id: 1, name: 'Accenture', logo: AccentureLogo, industry: 'Consulting' },
  { id: 2, name: 'Google', logo: GoogleLogo, industry: 'Technology' },
  { id: 3, name: 'Meta', logo: MetaLogo, industry: 'Technology' },
  { id: 4, name: 'Microsoft', logo: MicrosoftLogo, industry: 'Technology' },
  { id: 5, name: 'Slack', logo: SlackLogo, industry: 'Communication' },
  { id: 6, name: 'Tesla', logo: TeslaLogo, industry: 'Automotive', logoMaxH: '100px' },
  { id: 7, name: 'Adidas', logo: AdidasLogo, industry: 'Retail', logoMaxH: '80px' },
  { id: 8, name: 'Amazon', logo: AmazonLogo, industry: 'Retail', logoMaxH: '28px' },
  { id: 9, name: 'Samsung', logo: SamsungLogo, industry: 'Electronics', logoMaxH: '16px' },
  { id: 10, name: 'Sony', logo: SonyLogo, industry: 'Electronics', logoMaxH: '100px' },
  { id: 11, name: 'Toyota', logo: ToyotaLogo, industry: 'Automotive', logoMaxH: '72px' },
  { id: 12, name: 'CodeChum', logo: CodechumLogo, industry: 'Tech', logoMaxH: '28px' },
  { id: 13, name: 'BDO', logo: BDOLogo, industry: 'Finance', logoMaxH: '28px' },
  { id: 14, name: 'IBM', logo: IBMLogo, industry: 'Technology', logoMaxH: '28px' },
  { id: 15, name: 'Ebay', logo: EbayLogo, industry: 'E-commerce', logoMaxH: '28px' },
];

const Companies = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Box flex="1" bg={['white', 'gray.50']} py={0}>
        <Container maxW="8xl" pt={0}>
          <CompaniesHero />
        </Container>

        <StatsBand />

        <Container maxW="8xl" pt={0}>
          <Center mb={8} mt={{ base: 6, md: 10 }}>
            <VStack spacing={3}>
              <Heading size="lg">Our Partners</Heading>
              <Text color="gray.600">We are proud of contributing to the success of the world's leading brands</Text>
            </VStack>
          </Center>

          <PartnersGrid companies={sampleCompanies} />

          <CompaniesCTA />
        </Container>
      </Box>

      <Footer />
    </Flex>
  );
};

export default Companies;
