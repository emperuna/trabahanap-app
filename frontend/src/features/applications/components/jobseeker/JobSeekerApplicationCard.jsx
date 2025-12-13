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
  Box,
  Avatar,
  Flex,
} from '@chakra-ui/react';
import {
  HiDotsVertical,
  HiEye,
  HiTrash,
  HiExternalLink,
  HiDocumentText,
  HiCalendar,
  HiLocationMarker,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { StatusBadge } from '../shared';

// Get status-based colors for visual accents
const getStatusAccent = (status) => {
  const statusUpper = status?.toUpperCase();
  switch (statusUpper) {
    case 'ACCEPTED':
      return { gradient: 'linear(to-r, green.400, green.500)', color: 'green' };
    case 'REJECTED':
      return { gradient: 'linear(to-r, red.400, red.500)', color: 'red' };
    case 'INTERVIEW':
      return { gradient: 'linear(to-r, purple.400, purple.500)', color: 'purple' };
    case 'REVIEWED':
      return { gradient: 'linear(to-r, blue.400, blue.500)', color: 'blue' };
    default:
      return { gradient: 'linear(to-r, yellow.400, yellow.500)', color: 'yellow' };
  }
};

// Get company initials from company name
const getCompanyInitials = (companyName) => {
  if (!companyName) return '??';
  const words = companyName.trim().split(' ');
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
};

const JobSeekerApplicationCard = ({ application, onWithdraw, onViewPDF }) => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');
  const labelColor = useColorModeValue('gray.400', 'gray.500');

  const statusAccent = getStatusAccent(application.status);
  const companyInitials = getCompanyInitials(application.company);

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
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        shadow: 'lg',
        transform: 'translateY(-4px)',
        borderColor: `${statusAccent.color}.300`,
      }}
    >
      {/* Status Accent Bar */}
      <Box h="4px" bgGradient={statusAccent.gradient} />

      <CardBody pt={4}>
        <VStack spacing={4} align="stretch">
          {/* Header with Company Avatar */}
          <HStack justify="space-between" align="start">
            <HStack spacing={3} flex={1}>
              <Avatar
                size="md"
                name={application.company || 'Company'}
                bg={`${statusAccent.color}.500`}
                color="white"
                fontWeight="700"
                borderRadius="lg"
              />
              <VStack align="start" spacing={0} flex={1}>
                <Text
                  fontSize="md"
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
              </VStack>
            </HStack>

            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HiDotsVertical />}
                variant="ghost"
                size="sm"
                borderRadius="md"
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

          {/* Status Badge */}
          <Box>
            <StatusBadge status={application.status} size="sm" />
          </Box>

          <Divider />

          {/* Details Grid */}
          <VStack spacing={2} align="stretch">
            <HStack justify="space-between" fontSize="sm">
              <HStack spacing={1} color={labelColor}>
                <Icon as={HiCalendar} boxSize={4} />
                <Text>Applied</Text>
              </HStack>
              <Text color={textColor} fontWeight="500">
                {formatDate(application.appliedAt)}
              </Text>
            </HStack>
            {application.location && (
              <HStack justify="space-between" fontSize="sm">
                <HStack spacing={1} color={labelColor}>
                  <Icon as={HiLocationMarker} boxSize={4} />
                  <Text>Location</Text>
                </HStack>
                <Text color={textColor} fontWeight="500" noOfLines={1} maxW="150px">
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
                  borderRadius="md"
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
                  borderRadius="md"
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