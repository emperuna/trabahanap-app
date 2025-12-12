import React from 'react';
import { Box, VStack, Text, SimpleGrid, Icon } from '@chakra-ui/react';
import { 
  HiSearch,
  HiCog,
  HiChat,
  HiVideoCamera,
  HiChartBar,
  HiMap,
  HiCurrencyDollar,
  HiStar
} from 'react-icons/hi';

const features = [
  { name: 'Advanced Search', icon: HiSearch, color: 'blue.400' },
  { name: 'AI Matching', icon: HiCog, color: 'blue.400' },
  { name: 'Real-time Chat', icon: HiChat, color: 'green.400' },
  { name: 'Video Interviews', icon: HiVideoCamera, color: 'red.400' },
  { name: 'Skill Assessment', icon: HiChartBar, color: 'orange.400' },
  { name: 'Career Path', icon: HiMap, color: 'teal.400' },
  { name: 'Salary Analytics', icon: HiCurrencyDollar, color: 'yellow.400' },
  { name: 'Company Reviews', icon: HiStar, color: 'pink.400' },
];

const FeaturesPreview = () => {
  return (
    <Box
      bg="whiteAlpha.200"
      backdropFilter="blur(20px)"
      borderRadius="2xl"
      p={8}
      border="1px solid"
      borderColor="whiteAlpha.300"
      maxW="3xl"
      w="full"
    >
      <VStack spacing={6}>
        <VStack spacing={2}>
          <Text 
            fontSize="lg" 
            fontWeight="bold" 
            color="white"
            textShadow="0 1px 3px rgba(0,0,0,0.3)"
          >
            What's Coming Next
          </Text>
          <Text fontSize="md" color="whiteAlpha.800">
            Exciting features we're building for you
          </Text>
        </VStack>
        
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} w="full">
          {features.map((feature, index) => (
            <VStack
              key={index}
              p={4}
              bg="whiteAlpha.200"
              borderRadius="xl"
              border="1px solid"
              borderColor="whiteAlpha.300"
              spacing={3}
              transition="all 0.3s ease"
              _hover={{
                transform: 'translateY(-4px)',
                bg: 'whiteAlpha.300'
              }}
            >
              <Box
                p={2}
                bg="whiteAlpha.300"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon 
                  as={feature.icon} 
                  boxSize={6} 
                  color={feature.color}
                />
              </Box>
              <Text 
                fontSize="sm" 
                color="white" 
                fontWeight="medium"
                textAlign="center"
                lineHeight="short"
              >
                {feature.name}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default FeaturesPreview;