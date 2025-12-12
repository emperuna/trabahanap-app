import React from 'react';
import {
  Card,
  CardBody,
  VStack,
  Heading,
  Text,
  Badge,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { HiDocument } from 'react-icons/hi';

const TextGuideCard = ({ title, description, category, readTime, onClick }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textPrimary = useColorModeValue('gray.900', 'gray.100');
  const textSecondary = useColorModeValue('gray.600', 'gray.400');

  const getCategoryColor = (cat) => {
    const colors = {
      'guide': 'blue',
      'tutorial': 'purple',
      'documentation': 'green',
      'faq': 'orange',
      'policy': 'red'
    };
    return colors[cat?.toLowerCase()] || 'gray';
  };

  return (
    <Card
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      _hover={{
        transform: 'translateY(-2px)',
        shadow: 'lg',
        borderColor: 'blue.300'
      }}
      transition="all 0.3s"
      cursor="pointer"
      onClick={onClick}
    >
      <CardBody>
        <VStack spacing={3} align="start">
          <HStack spacing={2}>
            {category && (
              <Badge colorScheme={getCategoryColor(category)} fontSize="xs">
                {category}
              </Badge>
            )}
            {readTime && (
              <HStack spacing={1}>
                <Icon as={HiDocument} boxSize={3} color={textSecondary} />
                <Text fontSize="xs" color={textSecondary}>
                  {readTime} min read
                </Text>
              </HStack>
            )}
          </HStack>
          
          <Heading size="sm" color={textPrimary}>
            {title}
          </Heading>
          
          <Text fontSize="sm" color={textSecondary} noOfLines={2}>
            {description}
          </Text>
          
          <Text 
            fontSize="xs" 
            color="blue.500" 
            fontWeight="semibold"
            _hover={{ textDecoration: 'underline' }}
          >
            Read more →
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default TextGuideCard;
