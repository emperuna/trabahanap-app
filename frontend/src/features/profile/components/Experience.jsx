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
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiPencil,
  HiTrash,
  HiClock,
  HiPlus,
} from 'react-icons/hi';

const Experience = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const primaryColor = '#153CF5';

  const experiences = [
    {
      id: 1,
      title: 'Jr Software Engineer',
      company: 'Meta',
      duration: 'Jan 2022 - Sep 2025',
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ]
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'Tesla',
      duration: 'Mar 2020 - Dec 2021',
      description: [
        'Design intuitive user interfaces and user experiences for automotive technology platforms. Conduct user research and create wireframes, prototypes, and design systems. Work closely with engineering teams to ensure design implementation meets standards.',
        'Lead design workshops and collaborate with product managers to define user requirements. Create comprehensive design documentation and maintain design consistency across all platforms.'
      ]
    }
  ];

  return (
    <VStack spacing={6} align="stretch">
      {/* Add Experience Button */}
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
          Add Experience
        </Button>
      </Flex>

      {/* Experience Cards */}
      {experiences.map((exp) => (
        <Card 
          key={exp.id}
          bg={cardBg} 
          borderRadius="xl" 
          border="1px" 
          borderColor={borderColor}
          boxShadow="sm"
          _hover={{
            boxShadow: 'md',
            transform: 'translateY(-2px)',
          }}
          transition="all 0.2s ease"
        >
          <CardBody p={6}>
            <Flex justify="space-between" align="start" mb={4}>
              <Box flex="1">
                <Heading size="lg" color={textColor} mb={2}>
                  {exp.title}
                </Heading>
                <Text 
                  fontSize="lg" 
                  fontWeight="semibold" 
                  color={primaryColor} 
                  mb={3}
                >
                  {exp.company}
                </Text>
                <HStack color={mutedColor} fontSize="sm" mb={4}>
                  <HiClock />
                  <Text>{exp.duration}</Text>
                </HStack>
              </Box>
              
              <HStack spacing={2}>
                <IconButton
                  icon={<HiTrash />}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  aria-label="Delete experience"
                  _hover={{
                    bg: 'red.50',
                  }}
                />
                <IconButton
                  icon={<HiPencil />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  aria-label="Edit experience"
                  _hover={{
                    bg: 'blue.50',
                  }}
                />
              </HStack>
            </Flex>

            <VStack spacing={4} align="stretch">
              {exp.description.map((paragraph, index) => (
                <Text 
                  key={index}
                  color={textColor} 
                  fontSize="md" 
                  lineHeight="relaxed"
                >
                  {paragraph}
                </Text>
              ))}
            </VStack>
          </CardBody>
        </Card>
      ))}
    </VStack>
  );
};

export default Experience;