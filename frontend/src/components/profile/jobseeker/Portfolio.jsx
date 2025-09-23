import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  IconButton,
  Flex,
  Badge,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiPencil,
  HiTrash,
  HiPlus,
  HiShoppingBag,
  HiAcademicCap,
} from 'react-icons/hi';

const Portfolio = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.700', 'gray.300');
  const primaryColor = '#153CF5';

  const portfolioItems = [
    {
      id: 1,
      title: 'Ecommerce Website',
      type: 'Project',
      category: 'project',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      gradient: 'linear(135deg, purple.500, blue.500)'
    },
    {
      id: 2,
      title: 'Mobile App Design',
      type: 'Project',
      category: 'project',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      gradient: 'linear(135deg, blue.500, teal.500)'
    },
    {
      id: 3,
      title: 'Basic Programming',
      type: 'Certificate',
      category: 'certificate',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      gradient: 'linear(135deg, green.500, blue.500)'
    },
    {
      id: 4,
      title: 'Web Development',
      type: 'Certificate',
      category: 'certificate',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      gradient: 'linear(135deg, orange.500, red.500)'
    }
  ];

  return (
    <VStack spacing={6} align="stretch">
      {/* Add Project Button */}
      <Flex justify="flex-end">
        <Button
          leftIcon={<HiPlus />}
          bg={primaryColor}
          color="white"
          size="sm"
          borderRadius="lg"
          _hover={{
            bg: '#0F2ECC',
            transform: 'translateY(-1px)',
          }}
          _active={{
            transform: 'translateY(0px)',
          }}
          transition="all 0.2s ease"
        >
          Add Project
        </Button>
      </Flex>

      {/* Portfolio Grid */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {portfolioItems.map((item) => (
          <Card 
            key={item.id}
            bg={cardBg} 
            borderRadius="xl" 
            border="1px" 
            borderColor={borderColor}
            boxShadow="sm"
            overflow="hidden"
            _hover={{
              boxShadow: 'md',
              transform: 'translateY(-2px)',
            }}
            transition="all 0.2s ease"
          >
            {/* Project Preview */}
            <Box
              bgGradient={item.gradient}
              aspectRatio="16/9"
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                bg="whiteAlpha.200"
                backdropFilter="blur(10px)"
                borderRadius="lg"
                p={4}
                textAlign="center"
                color="white"
              >
                <Box
                  w={12}
                  h={12}
                  bg="whiteAlpha.300"
                  borderRadius="md"
                  mx="auto"
                  mb={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {item.category === 'project' ? (
                    <HiShoppingBag size={20} />
                  ) : (
                    <HiAcademicCap size={20} />
                  )}
                </Box>
                <Text fontSize="sm" fontWeight="semibold" opacity={0.9}>
                  {item.category === 'project' ? 'Project' : 'Certificate'}
                </Text>
              </Box>
            </Box>

            <CardBody p={6}>
              <Flex justify="space-between" align="start" mb={4}>
                <Box flex="1">
                  <Heading size="lg" color={textColor} mb={2}>
                    {item.title}
                  </Heading>
                  <Badge
                    bg={primaryColor}
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="medium"
                    mb={4}
                  >
                    {item.type}
                  </Badge>
                </Box>
                
                <HStack spacing={2}>
                  <IconButton
                    icon={<HiTrash />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    aria-label="Delete portfolio item"
                    _hover={{
                      bg: 'red.50',
                    }}
                  />
                  <IconButton
                    icon={<HiPencil />}
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    aria-label="Edit portfolio item"
                    _hover={{
                      bg: 'blue.50',
                    }}
                  />
                </HStack>
              </Flex>

              <Text 
                color={mutedColor} 
                fontSize="md" 
                lineHeight="relaxed"
              >
                {item.description}
              </Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Portfolio;