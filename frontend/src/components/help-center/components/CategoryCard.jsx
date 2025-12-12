import React from 'react';
import {
  Card,
  CardBody,
  VStack,
  Heading,
  Text,
  Icon,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

const CategoryCard = ({ icon, title, description, bgColor, iconColor, onClick }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textPrimary = useColorModeValue('gray.900', 'gray.100');
  const textSecondary = useColorModeValue('gray.600', 'gray.400');

  return (
    <Card
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'xl',
        borderColor: 'blue.300'
      }}
      transition="all 0.3s"
      cursor="pointer"
      onClick={onClick}
    >
      <CardBody>
        <VStack spacing={4} align="center" py={4}>
          <Flex
            w={16}
            h={16}
            align="center"
            justify="center"
            rounded="full"
            bg={bgColor}
          >
            <Icon as={icon} boxSize={8} color={iconColor} />
          </Flex>
          <VStack spacing={2}>
            <Heading size="md" color={textPrimary}>
              {title}
            </Heading>
            <Text 
              fontSize="sm" 
              color={textSecondary}
              textAlign="center"
            >
              {description}
            </Text>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default CategoryCard;
