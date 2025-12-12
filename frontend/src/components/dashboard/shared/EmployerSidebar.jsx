import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Icon,
  Card,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import {
  HiHome,
  HiPlus,
  HiBriefcase,
  HiClipboardList,
  HiUserGroup,
  HiChartBar,
  HiCog,
  HiSupport,
  HiLogout,
} from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const EmployerSidebar = ({ selected, onSelect, options }) => {
  const { logout } = useAuth();
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleLogout = async () => {
    try {
      toast({
        title: 'Logging out...',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });

      console.log('🚪 Sidebar: Logout button clicked');
      await logout();
    } catch (error) {
      console.error('❌ Sidebar: Logout failed:', error);
      toast({
        title: 'Logout failed',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg={cardBg}
      borderRadius="2xl"
      border="1px"
      borderColor={borderColor}
      p={6}
      w="280px"
    >
      <VStack spacing={6} align="stretch">
        {/* Navigation Header */}
        <Box>
          <Text fontWeight="bold" color="gray.800" mb={4}>
            Employer Hub
          </Text>
          <VStack spacing={2} align="stretch">
            {options && options.map((item) => (
              <Button
                key={item.key}
                variant={selected === item.key ? 'solid' : 'ghost'}
                colorScheme={selected === item.key ? 'blue' : 'gray'}
                justifyContent="flex-start"
                h={12}
                px={4}
                borderRadius="xl"
                fontWeight="medium"
                bg={selected === item.key ? 'blue.500' : 'transparent'}
                color={selected === item.key ? 'white' : 'gray.700'}
                _hover={{
                  bg: selected === item.key ? 'blue.600' : 'gray.100',
                  transform: 'translateX(4px)',
                }}
                transition="all 0.2s ease"
                onClick={() => onSelect && onSelect(item.key)}
              >
                <HStack spacing={3} w="full">
                  {item.icon && <Icon as={item.icon} boxSize={5} />}
                  <Text flex="1" textAlign="left">
                    {item.label}
                  </Text>
                  {item.badge && (
                    <Badge
                      colorScheme={selected === item.key ? 'white' : 'blue'}
                      variant={selected === item.key ? 'outline' : 'solid'}
                      borderRadius="full"
                      px={2}
                      fontSize="xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </HStack>
              </Button>
            ))}
          </VStack>
        </Box>

        {/* Help Section */}
        <Box>
          <Text fontWeight="semibold" color="gray.800" mb={3} fontSize="sm">
            Support
          </Text>
          <VStack spacing={2} align="stretch">
            <Button
              variant={selected === 'helpCenter' ? 'solid' : 'ghost'}
              colorScheme={selected === 'helpCenter' ? 'blue' : 'gray'}
              justifyContent="flex-start"
              h={10}
              px={4}
              borderRadius="xl"
              fontWeight="medium"
              bg={selected === 'helpCenter' ? 'blue.500' : 'transparent'}
              color={selected === 'helpCenter' ? 'white' : 'gray.700'}
              _hover={{ 
                bg: selected === 'helpCenter' ? 'blue.600' : 'gray.100', 
                transform: 'translateX(4px)' 
              }}
              transition="all 0.2s ease"
              onClick={() => onSelect && onSelect('helpCenter')}
            >
              <HStack spacing={3}>
                <Icon as={HiSupport} boxSize={4} />
                <Text fontSize="sm">Help Center</Text>
              </HStack>
            </Button>

            <Button
              onClick={handleLogout}
              variant="ghost"
              justifyContent="flex-start"
              h={10}
              px={4}
              borderRadius="xl"
              fontWeight="medium"
              color="red.600"
              _hover={{ bg: 'red.50', transform: 'translateX(4px)' }}
              transition="all 0.2s ease"
            >
              <HStack spacing={3}>
                <Icon as={HiLogout} boxSize={4} />
                <Text fontSize="sm">Logout</Text>
              </HStack>
            </Button>
          </VStack>
        </Box>

        {/* Upgrade Card */}
        <Card bg="blue.50" border="1px" borderColor="blue.200" p={4}>
          <VStack spacing={3}>
            <Text fontSize="sm" fontWeight="semibold" color="blue.800" textAlign="center">
              Upgrade to Premium
            </Text>
            <Text fontSize="xs" color="blue.600" textAlign="center">
              Get unlimited job posts and priority support
            </Text>
            <Button
              as={Link}
              to="/employer/pricing"
              size="sm"
              colorScheme="blue"
              w="full"
              borderRadius="lg"
            >
              Upgrade Now
            </Button>
          </VStack>
        </Card>
      </VStack>
    </Box>
  );
};

export default EmployerSidebar;