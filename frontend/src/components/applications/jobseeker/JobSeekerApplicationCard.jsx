import React from 'react';
import {
  Card,
  CardBody,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  useColorModeValue,
  Divider,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import {
  HiDotsVertical,
  HiEye,
  HiTrash,
  HiExternalLink,
  HiDocumentText,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
// ✅ Add Poppins font imports
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import { StatusBadge } from '../shared';

const JobSeekerApplicationCard = ({ application, onWithdraw, onViewPDF }) => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const canWithdraw = !['ACCEPTED', 'REJECTED'].includes(application.status?.toUpperCase());

  return (
    <Card
      bg={cardBg}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      fontFamily="'Poppins', sans-serif" // ✅ Apply Poppins font to entire card
      transition="all 0.2s"
      _hover={{
        shadow: 'lg',
        transform: 'translateY(-4px)',
      }}
    >
      <CardBody>
        <VStack spacing={4} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={1} flex={1}>
              <Text
                fontSize="lg"
                fontWeight="700"
                color={textColor}
                noOfLines={1}
                cursor="pointer"
                _hover={{ color: 'blue.500' }}
                onClick={() => navigate(`/jobs/${application.jobId}`)}
              >
                {application.jobTitle}
              </Text>
              <Text fontSize="sm" color={mutedColor} noOfLines={1}>
                {application.company || "Company Name"}
              </Text>
              {/* ✅ USE SHARED StatusBadge */}
              <StatusBadge status={application.status} size="sm" />
            </VStack>

            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HiDotsVertical />}
                variant="ghost"
                size="sm"
                borderRadius="md" // ✅ More rectangular
              />
              <MenuList>
                <MenuItem
                  icon={<HiExternalLink />}
                  onClick={() => navigate(`/jobs/${application.jobId}`)}
                >
                  View Job
                </MenuItem>
                <MenuItem
                  icon={<HiDocumentText />}
                  onClick={() => onViewPDF(application.id, 'resume', 'Your Resume')}
                >
                  View Resume
                </MenuItem>
                <MenuItem
                  icon={<HiEye />}
                  onClick={() => onViewPDF(application.id, 'cover-letter', 'Your Cover Letter')}
                >
                  View Cover Letter
                </MenuItem>
                {canWithdraw && (
                  <>
                    <Divider />
                    <MenuItem
                      icon={<HiTrash />}
                      color="red.500"
                      onClick={() => onWithdraw(application.id)}
                    >
                      Withdraw
                    </MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </HStack>

          <Divider />

          {/* Details */}
          <VStack spacing={2} align="stretch">
            <HStack justify="space-between" fontSize="sm">
              <Text color={mutedColor}>Applied:</Text>
              <Text color={textColor} fontWeight="500">
                {formatDate(application.appliedAt)}
              </Text>
            </HStack>
            {application.location && (
              <HStack justify="space-between" fontSize="sm">
                <Text color={mutedColor}>Location:</Text>
                <Text color={textColor} fontWeight="500">
                  {application.location}
                </Text>
              </HStack>
            )}
          </VStack>

          {/* Actions */}
          {canWithdraw && (
            <>
              <Divider />
              <HStack spacing={2}>
                <Button
                  size="sm"
                  colorScheme="blue"
                  variant="solid"
                  borderRadius="md" // ✅ More rectangular buttons
                  flex={1}
                  onClick={() => navigate(`/jobs/${application.jobId}`)}
                  leftIcon={<HiExternalLink />}
                >
                  View Job
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  borderRadius="md" // ✅ More rectangular buttons
                  flex={1}
                  onClick={() => onWithdraw(application.id)}
                  leftIcon={<HiTrash />}
                >
                  Withdraw
                </Button>
              </HStack>
            </>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default JobSeekerApplicationCard;