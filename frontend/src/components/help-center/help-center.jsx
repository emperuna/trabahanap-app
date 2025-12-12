import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  SimpleGrid,
  Button,
  Icon,
  Heading,
  Text,
  Divider,
  Flex,
  Card,
  CardBody,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  HiBookOpen, 
  HiQuestionMarkCircle, 
  HiUserGroup,
  HiDownload,
  HiCog,
  HiDocument,
  HiArrowLeft,
} from 'react-icons/hi';
import {
  QuickStartGuide,
  AccountConfigGuide,
  TermsPoliciesGuide,
  FAQSection,
  CommunitySection,
  DocumentationLibrary,
} from './guides';
import {
  SearchSection,
  CategoryCard,
  GettingStartedSection,
  AdditionalResources,
  TextGuideCard,
} from './components';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuide, setSelectedGuide] = useState(null);

  const categories = [
    {
      icon: HiBookOpen,
      title: 'Guides',
      description: 'Step by step guides to get you started',
      bgColor: useColorModeValue('blue.50', 'blue.900'),
      iconColor: useColorModeValue('blue.500', 'blue.300'),
      action: () => setSelectedGuide('guides')
    },
    {
      icon: HiQuestionMarkCircle,
      title: 'FAQ',
      description: 'Find answers to common questions',
      bgColor: useColorModeValue('purple.50', 'purple.900'),
      iconColor: useColorModeValue('purple.500', 'purple.300'),
      action: () => setSelectedGuide('faq')
    },
    {
      icon: HiUserGroup,
      title: 'Community',
      description: 'Connect with other users',
      bgColor: useColorModeValue('green.50', 'green.900'),
      iconColor: useColorModeValue('green.500', 'green.300'),
      action: () => setSelectedGuide('community')
    }
  ];

  const gettingStartedItems = [
    {
      icon: HiDownload,
      title: 'Quick Start',
      description: 'Get started in 5 minutes',
      guideId: 'quickstart',
      keywords: ['start', 'begin', 'onboarding', 'setup', 'first steps']
    },
    {
      icon: HiCog,
      title: 'Configure your account',
      description: 'Set up your profile and preferences',
      guideId: 'config',
      keywords: ['settings', 'profile', 'preferences', 'account', 'configuration']
    },
    {
      icon: HiDocument,
      title: 'Important terms & policies',
      description: 'Learn about our policies',
      guideId: 'terms',
      keywords: ['privacy', 'terms', 'policies', 'legal', 'conditions']
    }
  ];

  const additionalGuides = [
    {
      title: 'Job Posting Best Practices',
      description: 'Learn how to write compelling job descriptions that attract top talent',
      category: 'Guide',
      readTime: 8,
      guideId: 'job-posting',
      keywords: ['job', 'posting', 'description', 'employer', 'hiring', 'recruitment']
    },
    {
      title: 'Candidate Screening Tips',
      description: 'Effective strategies for reviewing applications and identifying qualified candidates',
      category: 'Tutorial',
      readTime: 10,
      guideId: 'screening',
      keywords: ['screening', 'review', 'applications', 'candidates', 'employer']
    },
    {
      title: 'Interview Best Practices',
      description: 'Master the art of conducting professional and effective interviews',
      category: 'Guide',
      readTime: 12,
      guideId: 'interviews',
      keywords: ['interview', 'questions', 'hiring', 'employer', 'assessment']
    },
    {
      title: 'Employer Branding Guide',
      description: 'Build a strong employer brand to attract the best candidates',
      category: 'Guide',
      readTime: 15,
      guideId: 'branding',
      keywords: ['branding', 'marketing', 'employer', 'reputation', 'company']
    },
    {
      title: 'Salary & Benefits Guide',
      description: 'How to structure competitive compensation packages',
      category: 'Documentation',
      readTime: 7,
      guideId: 'compensation',
      keywords: ['salary', 'benefits', 'compensation', 'pay', 'package']
    },
    {
      title: 'Hiring Analytics',
      description: 'Use data and insights to improve your recruitment process',
      category: 'Tutorial',
      readTime: 9,
      guideId: 'analytics',
      keywords: ['analytics', 'data', 'metrics', 'insights', 'reporting']
    }
  ];

  const documentationArticles = [
    {
      title: 'Creating an Effective Resume',
      description: 'Complete guide on crafting a compelling resume that gets noticed by employers',
      category: 'Job Seeker',
      readTime: 12,
      guideId: 'documentation',
      keywords: ['resume', 'cv', 'job seeker', 'application', 'career']
    },
    {
      title: 'Writing a Standout Cover Letter',
      description: 'Learn how to write personalized cover letters that showcase your unique value',
      category: 'Job Seeker',
      readTime: 10,
      guideId: 'documentation',
      keywords: ['cover letter', 'application', 'job seeker', 'writing']
    },
    {
      title: 'Job Search Strategies',
      description: 'Effective techniques for finding and applying to the right opportunities',
      category: 'Job Seeker',
      readTime: 15,
      guideId: 'documentation',
      keywords: ['job search', 'strategy', 'opportunities', 'career', 'job seeker']
    },
    {
      title: 'Profile Optimization Guide',
      description: 'Maximize your profile visibility with these optimization tips',
      category: 'Platform',
      readTime: 8,
      guideId: 'documentation',
      keywords: ['profile', 'optimization', 'visibility', 'account', 'settings']
    },
    {
      title: 'Account Security Best Practices',
      description: 'Keep your account secure with these essential security tips',
      category: 'Security',
      readTime: 8,
      guideId: 'documentation',
      keywords: ['security', 'password', 'account', 'safety', 'protection']
    }
  ];

  // Comprehensive search function across all content
  const searchAllContent = (query) => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    const allContent = [
      ...gettingStartedItems,
      ...additionalGuides,
      ...documentationArticles,
      ...categories.map(cat => ({
        title: cat.title,
        description: cat.description,
        guideId: cat.title.toLowerCase(),
        keywords: []
      }))
    ];
    
    return allContent.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery);
      const descriptionMatch = item.description.toLowerCase().includes(lowerQuery);
      const keywordMatch = item.keywords?.some(keyword => keyword.toLowerCase().includes(lowerQuery));
      const categoryMatch = item.category?.toLowerCase().includes(lowerQuery);
      
      return titleMatch || descriptionMatch || keywordMatch || categoryMatch;
    });
  };

  // Get guide title by ID
  const getGuideTitle = (guideId) => {
    const guideMap = {
      'quickstart': 'Quick Start Guide',
      'config': 'Account Configuration',
      'terms': 'Terms & Policies',
      'faq': 'Frequently Asked Questions',
      'community': 'Community',
      'guides': 'All Guides'
    };
    return guideMap[guideId] || 'Guide';
  };

  // Navigate to specific guide section
  const navigateToGuide = (guideId) => {
    setSelectedGuide(guideId);
    // Scroll to top when opening guide
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to help center home
  const resetToHome = () => {
    setSelectedGuide(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if guide is available
  const isGuideAvailable = (guideId) => {
    const availableGuides = ['quickstart', 'config', 'terms', 'faq', 'community', 'guides'];
    return availableGuides.includes(guideId);
  };

  const handleGuideSelect = (guideId) => {
    if (isGuideAvailable(guideId)) {
      navigateToGuide(guideId);
    }
  };

  const renderGuideContent = () => {
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textSecondary = useColorModeValue('gray.600', 'gray.400');
    const iconBg = useColorModeValue('blue.50', 'blue.900');
    const iconColor = useColorModeValue('blue.500', 'blue.300');

    switch (selectedGuide) {
      case 'quickstart':
        return <QuickStartGuide />;
      case 'config':
        return <AccountConfigGuide />;
      case 'terms':
        return <TermsPoliciesGuide />;
      case 'faq':
        return <FAQSection />;
      case 'community':
        return <CommunitySection />;
      case 'documentation':
        return <DocumentationLibrary />;
      case 'guides':
        
        return (
          <Box>
            <VStack spacing={6} align="stretch">
              <Box>
                <Heading size="xl" mb={2}>All Guides</Heading>
                <Text color={textSecondary} fontSize="lg">
                  Browse through our comprehensive text guides and documentation
                </Text>
              </Box>
              <Divider />
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {additionalGuides.map((guide, index) => (
                  <TextGuideCard
                    key={index}
                    title={guide.title}
                    description={guide.description}
                    category={guide.category}
                    readTime={guide.readTime}
                    onClick={() => handleGuideSelect(guide.guideId)}
                  />
                ))}
              </SimpleGrid>
            </VStack>
          </Box>
        );
      default:
        return null;
    }
  };

  // If a guide is selected, show only that guide with a back button
  if (selectedGuide) {
    return (
      <Box py={12}>
        <Container maxW="7xl">
          <VStack spacing={6} align="stretch">
            <Button
              leftIcon={<Icon as={HiArrowLeft} />}
              variant="ghost"
              size="sm"
              onClick={resetToHome}
              alignSelf="flex-start"
            >
              Back to Help Center
            </Button>
            {renderGuideContent()}
          </VStack>
        </Container>
      </Box>
    );
  }

  // Get search results
  const searchResults = searchAllContent(searchQuery);
  const hasSearchQuery = searchQuery.trim().length > 0;

  return (
    <Box py={12}>
      <Container maxW="7xl">
        <VStack spacing={10} align="stretch">
          <SearchSection 
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
          />

          {hasSearchQuery ? (
            // Show search results
            <Box>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading size="lg" mb={2}>
                    Search Results for "{searchQuery}"
                  </Heading>
                  <Text color={useColorModeValue('gray.600', 'gray.400')}>
                    Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                  </Text>
                </Box>
                <Divider />
                {searchResults.length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {searchResults.map((result, index) => (
                      <TextGuideCard
                        key={index}
                        title={result.title}
                        description={result.description}
                        category={result.category || 'Guide'}
                        readTime={result.readTime || 5}
                        onClick={() => handleGuideSelect(result.guideId)}
                      />
                    ))}
                  </SimpleGrid>
                ) : (
                  <Card bg={useColorModeValue('gray.50', 'gray.800')} p={8}>
                    <VStack spacing={3}>
                      <Icon 
                        as={HiQuestionMarkCircle} 
                        boxSize={12} 
                        color={useColorModeValue('gray.400', 'gray.600')} 
                      />
                      <Heading size="md" color={useColorModeValue('gray.600', 'gray.400')}>
                        No results found
                      </Heading>
                      <Text color={useColorModeValue('gray.500', 'gray.500')} textAlign="center">
                        Try different keywords or browse our categories below
                      </Text>
                    </VStack>
                  </Card>
                )}
              </VStack>
            </Box>
          ) : (
            // Show default help center content
            <>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={8}>
                {categories.map((category, index) => (
                  <CategoryCard
                    key={index}
                    icon={category.icon}
                    title={category.title}
                    description={category.description}
                    bgColor={category.bgColor}
                    iconColor={category.iconColor}
                    onClick={category.action}
                  />
                ))}
              </SimpleGrid>

              <GettingStartedSection 
                items={gettingStartedItems}
              />

              <AdditionalResources 
                onDocumentationClick={() => navigateToGuide('documentation')}
              />
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default HelpCenter;