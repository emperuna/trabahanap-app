import React from 'react';
import {
  Card,
  CardBody,
  VStack,
  HStack,
  Box,
  Heading,
  Text,
  Icon,
  Divider,
} from '@chakra-ui/react';

const ProfileContentArea = ({ activeMenuItem, theme }) => (
  <Card
    bg={theme.cardBg}
    borderRadius="2xl"
    border="1px"
    borderColor={theme.borderColor}
    boxShadow="md"
    minH="600px"
  >
    <CardBody p={8}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack spacing={3} mb={2}>
            <Icon
              as={activeMenuItem?.icon}
              boxSize={7}
              color={theme.accentColor}
            />
            <Heading size="lg" color={theme.textColor}>
              {activeMenuItem?.label}
            </Heading>
          </HStack>
          <Text fontSize="sm" color={theme.mutedColor}>
            {activeMenuItem?.description}
          </Text>
        </Box>

        <Divider />

        {/* Dynamic Content */}
        <Box
          animation="fadeIn 0.3s ease-in"
          css={{
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(10px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          {activeMenuItem?.component}
        </Box>
      </VStack>
    </CardBody>
  </Card>
);

export default ProfileContentArea;