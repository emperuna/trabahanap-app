import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import {
  QuickStartGuide,
  AccountConfigGuide,
  TermsPoliciesGuide,
} from '../guides';

const GettingStartedSection = ({ items }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textPrimary = useColorModeValue('gray.900', 'gray.100');
  const textSecondary = useColorModeValue('gray.600', 'gray.400');
  const iconBg = useColorModeValue('blue.50', 'blue.900');
  const iconColor = useColorModeValue('blue.500', 'blue.300');

  const getGuideContent = (guideId) => {
    switch (guideId) {
      case 'quickstart':
        return <QuickStartGuide />;
      case 'config':
        return <AccountConfigGuide />;
      case 'terms':
        return <TermsPoliciesGuide />;
      default:
        return null;
    }
  };

  return (
    <Box mt={12}>
      <VStack align="stretch" spacing={6}>
        <Heading size="lg" color={textPrimary} textAlign="center">
          Getting Started
        </Heading>
        <Text 
          fontSize="sm" 
          color={textSecondary} 
          textAlign="center"
          maxW="2xl"
          mx="auto"
        >
          Get started with a curated collection of resources designed to help you hit the ground running
        </Text>

        <Accordion allowMultiple maxW="6xl" mx="auto" w="full">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              bg={cardBg}
              border="1px"
              borderColor={borderColor}
              borderRadius="lg"
              mb={4}
            >
              <AccordionButton
                py={4}
                px={6}
                _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
              >
                <HStack spacing={4} flex={1}>
                  <Flex
                    w={10}
                    h={10}
                    align="center"
                    justify="center"
                    rounded="lg"
                    bg={iconBg}
                  >
                    <Icon as={item.icon} boxSize={5} color={iconColor} />
                  </Flex>
                  <VStack align="start" spacing={1} flex={1}>
                    <Text fontWeight="semibold" color={textPrimary}>
                      {item.title}
                    </Text>
                    <Text fontSize="sm" color={textSecondary}>
                      {item.description}
                    </Text>
                  </VStack>
                </HStack>
                <AccordionIcon color={textSecondary} />
              </AccordionButton>
              <AccordionPanel pb={6} px={6}>
                <Box pt={4}>
                  {getGuideContent(item.guideId)}
                </Box>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Box>
  );
};

export default GettingStartedSection;
