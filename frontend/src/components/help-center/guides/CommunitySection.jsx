import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  Badge,
  Divider,
  useColorModeValue,
  SimpleGrid,
  Icon,
  HStack,
  Button,
  Link,
} from '@chakra-ui/react';
import {
  HiUserGroup,
  HiChatAlt2,
  HiLightningBolt,
  HiBookOpen,
  HiStar,
  HiHeart,
} from 'react-icons/hi';

const CommunitySection = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const communityFeatures = [
    {
      icon: HiUserGroup,
      title: 'Discussion Forums',
      description: 'Connect with other professionals, share experiences, and get advice from the community.',
      color: 'blue'
    },
    {
      icon: HiChatAlt2,
      title: 'Career Advice',
      description: 'Ask questions about career transitions, interview tips, and professional development.',
      color: 'green'
    },
    {
      icon: HiLightningBolt,
      title: 'Success Stories',
      description: 'Read inspiring stories from job seekers who found their dream jobs through TrabaHanap.',
      color: 'purple'
    },
    {
      icon: HiBookOpen,
      title: 'Resources Library',
      description: 'Access free guides, templates, and tools to boost your job search or hiring process.',
      color: 'orange'
    }
  ];

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        <Box>
          <Badge colorScheme="green" mb={3}>Community</Badge>
          <Heading size="xl" mb={2}>Join Our Community</Heading>
          <Text color="gray.600" fontSize="lg">
            Connect with thousands of professionals and employers
          </Text>
        </Box>

        <Divider />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {communityFeatures.map((feature, index) => (
            <Card
              key={index}
              bg={cardBg}
              border="1px"
              borderColor={borderColor}
              _hover={{
                transform: 'translateY(-4px)',
                shadow: 'lg',
                borderColor: `${feature.color}.300`
              }}
              transition="all 0.3s"
              cursor="pointer"
            >
              <CardBody>
                <VStack spacing={4} align="start">
                  <Icon
                    as={feature.icon}
                    boxSize={10}
                    color={`${feature.color}.500`}
                  />
                  <Heading size="md">{feature.title}</Heading>
                  <Text fontSize="sm" color="gray.600">
                    {feature.description}
                  </Text>
                  <Button
                    size="sm"
                    colorScheme={feature.color}
                    variant="ghost"
                    rightIcon={<Icon as={HiLightningBolt} />}
                  >
                    Explore
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Heading size="md">Community Guidelines</Heading>
              <Text fontSize="sm" color="gray.600">
                Our community thrives on mutual respect and support. Please follow these guidelines:
              </Text>
              <VStack spacing={2} align="stretch" pl={4}>
                <HStack>
                  <Icon as={HiHeart} color="red.500" />
                  <Text fontSize="sm">Be respectful and professional in all interactions</Text>
                </HStack>
                <HStack>
                  <Icon as={HiStar} color="yellow.500" />
                  <Text fontSize="sm">Share valuable insights and constructive feedback</Text>
                </HStack>
                <HStack>
                  <Icon as={HiUserGroup} color="blue.500" />
                  <Text fontSize="sm">Support fellow community members</Text>
                </HStack>
                <HStack>
                  <Icon as={HiBookOpen} color="green.500" />
                  <Text fontSize="sm">Keep discussions relevant and on-topic</Text>
                </HStack>
              </VStack>
            </VStack>
          </CardBody>
        </Card>

        <Card bg="blue.50" border="1px" borderColor="blue.200">
          <CardBody>
            <VStack spacing={4}>
              <Heading size="md" color="blue.800">Ready to Connect?</Heading>
              <Text fontSize="sm" color="blue.700" textAlign="center">
                Join thousands of professionals sharing knowledge and opportunities
              </Text>
              <HStack spacing={4}>
                <Button colorScheme="blue" size="md">
                  Join Community
                </Button>
                <Button variant="outline" colorScheme="blue" size="md">
                  Browse Forums
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={3}>
              <Heading size="sm">Stay Updated</Heading>
              <Text fontSize="sm" color="gray.600" textAlign="center">
                Follow us on social media for the latest updates, tips, and success stories
              </Text>
              <HStack spacing={4}>
                <Link href="https://facebook.com/trabahanap" isExternal>
                  <Button size="sm" variant="ghost" colorScheme="facebook">
                    Facebook
                  </Button>
                </Link>
                <Link href="https://twitter.com/trabahanap" isExternal>
                  <Button size="sm" variant="ghost" colorScheme="twitter">
                    Twitter
                  </Button>
                </Link>
                <Link href="https://linkedin.com/company/trabahanap" isExternal>
                  <Button size="sm" variant="ghost" colorScheme="linkedin">
                    LinkedIn
                  </Button>
                </Link>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default CommunitySection;
