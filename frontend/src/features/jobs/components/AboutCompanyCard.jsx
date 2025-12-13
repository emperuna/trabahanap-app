import React from 'react';
import { 
  Card, 
  CardBody, 
  VStack, 
  Heading, 
  Text, 
  Button, 
  Box, 
  Avatar,
  useColorModeValue,
  Icon,
  HStack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HiOfficeBuilding, HiExternalLink } from 'react-icons/hi';

const AboutCompanyCard = ({ company, companyDescription }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Card 
      bg={cardBg}
      borderRadius="xl"
      shadow="sm"
      border="1px"
      borderColor={borderColor}
      overflow="hidden"
    >
      <Box h="3px" bg="gray.400" />
      <CardBody p={5}>
        <VStack spacing={4}>
          <Avatar
            size="lg"
            name={company}
            bg="gray.500"
            color="white"
          />
          
          <VStack spacing={1}>
            <Heading size="sm" color={useColorModeValue('gray.800', 'white')}>
              About {company}
            </Heading>
          </VStack>

          <Text 
            fontSize="sm"
            color={useColorModeValue('gray.600', 'gray.400')}
            textAlign="center"
            lineHeight="1.6"
          >
            {companyDescription || 'Learn more about this company and their open positions.'}
          </Text>

          <Button 
            as={Link} 
            to="#" 
            variant="outline"
            colorScheme="gray"
            size="sm" 
            w="full"
            leftIcon={<HiExternalLink />}
          >
            View Company
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default AboutCompanyCard;