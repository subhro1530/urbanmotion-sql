import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const CompellingNarrative = () => (
  <MotionBox
    as="section"
    h={{base:"50%",md:"100vh"}}
    py={16}
    px={{ base: 3, md: 8 }} // Responsive padding
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
  >
    <Flex
      h="full"
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }} // Stack on smaller screens
    >
      <Box w={{ base: "100%", md: "50%" }} mb={{ base: 8, md: 0 }}> {/* Full width on small screens */}
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
          Our{" "}
          <Text as="span" color="#00db00">
            Journey
          </Text>
        </Heading>
        <Text fontSize={{ base: "md", md: "xl" }} mt={4}> {/* Responsive font size */}
          Founded with the vision to make mobility effortless and affordable,
          our car rental service has become a cornerstone for thousands of happy
          customers. Our journey began in a small garage and has expanded to
          serve across the nation.
        </Text>
      </Box>
      <Image
        src="/journey.webp"
        alt="Our journey"
        w={{ base: "100%", md: "50%" }} // Responsive width
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

export default CompellingNarrative;
