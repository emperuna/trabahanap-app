import React from 'react';
import {
  Button,
  VStack,
  Text,
  Badge,
  Icon,
} from '@chakra-ui/react';

const ProfileNavigationButton = ({ item, isActive, theme, onClick }) => (
  <Button
    onClick={onClick}
    variant="ghost"
    justifyContent="start"
    size="md"
    h="auto"
    py={3}
    px={3}
    bg={isActive ? theme.activeBg : 'transparent'}
    color={isActive ? theme.accentColor : theme.textColor}
    fontWeight={isActive ? 'semibold' : 'normal'}
    borderRadius="xl"
    _hover={{
      bg: isActive ? theme.activeBg : theme.hoverBg,
      transform: 'translateX(4px)',
    }}
    transition="all 0.2s"
    leftIcon={
      <Icon
        as={item.icon}
        boxSize={5}
        color={isActive ? theme.accentColor : theme.mutedColor}
      />
    }
    rightIcon={
      item.badge && (
        <Badge
          colorScheme="blue"
          borderRadius="full"
          fontSize="xs"
          px={2}
        >
          {item.badge}
        </Badge>
      )
    }
  >
    <VStack align="start" spacing={0} flex={1}>
      <Text fontSize="sm">{item.label}</Text>
      {isActive && (
        <Text fontSize="xs" color={theme.mutedColor} fontWeight="normal">
          {item.description}
        </Text>
      )}
    </VStack>
  </Button>
);

export default ProfileNavigationButton;