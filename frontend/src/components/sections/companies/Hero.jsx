import React from 'react';
import { Box, SimpleGrid, VStack, Text, Heading, Box as ChakraBox, Button, Center, Image } from '@chakra-ui/react';
import BusinessIllustration from '../../../assets/images/BusinessIllustration.svg';

export default function CompaniesHero() {
  return (
    <Box mb={0} borderRadius="lg" overflow="hidden" bg="transparent" color="gray.800" p={{ base: 2, md: 4 }}>
  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 4 }} alignItems="center">
        <VStack align="start" spacing={4}>
          <Text fontSize="sm" textTransform="uppercase" letterSpacing="widest" opacity={0.8}>
            A Hub For Job And Experts
          </Text>
          <Heading as="h1" size="2xl" lineHeight="1.05" fontWeight="extrabold">
            Let <Text as="span" color="blue.600">TrabaHanap</Text> ensure your growth
          </Heading>
          <Text maxW={{ base: 'full', md: 'md' }} color="gray.600">
            We partner with leading organizations to deliver talent solutions that scale. See how we've helped
            companies accelerate hiring and grow teams across the region.
          </Text>
          <ChakraBox>
            <Button colorScheme="blue" variant="solid" mr={3}>
              Contact Us
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Learn more
            </Button>
          </ChakraBox>
        </VStack>

        <Center>
          <Image src={BusinessIllustration} alt="Business illustration" maxW={{ base: '70%', md: '70%', lg: '520px' }} objectFit="contain" />
        </Center>
      </SimpleGrid>
    </Box>
  );
}
