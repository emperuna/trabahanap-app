import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Badge,
  Divider,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

const FAQSection = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const jobSeekerFAQs = [
    {
      question: 'How do I create an account?',
      answer: 'Click on the "Register" button in the top right corner, select "Job Seeker" as your account type, and fill in your details. You\'ll receive a verification email to activate your account.'
    },
    {
      question: 'Is TrabaHanap free for job seekers?',
      answer: 'Yes! TrabaHanap is completely free for job seekers. You can search for jobs, apply to unlimited positions, and use all our tools at no cost.'
    },
    {
      question: 'How do I apply for jobs?',
      answer: 'Browse jobs using our search feature, click on a job listing to view details, and click the "Apply Now" button. Make sure your profile and resume are up to date before applying.'
    },
    {
      question: 'Can I edit my application after submitting?',
      answer: 'Unfortunately, once an application is submitted, it cannot be edited. However, you can update your profile and resume for future applications.'
    },
    {
      question: 'How can I track my applications?',
      answer: 'Go to your Dashboard and click on "Applications" in the sidebar. You\'ll see all your applications with their current status (Pending, Reviewed, Interview, etc.).'
    },
    {
      question: 'Why am I not receiving application responses?',
      answer: 'Ensure your profile is complete (at least 80%), your resume is up to date, and you\'re tailoring your applications to match job requirements. Some positions receive hundreds of applications, so patience is key.'
    },
    {
      question: 'How do I save jobs for later?',
      answer: 'Click the heart icon on any job listing to save it to your "Saved Jobs" list. Access your saved jobs from your dashboard.'
    },
    {
      question: 'Can I delete my account?',
      answer: 'Yes, go to Settings > Account > Delete Account. Note that this action is permanent and will remove all your data from our system.'
    }
  ];

  const employerFAQs = [
    {
      question: 'How much does it cost to post a job?',
      answer: 'We offer flexible pricing plans. Basic job posting starts at ₱999 for 30 days. Premium plans include additional features like priority placement and candidate search access.'
    },
    {
      question: 'How long does my job posting stay active?',
      answer: 'Standard job postings remain active for 30 days. You can renew or close a posting at any time from your dashboard.'
    },
    {
      question: 'Can I edit a job posting after publishing?',
      answer: 'Yes, you can edit your job postings at any time. Go to "Manage Jobs" in your dashboard, select the job, and click "Edit".'
    },
    {
      question: 'How do I review applications?',
      answer: 'Applications appear in your "Applications" section. You can filter by job, view candidate profiles, download resumes, and change application statuses.'
    },
    {
      question: 'Can I search for candidates directly?',
      answer: 'Yes, premium plans include access to our candidate database where you can search for qualified professionals based on skills, experience, and location.'
    },
    {
      question: 'How do I contact applicants?',
      answer: 'Use our built-in messaging system to communicate with candidates. You can also see their contact information once they apply to your jobs.'
    },
    {
      question: 'What if I receive too many unqualified applications?',
      answer: 'Use screening questions when posting jobs to filter candidates. You can also set specific requirements that applicants must meet before applying.'
    },
    {
      question: 'Can I pause a job posting?',
      answer: 'Yes, you can pause or close job postings at any time without losing the remaining posting duration.'
    }
  ];

  const technicalFAQs = [
    {
      question: 'Which file formats can I upload for my resume?',
      answer: 'We accept PDF, DOC, and DOCX formats. We recommend PDF for best compatibility. Maximum file size is 5MB.'
    },
    {
      question: 'Why can\'t I log in to my account?',
      answer: 'First, verify your email if you just registered. If you forgot your password, use the "Forgot Password" link. Clear your browser cache or try a different browser if issues persist.'
    },
    {
      question: 'Is my data secure on TrabaHanap?',
      answer: 'Yes, we use industry-standard encryption and security measures. Your data is stored securely and we never share your information without your consent.'
    },
    {
      question: 'Can I use TrabaHanap on mobile devices?',
      answer: 'Yes, TrabaHanap is fully responsive and works on all devices. We also have mobile apps for iOS and Android coming soon.'
    },
    {
      question: 'Why are job alerts not working?',
      answer: 'Check your notification settings and ensure your email address is verified. Also check your spam folder as notifications might be filtered there.'
    },
    {
      question: 'How do I change my email address?',
      answer: 'Go to Settings > Account > Email Settings. Enter your new email and verify it through the confirmation link sent to the new address.'
    }
  ];

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        <Box>
          <Badge colorScheme="purple" mb={3}>FAQ</Badge>
          <Heading size="xl" mb={2}>Frequently Asked Questions</Heading>
          <Text color="gray.600" fontSize="lg">
            Find answers to common questions about TrabaHanap
          </Text>
        </Box>

        <Divider />

        <Tabs colorScheme="blue" variant="enclosed">
          <TabList>
            <Tab>Job Seekers</Tab>
            <Tab>Employers</Tab>
            <Tab>Technical</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              <Accordion allowMultiple>
                {jobSeekerFAQs.map((faq, index) => (
                  <AccordionItem key={index} border="1px" borderColor={borderColor} borderRadius="lg" mb={3}>
                    <AccordionButton py={4}>
                      <Box flex="1" textAlign="left">
                        <Text fontWeight="semibold">{faq.question}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Text fontSize="sm" color="gray.600">
                        {faq.answer}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabPanel>

            <TabPanel px={0}>
              <Accordion allowMultiple>
                {employerFAQs.map((faq, index) => (
                  <AccordionItem key={index} border="1px" borderColor={borderColor} borderRadius="lg" mb={3}>
                    <AccordionButton py={4}>
                      <Box flex="1" textAlign="left">
                        <Text fontWeight="semibold">{faq.question}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Text fontSize="sm" color="gray.600">
                        {faq.answer}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabPanel>

            <TabPanel px={0}>
              <Accordion allowMultiple>
                {technicalFAQs.map((faq, index) => (
                  <AccordionItem key={index} border="1px" borderColor={borderColor} borderRadius="lg" mb={3}>
                    <AccordionButton py={4}>
                      <Box flex="1" textAlign="left">
                        <Text fontWeight="semibold">{faq.question}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Text fontSize="sm" color="gray.600">
                        {faq.answer}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default FAQSection;
