import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  Icon,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  useDisclosure,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import {
  HiDocumentText,
  HiUpload,
  HiEye,
  HiDownload,
  HiTrash,
  HiDotsVertical,
  HiCheckCircle,
} from 'react-icons/hi';
import FileUpload from '../../../../shared/components/ui/FileUpload';
import PDFViewerModal from '../../../../shared/components/ui/PDFViewerModal';
import { applicationsAPI } from '../../../../shared/api';

const ResumeUpload = ({ resumes = [], onUploadSuccess, onDeleteSuccess }) => {
  const toast = useToast();
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewingResume, setViewingResume] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        description: 'Please select a PDF file to upload',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('resume', selectedFile);

      // TODO: Update API endpoint for profile resume upload
      // await userAPI.uploadResume(formData);
      
      toast({
        title: 'Resume uploaded successfully!',
        status: 'success',
        duration: 3000,
      });

      setSelectedFile(null);
      if (onUploadSuccess) onUploadSuccess();

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload resume',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleView = (resume) => {
    setViewingResume(resume);
    onOpen();
  };

  const handleDelete = async (resumeId) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    try {
      // TODO: Add delete resume API
      // await userAPI.deleteResume(resumeId);
      
      toast({
        title: 'Resume deleted',
        status: 'success',
        duration: 3000,
      });

      if (onDeleteSuccess) onDeleteSuccess();

    } catch (error) {
      toast({
        title: 'Delete failed',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="md" mb={2}>Resume Management</Heading>
          <Text fontSize="sm" color="gray.600">
            Upload and manage your resumes. You can have multiple versions.
          </Text>
        </Box>

        {/* Upload Section */}
        <Box
          p={6}
          bg={cardBg}
          borderWidth={1}
          borderColor={borderColor}
          borderRadius="xl"
        >
          <VStack spacing={4} align="stretch">
            <Heading size="sm">Upload New Resume</Heading>
            
            <FileUpload
              file={selectedFile}
              onFileSelect={handleFileSelect}
              onFileRemove={() => setSelectedFile(null)}
              accept=".pdf"
              maxSize={10}
              label="Upload Resume (PDF)"
              helperText="Max size: 10MB • PDF format only"
              isRequired
            />

            {selectedFile && (
              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleUpload}
                isLoading={uploading}
                loadingText="Uploading..."
                leftIcon={<HiUpload />}
              >
                Upload Resume
              </Button>
            )}
          </VStack>
        </Box>

        {/* Existing Resumes List */}
        {resumes && resumes.length > 0 && (
          <Box>
            <Heading size="sm" mb={4}>My Resumes ({resumes.length})</Heading>
            
            <VStack spacing={3} align="stretch">
              {resumes.map((resume, index) => (
                <Box
                  key={resume.id || index}
                  p={4}
                  bg={cardBg}
                  borderWidth={1}
                  borderColor={borderColor}
                  borderRadius="lg"
                  transition="all 0.2s"
                  _hover={{
                    shadow: 'md',
                    borderColor: 'blue.400',
                  }}
                >
                  <HStack justify="space-between">
                    <HStack spacing={3} flex={1}>
                      <Icon as={HiDocumentText} boxSize={8} color="blue.500" />
                      
                      <VStack align="start" spacing={0} flex={1}>
                        <HStack>
                          <Text fontWeight="semibold">
                            {resume.fileName || `Resume ${index + 1}`}
                          </Text>
                          {resume.isDefault && (
                            <Badge colorScheme="green" fontSize="xs">
                              <HStack spacing={1}>
                                <Icon as={HiCheckCircle} boxSize={3} />
                                <Text>Default</Text>
                              </HStack>
                            </Badge>
                          )}
                        </HStack>
                        
                        <HStack fontSize="xs" color="gray.500" spacing={3}>
                          <Text>
                            {resume.uploadedAt 
                              ? new Date(resume.uploadedAt).toLocaleDateString()
                              : 'Recently uploaded'
                            }
                          </Text>
                          {resume.fileSize && (
                            <>
                              <Divider orientation="vertical" h="12px" />
                              <Text>{(resume.fileSize / (1024 * 1024)).toFixed(2)} MB</Text>
                            </>
                          )}
                        </HStack>
                      </VStack>
                    </HStack>

                    <HStack spacing={2}>
                      <Button
                        size="sm"
                        leftIcon={<HiEye />}
                        onClick={() => handleView(resume)}
                      >
                        View
                      </Button>

                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<HiDotsVertical />}
                          size="sm"
                          variant="ghost"
                        />
                        <MenuList>
                          <MenuItem icon={<HiDownload />}>
                            Download
                          </MenuItem>
                          <MenuItem 
                            icon={<HiTrash />} 
                            color="red.500"
                            onClick={() => handleDelete(resume.id)}
                          >
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </HStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>
        )}

        {/* Empty State */}
        {(!resumes || resumes.length === 0) && !selectedFile && (
          <Box
            p={8}
            textAlign="center"
            bg={cardBg}
            borderWidth={1}
            borderColor={borderColor}
            borderRadius="xl"
          >
            <Icon as={HiDocumentText} boxSize={16} color="gray.400" mb={4} />
            <Text color="gray.600" mb={2}>No resumes uploaded yet</Text>
            <Text fontSize="sm" color="gray.500">
              Upload your first resume to start applying for jobs
            </Text>
          </Box>
        )}
      </VStack>

      {/* PDF Viewer Modal */}
      {viewingResume && (
        <PDFViewerModal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setViewingResume(null);
          }}
          pdfUrl={viewingResume.url || viewingResume.path}
          fileName={viewingResume.fileName || 'Resume'}
        />
      )}
    </Box>
  );
};

export default ResumeUpload;