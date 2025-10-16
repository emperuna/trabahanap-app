import React from 'react';
import { Box, Center, VStack, Heading, Text, Button } from '@chakra-ui/react';

export default function CompaniesCTA() {
  return (
    <Box mt={8} mb={8} py={10} bg="transparent">
      <Center>
        <VStack spacing={4} textAlign="center" maxW="4xl">
          <Heading size="lg">Want your brand featured here?</Heading>
          <Text color="gray.600">Join the growing list of partners working with TrabaHanap to build high-performing teams. Let's explore a partnership tailored to your hiring needs.</Text>
          <Box>
            <Button colorScheme="blue" mr={3}>Get in touch</Button>
            <Button variant="ghost" colorScheme="blue">See partnership options</Button>
          </Box>
        </VStack>
      </Center>
    </Box>
  );
}
