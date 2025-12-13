import React from 'react';
import {
  Card, CardBody, VStack, HStack, Avatar, Box, Heading, Badge, Icon, Divider, Text,
  useColorModeValue, Flex, List, ListItem, ListIcon
} from '@chakra-ui/react';
import {
  HiLocationMarker,
  HiCurrencyDollar,
  HiBriefcase,
  HiClock,
  HiCheckCircle,
  HiOfficeBuilding
} from 'react-icons/hi';

const JobDetailCard = ({
  job,
  cardBg,
  textColor,
  mutedColor,
  formatSalary,
  formatDate
}) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const sectionBg = useColorModeValue('gray.50', 'gray.750');
  const accentColor = useColorModeValue('blue.600', 'blue.400');

  // Parse list items from text (handles bullet points or newlines)
  const parseListItems = (text) => {
    if (!text) return [];
    return text
      .split(/[\n•\-]/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
  };

  return (
    <Card 
      bg={cardBg} 
      borderRadius="xl" 
      shadow="sm"
      border="1px"
      borderColor={borderColor}
      overflow="hidden"
    >
      <CardBody p={0}>
        {/* Company Header */}
        <Box px={6} py={6} borderBottom="1px" borderColor={borderColor}>
          <HStack spacing={4} align="start">
            <Avatar
              size="lg"
              name={job.company}
              src={job.companyLogo || undefined}
              bg="blue.500"
              color="white"
            />
            <VStack align="start" spacing={1} flex={1}>
              <HStack spacing={2}>
                <Icon as={HiOfficeBuilding} color={mutedColor} boxSize={4} />
                <Text fontSize="sm" color={mutedColor} fontWeight="500">
                  {job.company}
                </Text>
              </HStack>
              <Heading size="lg" color={textColor} fontWeight="700" lineHeight="1.2">
                {job.title}
              </Heading>
            </VStack>
          </HStack>
        </Box>

        {/* Key Details Bar */}
        <Box px={6} py={4} bg={sectionBg}>
          <Flex gap={4} flexWrap="wrap" justify="start">
            <HStack spacing={2}>
              <Icon as={HiLocationMarker} color={accentColor} boxSize={4} />
              <Text fontSize="sm" fontWeight="500" color={textColor}>
                {job.location}
              </Text>
            </HStack>
            
            <HStack spacing={2}>
              <Icon as={HiCurrencyDollar} color="green.500" boxSize={4} />
              <Text fontSize="sm" fontWeight="600" color="green.600">
                {formatSalary(job.salary)}
              </Text>
            </HStack>

            <HStack spacing={2}>
              <Icon as={HiBriefcase} color={accentColor} boxSize={4} />
              <Text fontSize="sm" fontWeight="500" color={textColor}>
                {job.jobType || 'Full-time'}
              </Text>
            </HStack>

            <HStack spacing={2}>
              <Icon as={HiClock} color={mutedColor} boxSize={4} />
              <Text fontSize="sm" color={mutedColor}>
                {formatDate(job.createdAt)}
              </Text>
            </HStack>
          </Flex>

          {/* Tags */}
          <HStack spacing={2} mt={3} flexWrap="wrap">
            {job.level && (
              <Badge colorScheme="purple" variant="subtle" px={2} py={0.5} borderRadius="md" fontSize="xs">
                {job.level}
              </Badge>
            )}
            {job.department && (
              <Badge colorScheme="blue" variant="subtle" px={2} py={0.5} borderRadius="md" fontSize="xs">
                {job.department}
              </Badge>
            )}
            {job.workType && (
              <Badge colorScheme="green" variant="subtle" px={2} py={0.5} borderRadius="md" fontSize="xs">
                {job.workType}
              </Badge>
            )}
          </HStack>
        </Box>

        {/* Job Description */}
        <Box px={6} py={6}>
          <Heading size="sm" color={textColor} mb={3} fontWeight="600">
            About This Role
          </Heading>
          <Text 
            color={textColor} 
            lineHeight="1.8" 
            fontSize="md"
            whiteSpace="pre-line"
          >
            {job.description || 'No description provided.'}
          </Text>
        </Box>

        {/* Responsibilities */}
        {job.responsibilities && (
          <>
            <Divider />
            <Box px={6} py={6}>
              <Heading size="sm" color={textColor} mb={4} fontWeight="600">
                Key Responsibilities
              </Heading>
              <List spacing={2}>
                {parseListItems(job.responsibilities).map((item, index) => (
                  <ListItem key={index} display="flex" alignItems="start">
                    <ListIcon as={HiCheckCircle} color="green.500" mt={1} />
                    <Text color={textColor} lineHeight="1.6" fontSize="md">
                      {item}
                    </Text>
                  </ListItem>
                ))}
              </List>
            </Box>
          </>
        )}

        {/* Requirements */}
        {job.requirements && (
          <>
            <Divider />
            <Box px={6} py={6}>
              <Heading size="sm" color={textColor} mb={4} fontWeight="600">
                Requirements
              </Heading>
              <List spacing={2}>
                {parseListItems(job.requirements).map((item, index) => (
                  <ListItem key={index} display="flex" alignItems="start">
                    <ListIcon as={HiCheckCircle} color="blue.500" mt={1} />
                    <Text color={textColor} lineHeight="1.6" fontSize="md">
                      {item}
                    </Text>
                  </ListItem>
                ))}
              </List>
            </Box>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default JobDetailCard;