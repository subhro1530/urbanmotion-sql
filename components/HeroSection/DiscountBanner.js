import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCarSide } from "react-icons/fa";

const DiscountBanner = () => {
  // Dynamic sale percentage based on the current date
  const currentMonth = new Date().getMonth() + 1; // Months are 0-based
  const salePercentage = currentMonth % 2 === 0 ? 30 : 20; // Example: Alternates between 30% and 20%

  const messages = [
    `Exclusive Deals This Month - Up to ${salePercentage}% off on premium car rentals!`,
    "First-Time Users Get a Bonus Discount - Explore Now!",
    "Book Early and Save Big - Quality Services at Affordable Prices!",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  // Update message every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <Box
      bg="#00db00" // Light green background color
      color="black"
      py={4}
      px={2}
      textAlign="center"
      overflow="hidden"
    >
      <motion.div
        key={currentMessage} // Key to trigger re-render for animation
        initial={{ x: "100%", opacity: 0 }} // Start off-screen
        animate={{ x: 0, opacity: 1 }} // Slide to center
        exit={{ x: "-100%", opacity: 0 }} // Slide out to the left
        transition={{ type: "tween", duration: 1.2 }} // Smooth animation
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          direction={{ base: "column", md: "row" }}
          gap={3}
          _hover={{ textDecoration: "underline",color:"gray.100", }} 
        >
          <Icon as={FaCarSide} w={6} h={6}/>
          <Text
            fontSize={{ base: "sm", md: "lg" }}
            fontWeight="medium"
            textAlign="center"
            whiteSpace="normal" // Prevent text overflow
            mx={2} // Margin for spacing
          >
            {messages[currentMessage]}
          </Text>
          {/* <Icon as={FaPercentage} w={6} h={6} color="black" /> */}
        </Flex>
      </motion.div>
    </Box>
  );
};

export default DiscountBanner;
