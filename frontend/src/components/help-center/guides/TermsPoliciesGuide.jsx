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
  Link,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

const TermsPoliciesGuide = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        <Box>
          <Badge colorScheme="green" mb={3}>Legal</Badge>
          <Heading size="xl" mb={2}>Important Terms & Policies</Heading>
          <Text color="gray.600" fontSize="lg">
            Understand our policies and your rights on TrabaHanap
          </Text>
        </Box>

        <Divider />

        <Accordion allowMultiple>
          <AccordionItem border="1px" borderColor={borderColor} borderRadius="lg" mb={4}>
            <AccordionButton py={4}>
              <Box flex="1" textAlign="left">
                <Heading size="sm">Terms of Service</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <VStack spacing={3} align="stretch">
                <Text fontSize="sm" color="gray.600">
                  By using TrabaHanap, you agree to the following terms:
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Account Responsibility:</Text> You are responsible for maintaining
                  the confidentiality of your account credentials and all activities under your account.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Accurate Information:</Text> You must provide accurate, current,
                  and complete information when creating your profile.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Prohibited Activities:</Text> You may not use our platform for
                  any unlawful purpose or engage in fraudulent activities.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Content Ownership:</Text> You retain ownership of content you post,
                  but grant us license to use it on our platform.
                </Text>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="1px" borderColor={borderColor} borderRadius="lg" mb={4}>
            <AccordionButton py={4}>
              <Box flex="1" textAlign="left">
                <Heading size="sm">Privacy Policy</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <VStack spacing={3} align="stretch">
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Data Collection:</Text> We collect information you provide directly,
                  such as your profile details, resume, and application history.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Data Usage:</Text> Your data is used to match you with relevant
                  opportunities and improve our services.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Data Sharing:</Text> We share your profile with employers only
                  when you apply for jobs or opt-in to being discoverable.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Data Security:</Text> We implement industry-standard security
                  measures to protect your information.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Your Rights:</Text> You can access, modify, or delete your
                  personal data at any time through your account settings.
                </Text>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="1px" borderColor={borderColor} borderRadius="lg" mb={4}>
            <AccordionButton py={4}>
              <Box flex="1" textAlign="left">
                <Heading size="sm">Cookie Policy</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <VStack spacing={3} align="stretch">
                <Text fontSize="sm" color="gray.600">
                  We use cookies and similar technologies to enhance your experience:
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Essential Cookies:</Text> Required for basic functionality
                  like authentication and security.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Analytics Cookies:</Text> Help us understand how you use
                  our platform to improve services.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Preference Cookies:</Text> Remember your settings and
                  preferences for a personalized experience.
                </Text>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="1px" borderColor={borderColor} borderRadius="lg" mb={4}>
            <AccordionButton py={4}>
              <Box flex="1" textAlign="left">
                <Heading size="sm">Community Guidelines</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <VStack spacing={3} align="stretch">
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Respect:</Text> Treat all users with professionalism and courtesy.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Authenticity:</Text> Post only genuine job opportunities and
                  provide truthful information.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">No Discrimination:</Text> We prohibit discrimination based on
                  race, gender, age, religion, or any protected characteristic.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Professional Communication:</Text> Maintain professional standards
                  in all interactions on the platform.
                </Text>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="1px" borderColor={borderColor} borderRadius="lg">
            <AccordionButton py={4}>
              <Box flex="1" textAlign="left">
                <Heading size="sm">Refund & Cancellation Policy</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <VStack spacing={3} align="stretch">
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Subscription Cancellation:</Text> You can cancel your
                  subscription at any time from your account settings.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Refund Eligibility:</Text> Refunds are provided within
                  14 days of purchase if services are unused.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="semibold">Job Post Credits:</Text> Unused job posting credits do
                  not expire and remain in your account.
                </Text>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={3}>
              <Text fontSize="sm" fontWeight="semibold">Need More Information?</Text>
              <Text fontSize="sm" color="gray.600" textAlign="center">
                If you have questions about our policies, please contact our legal team at{' '}
                <Link color="blue.500" href="mailto:legal@trabahanap.com">
                  legal@trabahanap.com
                </Link>
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default TermsPoliciesGuide;
