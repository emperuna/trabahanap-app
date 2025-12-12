import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  Divider,
  Badge,
  UnorderedList,
  ListItem,
  Alert,
  AlertIcon,
  useColorModeValue,
} from '@chakra-ui/react';

const AccountConfigGuide = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        <Box>
          <Badge colorScheme="purple" mb={3}>Configuration</Badge>
          <Heading size="xl" mb={2}>Configure Your Account</Heading>
          <Text color="gray.600" fontSize="lg">
            Set up your profile and preferences for the best experience
          </Text>
        </Box>

        <Divider />

        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Heading size="md">Personal Information</Heading>
              <Text fontSize="sm" color="gray.600">
                Complete your personal details to help employers or job seekers learn more about you.
              </Text>
              <UnorderedList spacing={2} pl={4}>
                <ListItem fontSize="sm">
                  <Text as="span" fontWeight="semibold">Profile Photo:</Text> Upload a professional photo
                </ListItem>
                <ListItem fontSize="sm">
                  <Text as="span" fontWeight="semibold">Contact Information:</Text> Add your phone number and location
                </ListItem>
                <ListItem fontSize="sm">
                  <Text as="span" fontWeight="semibold">Bio/Summary:</Text> Write a compelling summary about yourself
                </ListItem>
                <ListItem fontSize="sm">
                  <Text as="span" fontWeight="semibold">Social Links:</Text> Connect your LinkedIn, portfolio, or other professional profiles
                </ListItem>
              </UnorderedList>
            </VStack>
          </CardBody>
        </Card>

        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Heading size="md">Account Settings</Heading>
              <Text fontSize="sm" color="gray.600">
                Customize your account preferences and security settings.
              </Text>
              <UnorderedList spacing={2} pl={4}>
                <ListItem fontSize="sm">
                  <Text as="span" fontWeight="semibold">Email Preferences:</Text> Choose what notifications you want to receive
                </ListItem>
                <ListItem fontSize="sm">
                  <Text as="span" fontWeight="semibold">Password & Security:</Text> Update your password and enable two-factor authentication
                </ListItem>
                <ListItem fontSize="sm">
                  <Text as="span" fontWeight="semibold">Privacy Settings:</Text> Control who can view your profile
                </ListItem>
                <ListItem fontSize="sm">
                  <Text as="span" fontWeight="semibold">Language & Region:</Text> Set your preferred language and time zone
                </ListItem>
              </UnorderedList>
            </VStack>
          </CardBody>
        </Card>

        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Heading size="md">Job Seeker Preferences</Heading>
              <UnorderedList spacing={2} pl={4}>
                <ListItem fontSize="sm">
                  <Text as="span" fontWeight="semibold">Job Alerts:</Text> Set criteria for job recommendations
                </ListItem>
                <ListItem fontSize="sm">
                  <Text as="span" fontWeight="semibold">Salary Expectations:</Text> Define your salary range
                </ListItem>
                <ListItem fontSize="sm">
                  <Text as="span" fontWeight="semibold">Work Preferences:</Text> Specify remote, hybrid, or on-site preferences
                </ListItem>
                <ListItem fontSize="sm">
                  <Text as="span" fontWeight="semibold">Job Types:</Text> Choose full-time, part-time, contract, or freelance
                </ListItem>
              </UnorderedList>
            </VStack>
          </CardBody>
        </Card>

        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Heading size="md">Employer Preferences</Heading>
              <UnorderedList spacing={2} pl={4}>
                <ListItem fontSize="sm">
                  <Text as="span" fontWeight="semibold">Company Profile:</Text> Complete your company information
                </ListItem>
                <ListItem fontSize="sm">
                  <Text as="span" fontWeight="semibold">Branding:</Text> Upload company logo and banner
                </ListItem>
                <ListItem fontSize="sm">
                  <Text as="span" fontWeight="semibold">Job Posting Templates:</Text> Create templates for faster job posting
                </ListItem>
                <ListItem fontSize="sm">
                  <Text as="span" fontWeight="semibold">Application Settings:</Text> Configure how you receive applications
                </ListItem>
              </UnorderedList>
            </VStack>
          </CardBody>
        </Card>

        <Alert status="info" borderRadius="lg">
          <AlertIcon />
          <Box>
            <Text fontWeight="semibold" fontSize="sm">Keep Your Profile Updated</Text>
            <Text fontSize="sm">
              Regular updates to your profile increase your chances of getting noticed by 50%.
            </Text>
          </Box>
        </Alert>
      </VStack>
    </Box>
  );
};

export default AccountConfigGuide;
