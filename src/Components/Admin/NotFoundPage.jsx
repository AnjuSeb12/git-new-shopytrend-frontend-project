import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Button, Heading, VStack } from '@chakra-ui/react';

const NotFoundPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.100"
      textAlign="center"
    >
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" color="teal.500">
          404
        </Heading>
        <Text fontSize="xl" color="gray.700">
          Oops! The page you are looking for does not exist.
        </Text>
        <Text fontSize="md" color="gray.500">
          It looks like the page you are trying to reach is not available.
        </Text>
        <Button as={Link} to="/" colorScheme="teal" size="lg">
          Go Back to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFoundPage;
