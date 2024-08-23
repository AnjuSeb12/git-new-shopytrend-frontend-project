import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Image, useBreakpointValue } from '@chakra-ui/react';

const SellerItemView = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getSellerProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/product/getproducts", {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getSellerProducts();
  }, []);

  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });

  return (
    <Box className="container mx-auto p-4">
      <Text as="h1" className="text-2xl font-bold mb-4">
        Seller Products
      </Text>
      <Flex wrap="wrap" gap={4}>
        {products.map((product) => (
          <Box
            key={product._id}
            className="w-full md:w-1/2 lg:w-1/3 p-4 border border-gray-300 rounded-lg shadow-md"
          >
            <Image
              src={product.image}
              alt={product.title}
              boxSize="150px"
              objectFit="fill"
              borderRadius="md"
              mb={4}
            />
            <Text className="text-lg font-semibold">{product.title}</Text>
            <Text className="text-sm text-blue-900 mb-2">{product.description}</Text>
            <Text className="text-blue-500 font-bold mb-4">Price: ₹{product.price}</Text>
            <Flex
              className="text-sm text-blue-900"
              direction={flexDirection}
              justify="space-between"
              align="center"
            >
              <Text>Seller: {product.seller.firstName}</Text>
              <Text>({product.seller.email})</Text>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default SellerItemView;
