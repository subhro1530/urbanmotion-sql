import { Box, Heading, Text, Flex, Icon } from "@chakra-ui/react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const SocialProof = () => (
  <Box textAlign="center" py={16} px={8}>
    <Heading fontSize="4xl" color="white"  _hover={{
            opacity:0.8,
            textShadow:"0px 0px 20px #00db00",
            transition: "opacity 0.5s ease,textShadow 0.3s ease"
          }}
          cursor="crosshair">
      What Our{" "}
      <Text as="span" color="#00db00">
        Customers Say
      </Text>
    </Heading>
    <Flex direction="column" align="center" mt={8}>
      <Text fontSize="lg" maxW="600px" textAlign="center">
        <Icon as={FaQuoteLeft} color="#00db00" /> Exceptional service! The
        vehicles were in pristine condition, and the staff was incredibly
        helpful. <Icon as={FaQuoteRight} color="#00db00" />
      </Text>
      <Text fontSize="sm" fontStyle="italic" mt={4}>
        Emily R.
      </Text>
      <Text fontSize="lg" maxW="600px" textAlign="center" mt={8}>
        <Icon as={FaQuoteLeft} color="#00db00" /> Amazing experience! The
        booking process was seamless and efficient. Highly recommended!{" "}
        <Icon as={FaQuoteRight} color="#00db00" />
      </Text>
      <Text fontSize="sm" fontStyle="italic" mt={4}>
        John D.
      </Text>
    </Flex>
  </Box>
);

export default SocialProof;
