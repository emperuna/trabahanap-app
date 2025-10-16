import React from 'react';
import { Box, Container, SimpleGrid, Center, VStack, Heading, Text, chakra } from '@chakra-ui/react';

function formatNumberWithBlueCommas(value) {
  if (typeof value !== 'number') return value;
  const formatted = new Intl.NumberFormat('en-US').format(value);
  return formatted.split('').map((ch, i) =>
    ch === ',' ? (
      <chakra.span key={i} color="blue.400">{ch}</chakra.span>
    ) : (
      <chakra.span key={i}>{ch}</chakra.span>
    )
  );
}

export default function StatsBand() {
  const stats = [
    { id: 'jobs', value: 52015, label: 'Jobs posted' },
    { id: 'hires', value: 24325, label: 'Successful hires' },
    { id: 'verified', value: 1532, label: 'Verified companies' },
    { id: 'visitors', value: '1.2M', label: 'Monthly visitors' },
  ];

  return (
    <Box w="100%" bg="blue.600" color="white" py={{ base: 6, md: 8 }}>
      <Container maxW="8xl">
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} alignItems="center">
          {stats.map((s) => (
            <Center key={s.id}>
              <VStack spacing={1}>
                <Heading as="div" size="2xl" fontWeight="extrabold" color="white">
                  {typeof s.value === 'number' ? formatNumberWithBlueCommas(s.value) : s.value}
                </Heading>
                <Text fontSize="sm" color="whiteAlpha.850">{s.label}</Text>
              </VStack>
            </Center>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
