import React from 'react';
import {
  Card, CardBody, VStack, HStack, Text, Avatar, Divider,
  useColorModeValue, IconButton, Menu, MenuButton, MenuList, MenuItem
} from '@chakra-ui/react';
import { 
  HiEye, HiDotsVertical, HiMail, HiDownload
} from 'react-icons/hi';
import EmployerApplicationStatusBadge from './EmployerApplicationStatusBadge';
import EmployerApplicationActions from './EmployerApplicationActions';

const EmployerApplicationCard = ({ 
  application, 
  formatDate, 
  onStatusUpdate 
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Card
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      borderRadius="xl"
      _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
      transition="all 0.3s ease"
    >
      <CardBody p={6}>
        <VStack spacing={4} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="start">
            <HStack spacing={3}>
              <Avatar 
                name={application.applicantUsername || 'Applicant'} 
                size="md"
                bg="blue.500"
                color="white"
              />
              <VStack align="start" spacing={0}>
                <Text fontSize="md" fontWeight="semibold" color={textColor}>
                  {application.applicantUsername || 'Anonymous Applicant'}
                </Text>
                <Text fontSize="sm" color={mutedColor}>
                  {application.applicantEmail || 'No email provided'}
                </Text>
              </VStack>
            </HStack>
            
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HiDotsVertical />}
                variant="ghost"
                size="sm"
                color={mutedColor}
              />
              <MenuList>
                <MenuItem icon={<HiEye />}>
                  View Full Application
                </MenuItem>
                <MenuItem icon={<HiMail />}>
                  Send Message
                </MenuItem>
                <MenuItem icon={<HiDownload />}>
                  Download Resume
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>

          {/* Job & Status */}
          <VStack align="start" spacing={2}>
            <Text fontSize="sm" fontWeight="medium" color={textColor}>
              Applied for: {application.jobTitle}
            </Text>
            <EmployerApplicationStatusBadge status={application.status} />
          </VStack>

          {/* Cover Letter Preview */}
          {application.coverLetter && (
            <VStack align="start" spacing={1}>
              <Text fontSize="xs" color={mutedColor}>Cover Letter:</Text>
              <Text fontSize="sm" color={textColor} noOfLines={3}>
                "{application.coverLetter}"
              </Text>
            </VStack>
          )}

          <Divider />

          {/* Footer */}
          <HStack justify="space-between" align="center">
            <Text fontSize="xs" color={mutedColor}>
              Applied {formatDate(application.appliedAt)}
            </Text>
            
            <EmployerApplicationActions 
              application={application}
              onStatusUpdate={onStatusUpdate}
            />
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default EmployerApplicationCard;