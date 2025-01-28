import { Button, Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box textAlign="center" p={10}>
      <motion.div whileHover={{ scale: 1.1 }}>
        <Heading>Welcome to the Car Rental Service</Heading>
        <Text mt={4} color="gray.600">Manage car rentals efficiently and effortlessly.</Text>
        <Link href="/place-order">
          <Button mt={6} colorScheme="teal">Place Rental Order</Button>
        </Link>
      </motion.div>
    </Box>
  );
};

export default Home;