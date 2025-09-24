import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Icon,
  Flex,
  Badge,
  useToast,
} from "@chakra-ui/react";
import {
  HiMail,
  HiShieldCheck,
  HiLightningBolt,
  HiUserGroup,
  HiTrendingUp,
  HiBell,
} from "react-icons/hi";

const CTA = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubscribe = async () => {
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail("");
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive job alerts and career tips.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 1000);
  };

  const benefits = [
    {
      icon: HiShieldCheck,
      title: "Verified Companies",
      description:
        "All employers are pre-screened and verified for your safety",
      color: "#153CF5",
    },
    {
      icon: HiLightningBolt,
      title: "Instant Matching",
      description:
        "AI-powered job matching finds opportunities that fit your skills",
      color: "#153CF5",
    },
    {
      icon: HiUserGroup,
      title: "Career Support",
      description: "Get guidance from our team of career development experts",
      color: "#153CF5",
    },
    {
      icon: HiTrendingUp,
      title: "Salary Insights",
      description: "Access real salary data to negotiate better compensation",
      color: "#153CF5",
    },
  ];

  return (
    <Box
      py={20}
      bgGradient="linear(135deg, #0038C9 12%, #1554F5 63%, #6F97FF 100%)"
      color="white"
    >
      <Container maxW="7xl">
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={16}
          alignItems="center"
        >
          {/* Left Side - Newsletter */}
          <VStack spacing={8} align="flex-start">
            <VStack spacing={4} align="flex-start">
              <Badge
                bg="whiteAlpha.200"
                color="white"
                px={4}
                py={2}
                borderRadius="full"
                fontSize="sm"
                fontWeight="semibold"
                backdropFilter="blur(10px)"
              >
                <Icon as={HiBell} mr={2} />
                Stay Updated
              </Badge>

              <Heading size="xl" fontWeight="bold" letterSpacing="-0.02em">
                Get Your Dream Job Delivered
              </Heading>

              <Text
                fontSize="lg"
                color="whiteAlpha.900"
                lineHeight="tall"
                maxW="lg"
              >
                Join 50,000+ professionals receiving personalized job alerts,
                salary insights, and career tips directly in their inbox.
              </Text>
            </VStack>

            {/* Newsletter Signup */}
            <VStack spacing={4} w="full" maxW="400px">
              <InputGroup size="lg">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  bg="whiteAlpha.200"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  borderRadius="xl"
                  color="white"
                  _placeholder={{ color: "whiteAlpha.700" }}
                  _focus={{
                    borderColor: "whiteAlpha.500",
                    bg: "whiteAlpha.300",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.2)",
                  }}
                />
                <InputRightElement width="auto" pr={2}>
                  <Button
                    size="sm"
                    bgGradient="linear(135deg, white 0%, #f7fafc 100%)"
                    color="#153CF5"
                    fontWeight="600"
                    borderRadius="lg"
                    px={6}
                    isLoading={isLoading}
                    onClick={handleSubscribe}
                    _hover={{
                      bgGradient: "linear(135deg, #f7fafc 0%, #edf2f7 100%)",
                      transform: "translateY(-1px)",
                    }}
                  >
                    Subscribe
                  </Button>
                </InputRightElement>
              </InputGroup>

              <HStack spacing={4} fontSize="sm" color="whiteAlpha.800">
                <HStack>
                  <Icon as={HiMail} />
                  <Text>Weekly job alerts</Text>
                </HStack>
                <Text>•</Text>
                <Text>No spam, unsubscribe anytime</Text>
              </HStack>
            </VStack>

            {/* Social Proof */}
            <HStack spacing={6} pt={4}>
              <VStack spacing={1} align="flex-start">
                <Text fontSize="2xl" fontWeight="bold">
                  98%
                </Text>
                <Text fontSize="sm" color="whiteAlpha.800">
                  Open rate
                </Text>
              </VStack>

              <Box w="1px" h={8} bg="whiteAlpha.300" />

              <VStack spacing={1} align="flex-start">
                <Text fontSize="2xl" fontWeight="bold">
                  50K+
                </Text>
                <Text fontSize="sm" color="whiteAlpha.800">
                  Subscribers
                </Text>
              </VStack>

              <Box w="1px" h={8} bg="whiteAlpha.300" />

              <VStack spacing={1} align="flex-start">
                <Text fontSize="2xl" fontWeight="bold">
                  4.9★
                </Text>
                <Text fontSize="sm" color="whiteAlpha.800">
                  User rating
                </Text>
              </VStack>
            </HStack>
          </VStack>

          {/* Right Side - Platform Benefits */}
          <VStack spacing={6} align="flex-start">
            <VStack spacing={3} align="flex-start">
              <Heading size="lg" fontWeight="bold">
                Why Choose TrabaHanap?
              </Heading>
              <Text color="whiteAlpha.900">
                The most trusted job platform in the Philippines
              </Text>
            </VStack>

            <VStack spacing={6} w="full">
              {benefits.map((benefit, index) => (
                <Flex
                  key={index}
                  gap={4}
                  p={6}
                  bgGradient="linear(135deg, whiteAlpha.100 0%, whiteAlpha.150 100%)"
                  backdropFilter="blur(20px)"
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  w="full"
                  transition="all 0.3s ease"
                  _hover={{
                    bgGradient: "linear(135deg, whiteAlpha.150 0%, whiteAlpha.200 100%)",
                    transform: "translateY(-2px)",
                  }}
                >
                  <Box
                    p={3}
                    bg="whiteAlpha.200"
                    borderRadius="xl"
                    color="white"
                    flexShrink={0}
                  >
                    <Icon as={benefit.icon} boxSize={6} />
                  </Box>
                  <VStack spacing={2} align="flex-start" flex={1}>
                    <Text fontSize="lg" fontWeight="semibold">
                      {benefit.title}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="whiteAlpha.800"
                      lineHeight="relaxed"
                    >
                      {benefit.description}
                    </Text>
                  </VStack>
                </Flex>
              ))}
            </VStack>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default CTA;