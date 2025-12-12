import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Card,
  CardBody,
  IconButton,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HiPencil,
  HiPhone,
  HiMail,
} from 'react-icons/hi';
import {
  FaFacebook,
  FaLinkedin,
  FaViber,
} from 'react-icons/fa';

const Contact = ({ profileData }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');
  const primaryColor = '#153CF5';

  const contactItems = [
    {
      label: 'Mobile',
      value: profileData.contacts.mobile,
      icon: HiPhone,
      color: 'green.500'
    },
    {
      label: 'Facebook',
      value: profileData.contacts.facebook,
      icon: FaFacebook,
      color: 'blue.600'
    },
    {
      label: 'LinkedIn',
      value: profileData.contacts.linkedin,
      icon: FaLinkedin,
      color: 'blue.700'
    },
    {
      label: 'Email',
      value: profileData.contacts.email,
      icon: HiMail,
      color: 'red.500'
    },
    {
      label: 'Viber',
      value: profileData.contacts.viber,
      icon: FaViber,
      color: 'blue.500'
    }
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
              Contact Information
            </Heading>
            <IconButton
              icon={<HiPencil />}
              size="sm"
              variant="ghost"
              colorScheme="blue"
              aria-label="Edit contact"
              color={primaryColor}
              _hover={{
                bg: 'blue.50',
              }}
            />
          </HStack>

          <VStack spacing={4} align="stretch" w="full">
            {contactItems.map((item, index) => (
              <HStack key={index} spacing={3} align="start">
                <Box
                  p={2}
                  borderRadius="lg"
                  bg={`${item.color.split('.')[0]}.50`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  minW="32px"
                  h="32px"
                >
                  <Box as={item.icon} color={item.color} boxSize={4} />
                </Box>
                <Box flex="1">
                  <Text 
                    fontWeight="semibold" 
                    color={textColor} 
                    fontSize="sm" 
                    mb={1}
                  >
                    {item.label}
                  </Text>
                  <Text 
                    fontSize="xs" 
                    color={mutedColor}
                    wordBreak="break-all"
                    lineHeight="short"
                  >
                    {item.value}
                  </Text>
                </Box>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default Contact;