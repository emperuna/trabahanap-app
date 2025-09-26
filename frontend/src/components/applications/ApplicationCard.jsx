import React from 'react';
import {
  Card, CardBody, VStack, HStack, Text, Button, Divider,
  useColorModeValue, IconButton, Menu, MenuButton, MenuList, MenuItem
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { 
  HiEye, HiDotsVertical, HiOfficeBuilding, HiClock, HiDocumentText
} from 'react-icons/hi';
import ApplicationStatusBadge from './ApplicationStatusBadge';

const ApplicationCard = ({ application, formatDate }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Card
      bg={cardBg}
      borderRadius="xl"
      shadow="sm"
      border="1px"
      borderColor={borderColor}
      _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
      transition="all 0.3s ease"
    >
      <CardBody p={6}>
        <VStack spacing={4} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={1} flex={1}>
              <Text fontSize="lg" fontWeight="bold" color={textColor} noOfLines={2}>
                {application.jobTitle || 'Job Title'}
              </Text>
              <HStack spacing={2} color={mutedColor} fontSize="sm">
                <HiOfficeBuilding />
                <Text>{application.company || 'Company'}</Text>
              </HStack>
            </VStack>
            
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HiDotsVertical />}
                variant="ghost"
                size="sm"
                color={mutedColor}
              />
              <MenuList>
                <MenuItem 
                  as={Link} 
                  to={`/jobs/${application.jobId}`}
                  icon={<HiEye />}
                >
                  View Job
                </MenuItem>
                <MenuItem icon={<HiDocumentText />}>
                  View Application
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>

          {/* Status Badge */}
          <HStack>
            <ApplicationStatusBadge status={application.status} />
          </HStack>

          {/* Cover Letter Preview */}
          {application.coverLetter && (
            <Text fontSize="sm" color={mutedColor} noOfLines={3}>
              "{application.coverLetter}"
            </Text>
          )}

          <Divider />

          {/* Footer */}
          <HStack justify="space-between" fontSize="xs" color={mutedColor}>
            <HStack spacing={1}>
              <HiClock />
              <Text>Applied {formatDate(application.appliedAt)}</Text>
            </HStack>
            {application.updatedAt && application.updatedAt !== application.appliedAt && (
              <Text>Updated {formatDate(application.updatedAt)}</Text>
            )}
          </HStack>

          {/* Action Button */}
          <Button
            as={Link}
            to={`/jobs/${application.jobId}`}
            size="sm"
            colorScheme="purple"
            variant="outline"
            w="full"
          >
            View Job Details
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ApplicationCard;