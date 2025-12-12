import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text,
  Spinner,
  VStack,
  HStack,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react';
import { HiDownload, HiExternalLink } from 'react-icons/hi';

const PDFViewerModal = ({ isOpen, onClose, pdfUrl, title }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen && pdfUrl) {
      setLoading(true);
      setError(false);
    }
  }, [isOpen, pdfUrl]);

  // Clean up blob URL when modal closes
  useEffect(() => {
    return () => {
      if (pdfUrl && pdfUrl.startsWith('blob:')) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNewTab = () => {
    window.open(pdfUrl, '_blank');
  };

  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent bg={bgColor} mx={4} h="90vh">
        <ModalHeader>
          <HStack justify="space-between">
            <Text>{title}</Text>
            <HStack spacing={2}>
              <IconButton
                icon={<HiDownload />}
                onClick={handleDownload}
                size="sm"
                variant="outline"
                aria-label="Download PDF"
              />
              <IconButton
                icon={<HiExternalLink />}
                onClick={handleNewTab}
                size="sm"
                variant="outline"
                aria-label="Open in new tab"
              />
            </HStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody p={0} position="relative">
          {loading && (
            <VStack justify="center" align="center" h="full" position="absolute" w="full" zIndex={2}>
              <Spinner size="xl" color="blue.500" />
              <Text>Loading PDF...</Text>
            </VStack>
          )}

          {error ? (
            <VStack justify="center" align="center" h="full">
              <Text color="red.500" fontSize="lg">Failed to load PDF</Text>
              <Text color="gray.500">The file might be corrupted or not accessible</Text>
              <Button onClick={handleDownload} colorScheme="blue" variant="outline">
                Try Download Instead
              </Button>
            </VStack>
          ) : (
            <Box h="full" w="full">
              {pdfUrl && (
                <iframe
                  src={pdfUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  onLoad={handleLoad}
                  onError={handleError}
                  title={title}
                />
              )}
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" ml={3} onClick={handleDownload}>
            Download PDF
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PDFViewerModal;