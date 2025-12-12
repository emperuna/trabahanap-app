import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  OrderedList,
  ListItem,
  Card,
  CardBody,
  Code,
  Divider,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';

const QuickStartGuide = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const codeBg = useColorModeValue('gray.100', 'gray.900');

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        <Box>
          <Badge colorScheme="blue" mb={3}>Guide</Badge>
          <Heading size="xl" mb={2}>Quick Start Guide</Heading>
          <Text color="gray.600" fontSize="lg">
            Get started with TrabaHanap in just 5 minutes
          </Text>
        </Box>

        <Divider />

        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Heading size="md">For Job Seekers</Heading>
              <OrderedList spacing={3}>
                <ListItem>
                  <Text fontWeight="semibold" mb={1}>Create Your Account</Text>
                  <Text fontSize="sm" color="gray.600">
                    Sign up using your email address and complete the registration process.
                    Choose "Job Seeker" as your account type.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="semibold" mb={1}>Complete Your Profile</Text>
                  <Text fontSize="sm" color="gray.600">
                    Add your personal information, work experience, education, and skills.
                    A complete profile increases your visibility to employers by 300%.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="semibold" mb={1}>Upload Your Resume</Text>
                  <Text fontSize="sm" color="gray.600">
                    Upload your CV in PDF format. Our system will parse it automatically
                    to fill in your profile details.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="semibold" mb={1}>Search for Jobs</Text>
                  <Text fontSize="sm" color="gray.600">
                    Use our advanced search filters to find jobs matching your skills,
                    location preferences, and salary expectations.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="semibold" mb={1}>Apply & Track</Text>
                  <Text fontSize="sm" color="gray.600">
                    Apply to jobs with one click and track all your applications from
                    your dashboard. Receive real-time notifications on application status.
                  </Text>
                </ListItem>
              </OrderedList>
            </VStack>
          </CardBody>
        </Card>

        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Heading size="md">For Employers</Heading>
              <OrderedList spacing={3}>
                <ListItem>
                  <Text fontWeight="semibold" mb={1}>Register Your Company</Text>
                  <Text fontSize="sm" color="gray.600">
                    Create an employer account and provide your company details,
                    including company name, industry, and size.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="semibold" mb={1}>Post Your First Job</Text>
                  <Text fontSize="sm" color="gray.600">
                    Click "Post Job" and fill in the job details including title,
                    description, requirements, and compensation.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="semibold" mb={1}>Review Applications</Text>
                  <Text fontSize="sm" color="gray.600">
                    Receive applications directly in your dashboard. Filter and
                    shortlist candidates based on their qualifications.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="semibold" mb={1}>Manage Candidates</Text>
                  <Text fontSize="sm" color="gray.600">
                    Track candidates through your hiring pipeline. Schedule interviews
                    and communicate directly through our platform.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="semibold" mb={1}>Find the Perfect Match</Text>
                  <Text fontSize="sm" color="gray.600">
                    Use our candidate search to find qualified professionals who
                    match your job requirements.
                  </Text>
                </ListItem>
              </OrderedList>
            </VStack>
          </CardBody>
        </Card>

        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardBody>
            <Heading size="sm" mb={3}>Pro Tips 💡</Heading>
            <VStack spacing={2} align="stretch">
              <Text fontSize="sm" color="gray.600">
                • Complete your profile to 100% to stand out to employers
              </Text>
              <Text fontSize="sm" color="gray.600">
                • Set up job alerts to get notified of new opportunities
              </Text>
              <Text fontSize="sm" color="gray.600">
                • Use specific keywords in your profile to improve searchability
              </Text>
              <Text fontSize="sm" color="gray.600">
                • Keep your profile updated with your latest skills and experience
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default QuickStartGuide;
