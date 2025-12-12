import React from 'react';
import {
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  HStack,
  Box,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';

const StatsCard = ({
  label,
  value,
  icon,
  color = 'blue',
  helpText,
  isComingSoon = false,
  trend = null, // optional: 'increase' or 'decrease'
  onClick = null,
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const iconBg = useColorModeValue(`${color}.50`, `${color}.900`);
  const iconColor = useColorModeValue(`${color}.500`, `${color}.300`);

  return (
    <Card
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="2xl"
      boxShadow="md"
      cursor={onClick ? 'pointer' : 'default'}
      onClick={onClick}
      _hover={onClick ? {
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
        borderColor: `${color}.300`,
      } : {}}
      transition="all 0.3s"
      position="relative"
      overflow="hidden"
    >
      {/* Coming Soon Badge */}
      {isComingSoon && (
        <Badge
          position="absolute"
          top={2}
          right={2}
          colorScheme="purple"
          fontSize="10px"
          borderRadius="full"
          px={2}
        >
          Soon
        </Badge>
      )}

      <CardBody>
        <Stat>
          <HStack justify="space-between" mb={3}>
            <StatLabel fontSize="sm" color="gray.600" fontWeight="medium">
              {label}
            </StatLabel>
            <Box
              bg={iconBg}
              p={2}
              borderRadius="lg"
            >
              <Icon
                as={icon}
                color={iconColor}
                boxSize="20px"
              />
            </Box>
          </HStack>

          <StatNumber
            fontSize="3xl"
            fontWeight="bold"
            color={`${color}.600`}
            mb={2}
          >
            {value}
          </StatNumber>

          <StatHelpText fontSize="xs" color="gray.500" mb={0}>
            {trend && (
              <StatArrow
                type={trend}
                mr={1}
              />
            )}
            {helpText}
          </StatHelpText>
        </Stat>
      </CardBody>

      {/* Decorative gradient bar at bottom */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        height="4px"
        bgGradient={`linear(to-r, ${color}.400, ${color}.600)`}
      />
    </Card>
  );
};

export default StatsCard;