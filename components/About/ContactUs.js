import { Box, Heading, Text, Flex, Image, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const ContactUs = () => (
  <MotionBox
    as="section"
    h="100vh"
    py={16}
    px={{ base: 4, md: 8 }} // Responsive padding
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    zIndex="-200"
  >
    <Flex
      h="full"
      alignItems="center"
      flexDirection={{ base: "column-reverse", md: "row" }} // Stacks vertically on smaller screens
      textAlign={{ base: "center", md: "left" }} // Centers text for smaller screens
    >
      {/* Text Section */}
      <Box
        w={{ base: "100%", md: "50%" }} // Full width on small screens
        mb={{ base: 8, md: 0 }} // Adds margin for vertical stacking
      >
        <Heading
          fontSize={{ base: "3xl", md: "5xl" }} // Responsive font size
          color="white"
          _hover={{
            opacity: 0.8,
            textShadow: "0px 0px 20px #00db00",
            transition: "opacity 0.5s ease, textShadow 0.3s ease",
          }}
          cursor="crosshair"
        >
          Contact{" "}
          <Text as="span" color="#00db00">
            Us
          </Text>
        </Heading>
        <Text fontSize={{ base: "md", md: "xl" }} mt={4}>
          Reach out to our WhatsApp Business number:{" "}
          <strong>9433211591</strong>. Schedule a meeting or inquire about our
          services. Just send us a message, and we’ll take care of the rest!
        </Text>
        <Button
          mt={8}
          bg="#00db00"
          color="white"
          _hover={{ bg: "white", color: "#00db00" }}
          size={{ base: "md", md: "lg" }} // Responsive button size
          onClick={() => window.open("https://wa.me/919433211591", "_blank")}
        >
          Message Us
        </Button>
      </Box>

      {/* Image Section */}
      <Image
        src="/contact.jpg"
        alt="Contact Us"
        w={{ base: "80%", md: "50%" }} // Responsive width
        borderRadius="md"
        boxShadow="xl"
        transition="transform 0.3s ease, box-shadow 0.3s ease"
        _hover={{
          transform: "rotate(1deg) translate3d(-1rem,0.5rem,3rem)",
          boxShadow: "0px 0px 20px 5px #00db00",
        }}
      />
    </Flex>
  </MotionBox>
);

export default ContactUs;
