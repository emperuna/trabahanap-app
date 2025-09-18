import React from 'react';
import {
  Card,
  CardBody,
  HStack,
  Heading,
  VStack,
  Button,
  Icon,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiPencil,
  HiDownload,
  HiShare,
  HiSparkles,
} from 'react-icons/hi';

const ProfileQuickActions = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const primaryColor = '#153CF5';

  const actions = [
    { 
      icon: HiPencil, 
      label: 'Edit Profile', 
      variant: 'solid',
      bg: primaryColor,
      color: 'white',
      hoverBg: '#0F2ECC'
    },
    { 
      icon: HiDownload, 
      label: 'Download CV', 
      variant: 'outline',
      borderColor: primaryColor,
      color: primaryColor,
      hoverBg: primaryColor,
      hoverColor: 'white'
    },
    { 
      icon: HiShare, 
      label: 'Share Profile', 
      variant: 'ghost',
      color: textColor,
      hoverBg: useColorModeValue('gray.100', 'gray.700')
    },
  ];

  return (
    <Card 
      bg={cardBg} 
      borderRadius="xl" 
      border="1px" 
      borderColor={borderColor}
    >
      <CardBody p={6}>
        <VStack spacing={4}>
          <HStack justify="space-between" align="center" w="full">
            <Heading size="md" color={textColor}>
              Quick Actions
            </Heading>
            <Icon as={HiSparkles} color={primaryColor} boxSize={5} />
          </HStack>

          <VStack spacing={3} w="full">
            {actions.map((action, index) => (
              <Button
                key={index}
                leftIcon={<Icon as={action.icon} />}
                variant={action.variant}
                bg={action.bg}
                color={action.color}
                borderColor={action.borderColor}
                size="md"
                w="full"
                borderRadius="lg"
                fontWeight="semibold"
                _hover={{
                  bg: action.hoverBg,
                  color: action.hoverColor,
                  transform: 'translateY(-1px)',
                  boxShadow: 'md',
                }}
                _active={{
                  transform: 'translateY(0px)',
                }}
                transition="all 0.2s ease"
              >
                {action.label}
              </Button>
            ))}
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ProfileQuickActions;
