import React from 'react';
import {
  VStack, Card, CardBody, Text, Button, HStack, Icon,
  useColorModeValue, Badge, Box, Heading, Divider
} from '@chakra-ui/react';
import {
  HiUser, HiBell, HiShieldCheck, HiGlobe, HiLockClosed,
  HiCog, HiChevronRight
} from 'react-icons/hi';
import { useAuth } from '../../auth/context/AuthContext';

const SettingsSidebar = ({ activeSection, onSectionChange }) => {
  const { user } = useAuth();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  const activeColor = useColorModeValue('blue.600', 'blue.300');

  const settingsSections = [
    {
      id: 'account',
      label: 'Account Settings',
      icon: HiUser,
      description: 'Personal information and profile',
      badge: null
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: HiBell,
      description: 'Email, push & SMS preferences',
      badge: null
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: HiShieldCheck,
      description: 'Profile visibility and data sharing',
      badge: null
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: HiGlobe,
      description: 'Language, timezone & appearance',
      badge: null
    },
    {
      id: 'security',
      label: 'Security',
      icon: HiLockClosed,
      description: 'Password and account security',
      badge: 'Important'
    }
  ];

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardBody>
          <VStack spacing={3} align="start">
            <HStack>
              <Icon as={HiCog} color="blue.500" boxSize={6} />
              <Heading size="md" color={textColor}>Settings</Heading>
            </HStack>
            <Text fontSize="sm" color={mutedColor}>
              Manage your account preferences and privacy settings
            </Text>
          </VStack>
        </CardBody>
      </Card>

      {/* User Info */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardBody>
          <VStack spacing={3} align="start">
            <Text fontSize="sm" fontWeight="semibold" color={textColor}>
              Signed in as
            </Text>
            <Box>
              <Text fontSize="md" fontWeight="medium" color={textColor}>
                {user?.firstName} {user?.lastName}
              </Text>
              <Text fontSize="sm" color={mutedColor}>
                {user?.email}
              </Text>
            </Box>
          </VStack>
        </CardBody>
      </Card>

      {/* Settings Navigation */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardBody p={0}>
          <VStack spacing={0} align="stretch">
            {settingsSections.map((section, index) => (
              <Box key={section.id}>
                <Button
                  variant="ghost"
                  size="lg"
                  w="full"
                  h="auto"
                  p={4}
                  justifyContent="start"
                  bg={activeSection === section.id ? activeBg : 'transparent'}
                  color={activeSection === section.id ? activeColor : textColor}
                  _hover={{
                    bg: activeSection === section.id ? activeBg : useColorModeValue('gray.50', 'gray.700')
                  }}
                  onClick={() => onSectionChange(section.id)}
                  borderRadius={0}
                >
                  <HStack spacing={3} w="full">
                    <Icon 
                      as={section.icon} 
                      boxSize={5} 
                      color={activeSection === section.id ? activeColor : mutedColor}
                    />
                    <VStack align="start" spacing={0} flex={1}>
                      <HStack w="full" justify="space-between">
                        <Text fontSize="sm" fontWeight="medium">
                          {section.label}
                        </Text>
                        <HStack spacing={2}>
                          {section.badge && (
                            <Badge colorScheme="orange" size="sm">
                              {section.badge}
                            </Badge>
                          )}
                          <Icon 
                            as={HiChevronRight} 
                            boxSize={4} 
                            color={mutedColor}
                            opacity={activeSection === section.id ? 1 : 0.5}
                          />
                        </HStack>
                      </HStack>
                      <Text fontSize="xs" color={mutedColor} textAlign="left">
                        {section.description}
                      </Text>
                    </VStack>
                  </HStack>
                </Button>
                {index < settingsSections.length - 1 && (
                  <Divider borderColor={borderColor} />
                )}
              </Box>
            ))}
          </VStack>
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardBody>
          <VStack spacing={3} align="stretch">
            <Text fontSize="sm" fontWeight="semibold" color={textColor}>
              Quick Actions
            </Text>
            <VStack spacing={2} align="stretch">
              <Button variant="outline" size="sm" colorScheme="blue">
                Export Data
              </Button>
              <Button variant="outline" size="sm" colorScheme="gray">
                Contact Support
              </Button>
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default SettingsSidebar;