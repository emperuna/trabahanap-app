import React from 'react';
import { HStack, Button, useToast } from '@chakra-ui/react';

const EmployerApplicationActions = ({ 
  application, 
  onStatusUpdate, 
  size = "xs" 
}) => {
  const toast = useToast();

  const handleAccept = () => {
    // TODO: Implement accept functionality
    toast({
      title: 'Application Accepted',
      description: `${application.applicantUsername}'s application has been accepted.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onStatusUpdate?.(application.id, 'ACCEPTED');
  };

  const handleReject = () => {
    // TODO: Implement reject functionality
    toast({
      title: 'Application Rejected',
      description: `${application.applicantUsername}'s application has been rejected.`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
    onStatusUpdate?.(application.id, 'REJECTED');
  };

  const handleMarkReviewed = () => {
    toast({
      title: 'Marked as Reviewed',
      description: `${application.applicantUsername}'s application marked as reviewed.`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
    onStatusUpdate?.(application.id, 'REVIEWED');
  };

  const isAccepted = application.status?.toUpperCase() === 'ACCEPTED';
  const isRejected = application.status?.toUpperCase() === 'REJECTED';
  const isPending = application.status?.toUpperCase() === 'PENDING';

  if (isAccepted || isRejected) {
    return (
      <Button 
        size={size} 
        variant="ghost" 
        colorScheme="gray"
        isDisabled
      >
        {isAccepted ? 'Accepted' : 'Rejected'}
      </Button>
    );
  }

  return (
    <HStack spacing={2}>
      {isPending && (
        <Button 
          size={size} 
          colorScheme="blue" 
          variant="outline"
          onClick={handleMarkReviewed}
        >
          Review
        </Button>
      )}
      <Button 
        size={size} 
        colorScheme="green" 
        variant="outline"
        onClick={handleAccept}
      >
        Accept
      </Button>
      <Button 
        size={size} 
        colorScheme="red" 
        variant="outline"
        onClick={handleReject}
      >
        Reject
      </Button>
    </HStack>
  );
};

export default EmployerApplicationActions;