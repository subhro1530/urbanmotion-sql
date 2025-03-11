import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const MissionStatement = () => (
  <MotionBox
    as="section"
    h={{base:"50%",md:"100vh"}}
    py={16}
    px={{ base: 4, md: 8 }} // Responsive padding
    initial={{ opacity: 0, x: 100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
  >
    <Flex
      h="full"
      alignItems="center"
      flexDirection={{ base: "column-reverse", md: "row" }} // Stack on smaller screens
      textAlign={{ base: "center", md: "right" }} // Center text on small screens
    >
      <Image
        src="/mission.png"
        alt="Mission"
        w={{ base: "100%", md: "50%" }} // Responsive width
        mb={{ base: 8, md: 0 }} // Margin for spacing on small screens
        borderRadius="md"
        boxShadow="xl"
        transition="transform 0.3s ease, box-shadow 0.3s ease"
        _hover={{
          transform: "rotate(-1deg) translate3d(-1rem,0.5rem,3rem) ",
          boxShadow: "0px 0px 20px 5px #00db00",
        }}
      />
      <Box w={{ base: "100%", md: "50%" }}> {/* Full width on smaller screens */}
        <Heading
          fontSize={{ base: "3xl", md: "5xl" }} // Responsive font size
          color="#00db00"
          _hover={{
            opacity: 0.8,
            textShadow: "0px 0px 20px #00db00",
            transition: "opacity 0.5s ease, textShadow 0.3s ease",
          }}
          cursor="crosshair"
          position={{base:"absolute",md:"unset"}}
          right="0"
          m={2}
        >
          Our{" "}
          <Text as="span" color="white">
            Mission
          </Text>
        </Heading>
        <Text fontSize={{ base: "md", md: "xl" }} mt={{base:"12",md:"4"}} textAlign="right"> {/* Responsive font size */}
          To provide seamless, reliable, and sustainable mobility solutions that
          prioritize customer satisfaction and environmental responsibility.
          Every step we take is to make your travel simpler and better.
        </Text>
      </Box>
    </Flex>
  </MotionBox>
);

export default MissionStatement;
