import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Card,
  CardBody,
  Link,
  SimpleGrid,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import ContactTeam from './ContactTeam';

const AdditionalResources = ({ onDocumentationClick }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textPrimary = useColorModeValue('gray.900', 'gray.100');
  const textSecondary = useColorModeValue('gray.600', 'gray.400');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box mt={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} maxW="4xl" mx="auto">
          <Card
            bg={cardBg}
            border="1px"
            borderColor={borderColor}
            _hover={{
              borderColor: 'blue.300',
              shadow: 'md'
            }}
            transition="all 0.2s"
            cursor="pointer"
            onClick={onOpen}
          >
            <CardBody>
              <VStack align="start" spacing={3}>
                <Heading size="sm" color={textPrimary}>
                  Still have questions?
                </Heading>
                <Text fontSize="sm" color={textSecondary}>
                  Can't find the answer you're looking for? Please chat with our friendly team.
                </Text>
                <Link 
                  color="blue.500" 
                  fontWeight="semibold"
                  fontSize="sm"
                  _hover={{ textDecoration: 'underline' }}
                >
                  Get in touch →
                </Link>
              </VStack>
            </CardBody>
          </Card>

          <Card
            bg={cardBg}
            border="1px"
            borderColor={borderColor}
            _hover={{
              borderColor: 'blue.300',
              shadow: 'md'
            }}
            transition="all 0.2s"
            cursor="pointer"
            onClick={onDocumentationClick}
          >
            <CardBody>
              <VStack align="start" spacing={3}>
                <Heading size="sm" color={textPrimary}>
                  Documentation Library
                </Heading>
                <Text fontSize="sm" color={textSecondary}>
                  Browse our comprehensive documentation and articles to learn best practices.
                </Text>
                <Link 
                  color="blue.500" 
                  fontWeight="semibold"
                  fontSize="sm"
                  _hover={{ textDecoration: 'underline' }}
                >
                  Read more →
                </Link>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact Our Support Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ContactTeam />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdditionalResources;
