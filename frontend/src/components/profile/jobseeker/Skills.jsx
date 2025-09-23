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
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiPencil,
  HiTrash,
  HiPlus,
} from 'react-icons/hi';

const Skills = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.700', 'gray.300');
  const primaryColor = '#153CF5';

  const skills = [
    {
      id: 1,
      title: 'Photo Editing',
      tools: ['Photoshop'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      id: 2,
      title: 'Layout Design',
      tools: ['Photoshop', 'Illustrator', 'Canva'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      id: 3,
      title: 'Web Development',
      tools: ['React.js'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  ];

  return (
    <VStack spacing={6} align="stretch">
      {/* Add Skills Button */}
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
          Add Skills
        </Button>
      </Flex>

      {/* Skills Cards */}
      {skills.map((skill) => (
        <Card 
          key={skill.id}
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
                  {skill.title}
                </Heading>
                <HStack spacing={2} mb={4} flexWrap="wrap">
                  {skill.tools.map((tool, index) => (
                    <Badge
                      key={index}
                      bg={primaryColor}
                      color="white"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="medium"
                    >
                      {tool}
                    </Badge>
                  ))}
                </HStack>
              </Box>
              
              <HStack spacing={2}>
                <IconButton
                  icon={<HiTrash />}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  aria-label="Delete skill"
                  _hover={{
                    bg: 'red.50',
                  }}
                />
                <IconButton
                  icon={<HiPencil />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  aria-label="Edit skill"
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
              {skill.description}
            </Text>
          </CardBody>
        </Card>
      ))}
    </VStack>
  );
};

export default Skills;