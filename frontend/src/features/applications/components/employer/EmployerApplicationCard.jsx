import React from 'react';
import {
  Card, CardBody, VStack, HStack, Text, Avatar, Divider, Button,
  useColorModeValue, IconButton, Menu, MenuButton, MenuList, MenuItem,
  useToast, Badge
} from '@chakra-ui/react';
import { 
  HiEye, HiDotsVertical, HiMail, HiDownload, HiOutlineDocumentText,
  HiOutlineEye, HiCalendar
} from 'react-icons/hi';

import { StatusBadge } from '../shared';
import EmployerApplicationActions from './EmployerApplicationActions';

const EmployerApplicationCard = ({ 
  application, 
  formatDate, 
  onStatusUpdate,
  onViewPDF
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const toast = useToast();

  const handleViewResume = () => {
    if (application.resumePath && onViewPDF) {
      onViewPDF(
        application.id, 
        'resume', 
        `${application.applicantUsername}'s Resume`
      );
    }
  };

  const handleViewCoverLetter = () => {
    if (application.coverLetterPath && onViewPDF) {
      onViewPDF(
        application.id, 
        'cover-letter', 
        `${application.applicantUsername}'s Cover Letter`
      );
    }
  };

  const handleViewTextCoverLetter = () => {
    if (application.coverLetter) {
      toast({
        title: `Cover Letter - ${application.applicantUsername}`,
        description: application.coverLetter,
        status: 'info',
        duration: 10000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const getDaysAgo = (dateString) => {
    const days = Math.ceil((new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <Card
      bg={cardBg}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      transition="all 0.2s"
      _hover={{
        shadow: 'lg',
        transform: 'translateY(-2px)',
        borderColor: '#153CF5'
      }}
    >
      <CardBody p={6}>
        <VStack spacing={4} align="stretch">
          {/* Applicant Header */}
          <HStack spacing={4} align="start">
            <Avatar 
              name={application.applicantUsername || 'Applicant'} 
              size="md"
              bg="#153CF5"
              color="white"
            />
            
            <VStack align="start" spacing={2}>
              <Text fontSize="md" fontWeight="bold" color={textColor}>
                {application.applicantUsername || 'Anonymous Applicant'}
              </Text>
              <HStack spacing={1}>
                <HiMail size={12} color={mutedColor} />
                <Text fontSize="xs" color={mutedColor}>
                  {application.applicantEmail || 'No email provided'}
                </Text>
              </HStack>

              {/* ✅ USE NEW StatusBadge */}
              <StatusBadge status={application.status} size="sm" />
            </VStack>
            
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HiDotsVertical />}
                variant="ghost"
                size="sm"
                color={mutedColor}
                _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
              />
              <MenuList>
                <MenuItem icon={<HiEye />}>
                  View Full Profile
                </MenuItem>
                <MenuItem icon={<HiMail />}>
                  Contact Applicant
                </MenuItem>
                {application.resumePath && (
                  <MenuItem 
                    icon={<HiOutlineDocumentText />}
                    onClick={handleViewResume}
                  >
                    View Resume (PDF)
                  </MenuItem>
                )}
                {application.coverLetterPath && (
                  <MenuItem 
                    icon={<HiOutlineDocumentText />}
                    onClick={handleViewCoverLetter}
                  >
                    View Cover Letter (PDF)
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </HStack>

          {/* Job Info */}
          <VStack align="start" spacing={2}>
            <Text fontSize="sm" fontWeight="semibold" color={textColor}>
              Applied for: <Text as="span" color="#153CF5">{application.jobTitle}</Text>
            </Text>
            <HStack justify="space-between" w="full">
              <StatusBadge status={application.status} />
              <HStack spacing={1}>
                <HiCalendar size={12} />
                <Text fontSize="xs" color={mutedColor}>
                  {getDaysAgo(application.appliedAt)} days ago
                </Text>
              </HStack>
            </HStack>
          </VStack>

          {/* Documents Section */}
          <VStack align="start" spacing={3}>
            <Text fontSize="sm" fontWeight="semibold" color={textColor}>
              📄 Documents
            </Text>
            
            <VStack spacing={2} align="stretch" w="full">
              {/* Resume */}
              {application.resumePath ? (
                <HStack justify="space-between" p={3} bg={useColorModeValue('blue.50', 'blue.900')} borderRadius="md">
                  <HStack spacing={2}>
                    <HiOutlineDocumentText color="#153CF5" />
                    <Text fontSize="sm" fontWeight="medium" color={textColor}>Resume</Text>
                    <Badge colorScheme="blue" size="sm">PDF</Badge>
                  </HStack>
                  <Button
                    size="xs"
                    colorScheme="blue"
                    variant="solid"
                    leftIcon={<HiEye />}
                    onClick={handleViewResume}
                    borderRadius="full"
                  >
                    View
                  </Button>
                </HStack>
              ) : (
                <HStack justify="space-between" p={3} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
                  <HStack spacing={2}>
                    <HiOutlineDocumentText color={mutedColor} />
                    <Text fontSize="sm" color={mutedColor}>No resume uploaded</Text>
                  </HStack>
                </HStack>
              )}

              {/* Cover Letter */}
              {application.coverLetterPath ? (
                <HStack justify="space-between" p={3} bg={useColorModeValue('purple.50', 'purple.900')} borderRadius="md">
                  <HStack spacing={2}>
                    <HiOutlineDocumentText color="#9333EA" />
                    <Text fontSize="sm" fontWeight="medium" color={textColor}>Cover Letter</Text>
                    <Badge colorScheme="purple" size="sm">PDF</Badge>
                  </HStack>
                  <Button
                    size="xs"
                    colorScheme="purple"
                    variant="solid"
                    leftIcon={<HiEye />}
                    onClick={handleViewCoverLetter}
                    borderRadius="full"
                  >
                    View
                  </Button>
                </HStack>
              ) : application.coverLetter ? (
                <VStack align="stretch" p={3} bg={useColorModeValue('green.50', 'green.900')} borderRadius="md">
                  <HStack justify="space-between">
                    <HStack spacing={2}>
                      <HiOutlineEye color="#059669" />
                      <Text fontSize="sm" fontWeight="medium" color={textColor}>Cover Letter</Text>
                      <Badge colorScheme="green" size="sm">Text</Badge>
                    </HStack>
                    <Button
                      size="xs"
                      colorScheme="green"
                      variant="solid"
                      leftIcon={<HiOutlineEye />}
                      onClick={handleViewTextCoverLetter}
                      borderRadius="full"
                    >
                      View
                    </Button>
                  </HStack>
                  <Text fontSize="xs" color={textColor} noOfLines={2} mt={1}>
                    "{application.coverLetter}"
                  </Text>
                </VStack>
              ) : (
                <HStack justify="space-between" p={3} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
                  <HStack spacing={2}>
                    <HiOutlineDocumentText color={mutedColor} />
                    <Text fontSize="sm" color={mutedColor}>No cover letter provided</Text>
                  </HStack>
                </HStack>
              )}
            </VStack>
          </VStack>

          <Divider />

          {/* Application Date */}
          <HStack justify="center">
            <Text fontSize="xs" color={mutedColor} textAlign="center">
              Application submitted on {formatDate(application.appliedAt)}
            </Text>
          </HStack>

          {/* Actions */}
          <EmployerApplicationActions 
            application={application}
            onApplicationUpdate={onStatusUpdate}
          />
        </VStack>
      </CardBody>
    </Card>
  );
};

export default EmployerApplicationCard;