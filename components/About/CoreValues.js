import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const CoreValues = () => (
  <MotionBox
    as="section"
    h={{base:"50%",md:"100vh"}}
    py={16}
    px={{ base: 4, md: 8 }} // Responsive padding
    overflowX="hidden" // Prevent X-axis overflow
    initial={{ opacity: 0, y: -100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <Flex
      h="full"
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }} // Stack vertically on small screens
    >
      {/* Left Section */}
      <Box
        w={{ base: "100%", md: "50%" }} // Full width on small screens
        textAlign={{ base: "center", md: "left" }} // Center text for small screens
        mb={{ base: 8, md: 0 }} // Margin for spacing on small screens
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
          position={{base:"absolute",md:"unset"}}
          left="0"
          m={2}
        >
          Our{" "}
          <Text as="span" color="#00db00">
            Core Values
          </Text>
        </Heading>
        <Text fontSize={{ base: "md", md: "xl" }} mt={{base:"12",md:"4"}} textAlign="left"> {/* Responsive font size */}
          We believe in:
          <ul>
            <li>
              <strong>Integrity:</strong> Building trust with honesty and
              transparency.
            </li>
            <li>
              <strong>Customer First:</strong> Prioritizing your needs.
            </li>
            <li>
              <strong>Innovation:</strong> Driving progress through technology.
            </li>
            <li>
              <strong>Sustainability:</strong> Being kind to the planet.
            </li>
          </ul>
        </Text>
      </Box>
      {/* Image Section */}
      <Image
        src="/values.webp"
        alt="Core Values"
        w={{ base: "100%", md: "50%" }} // Responsive width
        borderRadius="md"
        boxShadow="xl"
        transition="transform 0.3s ease, box-shadow 0.3s ease"
        _hover={{
          transform: "rotate(1deg) translate3d(-1rem,0.5rem,3rem) ",
          boxShadow: "0px 0px 20px 5px #00db00",
        }}
      />
    </Flex>
  </MotionBox>
);

export default CoreValues;
