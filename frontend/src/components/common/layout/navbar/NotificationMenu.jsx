import React from 'react';
import {
  IconButton, Badge, Popover, PopoverTrigger, PopoverContent, PopoverBody,
  PopoverArrow, PopoverCloseButton, Box, Flex, Text, VStack, HStack, Button
} from '@chakra-ui/react';
import { HiBell, HiLightningBolt } from 'react-icons/hi';

const NotificationMenu = ({ notifications, unreadCount, onMarkAsRead }) => {
  const getNotificationTypeColor = (type) => {
    switch (type) {
      case 'application': return 'blue';
      case 'match': return 'green';
      case 'profile': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <IconButton
          icon={<HiBell />}
          variant="ghost"
          size="sm"
          borderRadius="lg"
          position="relative"
          _hover={{ bg: 'gray.100' }}
          aria-label="Notifications"
        >
          {unreadCount > 0 && (
            <Badge
              position="absolute"
              top="-1"
              right="-1"
              colorScheme="red"
              borderRadius="full"
              fontSize="xs"
              w={5}
              h={5}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {unreadCount}
            </Badge>
          )}
        </IconButton>
      </PopoverTrigger>
      <PopoverContent w="350px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody p={0}>
          <Box p={4} borderBottom="1px" borderColor="gray.100">
            <Flex justify="space-between" align="center">
              <Text fontWeight="600">Notifications</Text>
              {unreadCount > 0 && (
                <Badge colorScheme="blue" borderRadius="full">
                  {unreadCount} new
                </Badge>
              )}
            </Flex>
          </Box>
          <VStack spacing={0} align="stretch" maxH="300px" overflowY="auto">
            {notifications.map((notification) => (
              <Box
                key={notification.id}
                p={3}
                borderBottom="1px"
                borderColor="gray.50"
                bg={notification.unread ? 'blue.50' : 'transparent'}
                cursor="pointer"
                _hover={{ bg: 'gray.50' }}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <HStack spacing={3} align="start">
                  <Badge
                    colorScheme={getNotificationTypeColor(notification.type)}
                    borderRadius="full"
                    p={1}
                  >
                    <HiLightningBolt size={10} />
                  </Badge>
                  <VStack spacing={1} align="start" flex={1}>
                    <Text fontSize="sm" fontWeight="600">
                      {notification.title}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {notification.message}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      {notification.time}
                    </Text>
                  </VStack>
                  {notification.unread && (
                    <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                  )}
                </HStack>
              </Box>
            ))}
          </VStack>
          <Box p={3} borderTop="1px" borderColor="gray.100">
            <Button size="sm" variant="ghost" w="full">
              View All Notifications
            </Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationMenu;