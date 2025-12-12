import React from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  HStack,
  Icon,
  Divider,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  HiDocument,
  HiBookOpen,
  HiAcademicCap,
  HiLightBulb,
  HiCheckCircle,
  HiCode,
  HiShieldCheck,
  HiClock,
} from 'react-icons/hi';

const DocumentationLibrary = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textPrimary = useColorModeValue('gray.900', 'gray.100');
  const textSecondary = useColorModeValue('gray.600', 'gray.400');

  const documentationSections = [
    {
      category: 'For Job Seekers',
      icon: HiAcademicCap,
      color: 'blue',
      articles: [
        {
          title: 'Creating an Effective Resume',
          description: 'Complete guide on crafting a compelling resume that gets noticed by employers',
          readTime: 12,
          tags: ['Resume', 'Career Tips']
        },
        {
          title: 'Writing a Standout Cover Letter',
          description: 'Learn how to write personalized cover letters that showcase your unique value',
          readTime: 10,
          tags: ['Cover Letter', 'Applications']
        },
        {
          title: 'Job Search Strategies',
          description: 'Effective techniques for finding and applying to the right opportunities',
          readTime: 15,
          tags: ['Job Search', 'Strategy']
        },
        {
          title: 'Interview Preparation Guide',
          description: 'Master the art of interviewing with preparation tips and common questions',
          readTime: 20,
          tags: ['Interview', 'Preparation']
        },
        {
          title: 'Salary Negotiation Tactics',
          description: 'Learn to confidently negotiate your salary and benefits package',
          readTime: 8,
          tags: ['Salary', 'Negotiation']
        },
        {
          title: 'Building Your Professional Network',
          description: 'Strategies for expanding your network and leveraging connections',
          readTime: 12,
          tags: ['Networking', 'Career Growth']
        }
      ]
    },
    {
      category: 'For Employers',
      icon: HiBookOpen,
      color: 'purple',
      articles: [
        {
          title: 'Crafting Job Descriptions',
          description: 'Write clear, compelling job postings that attract qualified candidates',
          readTime: 10,
          tags: ['Job Posting', 'Recruitment']
        },
        {
          title: 'Applicant Tracking Best Practices',
          description: 'Optimize your applicant tracking and screening process',
          readTime: 15,
          tags: ['ATS', 'Hiring Process']
        },
        {
          title: 'Conducting Effective Interviews',
          description: 'Structured interviewing techniques to identify top talent',
          readTime: 18,
          tags: ['Interview', 'Assessment']
        },
        {
          title: 'Building an Employer Brand',
          description: 'Develop a strong employer brand to attract top candidates',
          readTime: 20,
          tags: ['Branding', 'Marketing']
        },
        {
          title: 'Diversity & Inclusion in Hiring',
          description: 'Create an inclusive hiring process that values diverse talent',
          readTime: 12,
          tags: ['Diversity', 'Inclusion']
        },
        {
          title: 'Onboarding New Hires',
          description: 'Best practices for seamless employee onboarding and integration',
          readTime: 14,
          tags: ['Onboarding', 'Retention']
        }
      ]
    },
    {
      category: 'Platform Features',
      icon: HiCode,
      color: 'green',
      articles: [
        {
          title: 'Profile Optimization Guide',
          description: 'Maximize your profile visibility with these optimization tips',
          readTime: 8,
          tags: ['Profile', 'Optimization']
        },
        {
          title: 'Using Advanced Search Filters',
          description: 'Find exactly what you\'re looking for with advanced search features',
          readTime: 6,
          tags: ['Search', 'Features']
        },
        {
          title: 'Application Tracking Dashboard',
          description: 'Manage and track your applications efficiently',
          readTime: 7,
          tags: ['Dashboard', 'Tracking']
        },
        {
          title: 'Messaging System Guide',
          description: 'Communicate effectively with employers or candidates',
          readTime: 5,
          tags: ['Messaging', 'Communication']
        },
        {
          title: 'Notification Settings',
          description: 'Customize your notification preferences to stay informed',
          readTime: 4,
          tags: ['Settings', 'Notifications']
        },
        {
          title: 'Mobile App Features',
          description: 'Access TrabaHanap features on-the-go with our mobile app',
          readTime: 6,
          tags: ['Mobile', 'Apps']
        }
      ]
    },
    {
      category: 'Security & Privacy',
      icon: HiShieldCheck,
      color: 'red',
      articles: [
        {
          title: 'Account Security Best Practices',
          description: 'Keep your account secure with these essential security tips',
          readTime: 8,
          tags: ['Security', 'Account']
        },
        {
          title: 'Privacy Settings Guide',
          description: 'Control your privacy and manage who sees your information',
          readTime: 6,
          tags: ['Privacy', 'Settings']
        },
        {
          title: 'Data Protection Policy',
          description: 'Understand how we protect and handle your personal data',
          readTime: 10,
          tags: ['Privacy', 'Data']
        },
        {
          title: 'Two-Factor Authentication',
          description: 'Enable 2FA for enhanced account protection',
          readTime: 5,
          tags: ['Security', '2FA']
        }
      ]
    }
  ];

  const keyFeatures = [
    'Comprehensive career guidance articles',
    'Step-by-step tutorials and how-to guides',
    'Industry best practices and insights',
    'Regular updates with new content',
    'Searchable knowledge base',
    'Expert tips and recommendations'
  ];

  return (
    <Box>
      <VStack spacing={8} align="stretch">
        {/* Header Section */}
        <Box>
          <VStack spacing={4} align="start">
            <Badge colorScheme="blue" fontSize="sm" px={3} py={1} borderRadius="full">
              Documentation Library
            </Badge>
            <Heading size="2xl" color={textPrimary}>
              Comprehensive Resource Library
            </Heading>
            <Text fontSize="lg" color={textSecondary} maxW="3xl">
              Access our extensive collection of guides, tutorials, and documentation to help you make the most of TrabaHanap. 
              Whether you're a job seeker or employer, find answers and best practices for every step of your journey.
            </Text>
          </VStack>
        </Box>

        <Divider />

        {/* Key Features Section */}
        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <HStack spacing={2}>
                <Icon as={HiLightBulb} color="yellow.500" boxSize={6} />
                <Heading size="md" color={textPrimary}>
                  What's in the Library?
                </Heading>
              </HStack>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                {keyFeatures.map((feature, index) => (
                  <HStack key={index} spacing={2} align="start">
                    <Icon as={HiCheckCircle} color="green.500" mt={1} />
                    <Text fontSize="sm" color={textSecondary}>
                      {feature}
                    </Text>
                  </HStack>
                ))}
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Documentation Sections */}
        {documentationSections.map((section, sectionIndex) => (
          <Box key={sectionIndex}>
            <VStack spacing={4} align="stretch">
              <HStack spacing={3} mb={2}>
                <Icon as={section.icon} color={`${section.color}.500`} boxSize={7} />
                <Heading size="lg" color={textPrimary}>
                  {section.category}
                </Heading>
              </HStack>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                {section.articles.map((article, articleIndex) => (
                  <Card
                    key={articleIndex}
                    bg={cardBg}
                    border="1px"
                    borderColor={borderColor}
                    _hover={{
                      borderColor: `${section.color}.300`,
                      shadow: 'md',
                      transform: 'translateY(-2px)'
                    }}
                    transition="all 0.2s"
                    cursor="pointer"
                  >
                    <CardBody>
                      <VStack spacing={3} align="start" h="full">
                        <VStack spacing={2} align="start" flex={1}>
                          <Heading size="sm" color={textPrimary}>
                            {article.title}
                          </Heading>
                          <Text fontSize="sm" color={textSecondary} noOfLines={3}>
                            {article.description}
                          </Text>
                        </VStack>

                        <HStack spacing={2} flexWrap="wrap">
                          {article.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              colorScheme={section.color}
                              variant="subtle"
                              fontSize="xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </HStack>

                        <HStack spacing={2} color={textSecondary} fontSize="xs" pt={2}>
                          <Icon as={HiClock} />
                          <Text>{article.readTime} min read</Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </VStack>

            {sectionIndex < documentationSections.length - 1 && <Divider mt={8} />}
          </Box>
        ))}

        {/* Footer Section */}
        <Card bg="blue.50" borderColor="blue.200" border="1px">
          <CardBody>
            <VStack spacing={4} align="center" textAlign="center">
              <Icon as={HiDocument} color="blue.500" boxSize={10} />
              <VStack spacing={2}>
                <Heading size="md" color="blue.800">
                  Can't Find What You're Looking For?
                </Heading>
                <Text color="blue.700" fontSize="sm">
                  Our documentation library is constantly growing. If you need help with a specific topic, 
                  please contact our support team or check our FAQ section.
                </Text>
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default DocumentationLibrary;
