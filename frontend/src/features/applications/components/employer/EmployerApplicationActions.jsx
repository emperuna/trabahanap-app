import React, { useState } from 'react';
import { HStack, Button, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure, Text } from '@chakra-ui/react';
import { applicationsAPI } from '../../../../shared/api';

const EmployerApplicationActions = ({ 
  application, 
  onStatusUpdate, 
  size = "xs" 
}) => {
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleStatusUpdate = async (newStatus, actionName) => {
    try {
      setLoading(true);
      console.log(`🔄 ${actionName} application ${application.id}`);
      
      // Call backend API
      const updatedApplication = await applicationsAPI.updateApplicationStatus(
        application.id, 
        newStatus
      );

      // Update local state
      onStatusUpdate?.(application.id, newStatus);

      // Show success toast
      toast({
        title: `Application ${actionName}`,
        description: `${application.applicantUsername}'s application has been ${actionName.toLowerCase()}.`,
        status: newStatus === 'ACCEPTED' ? 'success' : newStatus === 'REJECTED' ? 'warning' : 'info',
        duration: 4000,
        isClosable: true,
      });

      console.log(`✅ Application ${actionName.toLowerCase()} successfully`);

    } catch (error) {
      console.error(`❌ Error ${actionName.toLowerCase()} application:`, error);
      toast({
        title: `Failed to ${actionName} Application`,
        description: error.message || `Could not ${actionName.toLowerCase()} this application. Please try again.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleAction = (status, actionName) => {
    setActionType(actionName);
    
    // For accept/reject, show confirmation dialog
    if (status === 'ACCEPTED' || status === 'REJECTED') {
      onOpen();
    } else {
      // For review, update immediately
      handleStatusUpdate(status, actionName);
    }
  };

  const confirmAction = () => {
    const status = actionType === 'Accept' ? 'ACCEPTED' : 'REJECTED';
    handleStatusUpdate(status, actionType);
  };

  const isAccepted = application.status?.toUpperCase() === 'ACCEPTED';
  const isRejected = application.status?.toUpperCase() === 'REJECTED';
  const isPending = application.status?.toUpperCase() === 'PENDING';
  const isReviewed = application.status?.toUpperCase() === 'REVIEWED';

  // Show final state for accepted/rejected applications
  if (isAccepted || isRejected) {
    return (
      <Button 
        size={size} 
        variant="solid" 
        colorScheme={isAccepted ? "green" : "red"}
        isDisabled
        fontSize="xs"
        fontWeight="semibold"
        borderRadius="md"
        px={3}
        py={2}
      >
        {isAccepted ? 'ACCEPTED' : 'NOT SELECTED'}
      </Button>
    );
  }

  return (
    <>
      <HStack spacing={2}>
        {/* Review Button - only show for pending applications */}
        {isPending && (
          <Button 
            size={size} 
            colorScheme="blue" 
            variant="outline"
            onClick={() => handleAction('REVIEWED', 'Review')}
            isLoading={loading && actionType === 'Review'}
            fontSize="xs"
            fontWeight="semibold"
            borderRadius="md"
            px={3}
            _hover={{
              bg: 'blue.50',
              borderColor: 'blue.300'
            }}
          >
            REVIEW
          </Button>
        )}
        
        {/* Accept Button */}
        <Button 
          size={size} 
          colorScheme="green" 
          variant="outline"
          onClick={() => handleAction('ACCEPTED', 'Accept')}
          isLoading={loading && actionType === 'Accept'}
          fontSize="xs"
          fontWeight="semibold"
          borderRadius="md"
          px={3}
          _hover={{
            bg: 'green.50',
            borderColor: 'green.300'
          }}
        >
          ACCEPT
        </Button>
        
        {/* Reject Button */}
        <Button 
          size={size} 
          colorScheme="red" 
          variant="outline"
          onClick={() => handleAction('REJECTED', 'Reject')}
          isLoading={loading && actionType === 'Reject'}
          fontSize="xs"
          fontWeight="semibold"
          borderRadius="md"
          px={3}
          _hover={{
            bg: 'red.50',
            borderColor: 'red.300'
          }}
        >
          REJECT
        </Button>
      </HStack>

      {/* Confirmation Dialog */}
      <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
        <AlertDialogOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
        <AlertDialogContent borderRadius="xl" mx={4}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold" color="gray.800">
            {actionType} Application
          </AlertDialogHeader>

          <AlertDialogBody color="gray.700">
            Are you sure you want to <Text as="span" fontWeight="bold">{actionType.toLowerCase()}</Text> {application.applicantUsername}'s application for <Text as="span" fontWeight="bold">{application.jobTitle}</Text>?
            
            <br /><br />
            
            {actionType === 'Accept' && (
              <Text 
                p={3} 
                bg="green.50" 
                border="1px solid" 
                borderColor="green.200"
                borderRadius="md" 
                color="green.800"
                fontSize="sm"
              >
                This will notify the candidate that they have been selected for this position.
              </Text>
            )}
            
            {actionType === 'Reject' && (
              <Text 
                p={3} 
                bg="red.50" 
                border="1px solid" 
                borderColor="red.200"
                borderRadius="md" 
                color="red.800"
                fontSize="sm"
              >
                This will notify the candidate that their application was not successful.
              </Text>
            )}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button 
              onClick={onClose}
              variant="outline"
              colorScheme="gray"
              mr={3}
            >
              Cancel
            </Button>
            <Button 
              colorScheme={actionType === 'Accept' ? 'green' : 'red'} 
              onClick={confirmAction}
              isLoading={loading}
              loadingText={`${actionType}ing...`}
              fontWeight="semibold"
            >
              {actionType}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EmployerApplicationActions;