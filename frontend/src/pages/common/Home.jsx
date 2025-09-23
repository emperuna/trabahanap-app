import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { GuestNavbar, Footer } from "../../components/common/layout";
import { Hero, Features, CTA, HowItWorks } from "../../components/sections/home";

const Home = () => {
  return (
    <Flex direction="column" minH="100vh">
      <GuestNavbar />
      <Box flex="1">
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </Box>
      <Footer />
    </Flex>
  );
};

export default Home;