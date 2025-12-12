import React from 'react';
import {
  Card, CardBody, VStack, Flex, Avatar, Box, Heading, HStack, Badge, Icon, Divider, Text
} from '@chakra-ui/react';
import {
  HiLocationMarker,
  HiCurrencyDollar
} from 'react-icons/hi';

const JobDetailCard = ({
  job,
  cardBg,
  textColor,
  mutedColor,
  formatSalary,
  formatDate
}) => (
  <Card bg={cardBg} borderRadius="2xl" shadow="lg" p={0}>
    <CardBody p={0} position="relative">
      {/* Gradient background behind avatar */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="110px"
        bgGradient="linear(120deg, brand.500 0%, brand.500 25%, blue.600 25%, blue.600 50%, blue.700 50%, blue.700 75%, blue.800 75%, blue.800 100%)"
        borderTopRadius="2xl"
        zIndex={1}
      />
      <VStack spacing={0} align="stretch" position="relative" zIndex={2}>
        {/* Avatar Section */}
        <Flex
          justify="center"
          align="center"
          pt={16}
          position="relative"
        >
          <Avatar
            size="xl"
            name={job.company}
            src={job.companyLogo || undefined}
            border="6px solid white"
            bg="gray.200"
            position="relative"
            zIndex={2}
          />
        </Flex>
        {/* Title & Meta */}
        <Box px={{ base: 6, md: 12 }} pb={6}>
          <Heading size="2xl" color="blue.500" fontWeight="bold" mb={2}>
            {job.title}
          </Heading>
          <HStack spacing={6} flexWrap="wrap" mb={4}>
            <HStack spacing={1}>
              <Icon as={HiLocationMarker} color={mutedColor} />
              <Text color={mutedColor} fontWeight="medium">
                {job.location}
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Badge colorScheme="gray" fontWeight="medium" px={2} py={1} borderRadius="md">
                {job.level || 'Senior'}
              </Badge>
            </HStack>
            <HStack spacing={1}>
              <Badge colorScheme="gray" fontWeight="medium" px={2} py={1} borderRadius="md">
                {job.department || 'Development'}
              </Badge>
            </HStack>
            <HStack spacing={1}>
              <Badge colorScheme="gray" fontWeight="medium" px={2} py={1} borderRadius="md">
                {job.jobType || 'Full-time'}
              </Badge>
            </HStack>
            <HStack spacing={1}>
              <Icon as={HiCurrencyDollar} color={mutedColor} />
              <Text color={mutedColor} fontWeight="medium">
                {formatSalary(job.salary)}
              </Text>
            </HStack>
          </HStack>
          <Text color={mutedColor} fontSize="sm" mb={2}>
            Posted on: {formatDate(job.createdAt)}
          </Text>
        </Box>
        <Divider />
        {/* Job Description */}
        <Box px={{ base: 6, md: 12 }} py={8}>
          <Heading size="md" color={textColor} mb={4}>Job Description</Heading>
          <Text color={textColor} lineHeight="1.8" whiteSpace="pre-line">
            {job.description || 'No description provided.'}
          </Text>
        </Box>
        {/* Responsibilities */}
        {job.responsibilities && (
          <Box px={{ base: 6, md: 12 }} pb={8}>
            <Heading size="md" color={textColor} mb={4}>Responsibilities</Heading>
            <Text color={textColor} lineHeight="1.8" whiteSpace="pre-line">
              {job.responsibilities}
            </Text>
          </Box>
        )}
        {/* Requirements */}
        {job.requirements && (
          <Box px={{ base: 6, md: 12 }} pb={8}>
            <Heading size="md" color={textColor} mb={4}>Job Requirements</Heading>
            <Text color={textColor} lineHeight="1.8" whiteSpace="pre-line">
              {job.requirements}
            </Text>
          </Box>
        )}
      </VStack>
    </CardBody>
  </Card>
);

export default JobDetailCard;