import React from 'react';
import {
  Card,
  CardBody,
  HStack,
  VStack,
  Text,
  Icon,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';

const ComingSoonCard = ({ title, description, icon }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const iconBg = useColorModeValue('blue.50', 'blue.900');

  return (
    <Card
      bg={cardBg}
      borderRadius="xl"
      boxShadow="sm"
      borderWidth="1px"
      borderColor={borderColor}
      transition="all 0.2s"
      _hover={{
        boxShadow: 'md',
        borderColor: 'blue.300',
      }}
      size="sm" // ✅ Smaller card size
    >
      <CardBody p={4}> {/* ✅ Reduced padding from 5 to 4 */}
        <HStack spacing={3} align="start">
          {/* Icon */}
          <Icon
            as={icon}
            boxSize="20px" // ✅ Smaller icon (was 24px)
            color="blue.500"
            bg={iconBg}
            p={2}
            borderRadius="lg"
          />

          {/* Content */}
          <VStack align="start" spacing={1} flex="1">
            <HStack spacing={2}>
              <Text fontSize="sm" fontWeight="semibold"> {/* ✅ Smaller text */}
                {title}
              </Text>
              <Badge 
                colorScheme="purple" 
                fontSize="9px" // ✅ Tiny badge
                px={2}
                py={0.5}
                borderRadius="full"
              >
                Soon
              </Badge>
            </HStack>
            <Text fontSize="xs" color="gray.600" lineHeight="short"> {/* ✅ Extra small description */}
              {description}
            </Text>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ComingSoonCard;