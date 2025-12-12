import React, { useMemo } from 'react';
import { 
  Card, 
  CardBody, 
  VStack, 
  Heading, 
  Text, 
  Button, 
  Badge, 
  HStack 
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SaveJobButton from './SaveJobButton';
// ✅ Add Poppins font imports
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

const ApplyNowCard = ({ 
  company, 
  onApply, 
  hasApplied = false, 
  loading = false, 
  jobId 
}) => {
  // ✅ Memoize content based on application status
  const cardContent = useMemo(() => {
    if (hasApplied) {
      return {
        title: 'Application Submitted',
        description: `Your application for this position at ${company} has been submitted successfully. The employer will review your application and contact you if selected.`,
        badge: (
          <Badge 
            colorScheme="green" 
            variant="solid" 
            borderRadius="full" 
            px={3} 
            py={1}
          >
            ✓ Applied Successfully
          </Badge>
        )
      };
    }

    return {
      title: 'Apply Now',
      description: `Please let ${company} know that you found this position on our job board. That's a great way to support us, so we can keep posting amazing jobs every week.`,
      badge: null
    };
  }, [hasApplied, company]);

  // ✅ Component for applied state buttons
  const AppliedStateActions = () => (
    <VStack spacing={3} w="full">
      <HStack spacing={2} w="full">
        <Button 
          as={Link} 
          to="/dashboard/applications" 
          colorScheme="blue"
          variant="solid" 
          size="md"
          borderRadius="md"
          flex={1}
        >
          View Applications
        </Button>

        {jobId && (
        <SaveJobButton
          jobId={jobId}
          size="md"
          variant="icon"
          colorScheme="purple"
        />
      )}
        
      </HStack>
      <HStack w="full" spacing={2}>
         <Button 
          as={Link} 
          to="/find-jobs" 
          variant="ghost" 
          size="md"
          borderRadius="md"
          flex={1}
          color= "#444"
          background="#E8E8E8"
        >
          Find More Jobs
        </Button>
      </HStack>
    </VStack>
  );

  // ✅ Component for not applied state buttons
  const NotAppliedStateActions = () => (
    <VStack spacing={3} w="full">
      <HStack w="full" spacing={2}>
        <Button 
          colorScheme="purple" 
          size="lg" 
          borderRadius="md"
          onClick={onApply} 
          w="full"
          isLoading={loading}
          loadingText="Opening Application..."
        >
          Apply Now
        </Button>

        {jobId && (
          <SaveJobButton
            jobId={jobId}
            size="lg"
            variant="icon"
            colorScheme="purple"
          />
        )}   
      </HStack>
      
      <Button 
        as={Link} 
        to="/find-jobs" 
        variant="ghost" 
        size="lg" 
        borderRadius="md"
        w="full"
        color= "#444"
        background="#E8E8E8"
      >
        View Other Jobs
      </Button>
    </VStack>
  );

  return (
    <Card 
      bg="white" 
      borderRadius="lg" // ✅ More rectangular
      shadow="md"
      maxW="400px"
      w="full"
      fontFamily="'Poppins', sans-serif" // ✅ Apply Poppins font to entire card
    >
      <CardBody p={8}>
        <VStack spacing={6} textAlign="center">
          {/* ✅ Dynamic Header */}
          <VStack spacing={2}>
            <Heading 
              size="md" 
              color="gray.800"
              fontWeight="semibold"
            >
              {cardContent.title}
            </Heading>
            {cardContent.badge}
          </VStack>

          {/* ✅ Dynamic Description */}
          <Text 
            color="gray.600" 
            fontSize="sm" 
            textAlign="justify"
            lineHeight="1.6"
          >
            {cardContent.description}
          </Text>
          
          {/* ✅ Dynamic Action Buttons */}
          {hasApplied ? <AppliedStateActions /> : <NotAppliedStateActions />}

          {/* ✅ Application Status Info */}
          {hasApplied && (
            <Text 
              fontSize="xs" 
              color="gray.500" 
              textAlign="center"
              fontStyle="italic"
            >
              You can track your application status in your dashboard
            </Text>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ApplyNowCard;