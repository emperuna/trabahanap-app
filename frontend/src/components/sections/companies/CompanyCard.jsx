import React from 'react';
import { Box, AspectRatio, VStack, Box as ChakraBox, Image, Badge } from '@chakra-ui/react';

export default function CompanyCard({ company }) {
  return (
    <Box
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius={0}
      bg="white"
      boxShadow="sm"
      _hover={{
        transform: 'translateY(-6px)',
        bg: 'blue.500',
        borderColor: 'blue.500',
        boxShadow: 'lg',
        color: 'white',
      }}
      transition="transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease"
      sx={{
        '&:hover img': {
          filter: 'brightness(0) invert(1) drop-shadow(0 1px 0 rgba(0,0,0,0.06))',
        },
      }}
    >
      <AspectRatio ratio={1} w="100%">
        <VStack align="stretch" justify="space-between" h="100%" spacing={0} p={3}>
          <ChakraBox flex="1" display="flex" alignItems="center" justifyContent="center" w="100%">
            <Image src={company.logo} alt={company.name} objectFit="contain" maxH={company.logoMaxH || '40px'} />
          </ChakraBox>

          <ChakraBox w="100%" display="flex" justifyContent="center" pt={2}>
            <Badge colorScheme="gray" variant="subtle" px={1} py={0.5} borderRadius="full" fontSize="9px" fontWeight="normal">
              {company.industry}
            </Badge>
          </ChakraBox>
        </VStack>
      </AspectRatio>
    </Box>
  );
}
