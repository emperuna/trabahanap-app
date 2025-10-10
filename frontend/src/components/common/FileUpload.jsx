import React, { useRef } from 'react';
import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  Icon,
  useColorModeValue,
  Progress,
  IconButton,
} from '@chakra-ui/react';
import { HiUpload, HiDocumentText, HiX } from 'react-icons/hi';

const FileUpload = ({
  file,
  onFileSelect,
  onFileRemove,
  accept = '.pdf',
  maxSize = 10, // MB
  label = 'Upload File',
  helperText,
  isRequired = false,
  isDisabled = false,
}) => {
  const fileInputRef = useRef();
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) return;

    // Validate file type
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    const acceptedExtensions = accept.split(',').map(ext => ext.trim().replace('.', ''));
    
    if (!acceptedExtensions.includes(fileExtension)) {
      alert(`Please select a valid file type: ${accept}`);
      return;
    }

    // Validate file size
    const fileSizeMB = selectedFile.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    onFileSelect(selectedFile);
  };

  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileRemove();
  };

  return (
    <VStack align="stretch" spacing={2}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={isDisabled}
      />

      {!file ? (
        // Upload Button
        <Box
          as="button"
          type="button"
          onClick={() => fileInputRef.current?.click()}
          p={6}
          borderWidth={2}
          borderStyle="dashed"
          borderColor={borderColor}
          borderRadius="lg"
          bg={bgColor}
          cursor="pointer"
          transition="all 0.2s"
          _hover={{
            bg: hoverBg,
            borderColor: 'blue.400',
          }}
          _disabled={{
            opacity: 0.6,
            cursor: 'not-allowed',
          }}
          disabled={isDisabled}
        >
          <VStack spacing={3}>
            <Icon as={HiUpload} boxSize={10} color="blue.500" />
            <VStack spacing={1}>
              <Text fontWeight="semibold" fontSize="md">
                {label}
                {isRequired && <Text as="span" color="red.500" ml={1}>*</Text>}
              </Text>
              {helperText && (
                <Text fontSize="sm" color="gray.500">
                  {helperText}
                </Text>
              )}
            </VStack>
          </VStack>
        </Box>
      ) : (
        // File Preview
        <HStack
          p={4}
          borderWidth={1}
          borderColor={borderColor}
          borderRadius="lg"
          bg={bgColor}
          justify="space-between"
        >
          <HStack spacing={3} flex={1}>
            <Icon as={HiDocumentText} boxSize={8} color="blue.500" />
            <VStack align="start" spacing={0} flex={1}>
              <Text fontWeight="medium" fontSize="sm" noOfLines={1}>
                {file.name}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </Text>
            </VStack>
          </HStack>
          
          <IconButton
            icon={<HiX />}
            size="sm"
            colorScheme="red"
            variant="ghost"
            onClick={handleRemove}
            aria-label="Remove file"
            isDisabled={isDisabled}
          />
        </HStack>
      )}
    </VStack>
  );
};

export default FileUpload;