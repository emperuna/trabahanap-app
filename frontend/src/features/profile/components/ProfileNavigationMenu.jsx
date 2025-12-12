import React from 'react';
import {
  Card,
  CardBody,
  VStack,
  Text,
} from '@chakra-ui/react';
import ProfileNavigationButton from './ProfileNavigationButton';

const ProfileNavigationMenu = ({ menuItems, activeSection, theme, onSectionChange }) => (
  <Card
    bg={theme.cardBg}
    borderRadius="2xl"
    border="1px"
    borderColor={theme.borderColor}
    w="full"
    boxShadow="md"
  >
    <CardBody p={4}>
      <VStack spacing={1} align="stretch">
        <Text
          fontSize="xs"
          fontWeight="bold"
          color={theme.mutedColor}
          textTransform="uppercase"
          letterSpacing="wider"
          mb={2}
          px={3}
        >
          Profile Sections
        </Text>

        {menuItems.map((item) => (
          <ProfileNavigationButton
            key={item.id}
            item={item}
            isActive={activeSection === item.id}
            theme={theme}
            onClick={() => onSectionChange(item.id)}
          />
        ))}
      </VStack>
    </CardBody>
  </Card>
);

export default ProfileNavigationMenu;