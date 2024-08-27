import React from 'react';
import { Box, VStack, Heading, Text } from '@chakra-ui/react';
import { Property } from '../types/property';

interface PropertyListProps {
    properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
    return (
    <VStack spacing={4} align="stretch">
      {properties.map((property) => (
        <Box key={property.id} p={5} shadow="md" borderWidth="1px">
          <Heading fontSize="xl">{property.title}</Heading>
          <Text mt={4}>{property.address}</Text>
          <Text>Price: ${property.price.toLocaleString()}</Text>
          <Text>{property.bedrooms} bed | {property.bathrooms} bath | {property.pyeong} sqft</Text>
        </Box>
      ))}
    </VStack>
    );
};

export default PropertyList; 