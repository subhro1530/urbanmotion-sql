import { Box, Heading, Text, Image, Flex, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const MeetOurTeam = () => (
  <MotionBox
    as="section"
    h={{base:"50%",md:"100vh"}}
    py={16}
    px={{ base: 4, md: 8 }} // Responsive padding
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <Flex
      h="full"
      alignItems="center"
      flexDirection={{ base: "column-reverse", md: "row" }} // Stack vertically on smaller screens
      textAlign={{ base: "center", md: "left" }} // Center text for small screens
    >
      {/* Left Section */}
      <Box
        w={{ base: "100%", md: "50%" }} // Full width on small screens
        mb={{ base: 8, md: 0 }} // Spacing for stacked layout
      >
        <Heading
          fontSize={{ base: "3xl", md: "5xl" }} // Responsive font size
          color="#00db00"
          _hover={{
            opacity: 0.8,
            textShadow: "0px 0px 20px #00db00",
            transition: "opacity 0.5s ease, textShadow 0.3s ease",
          }}
          cursor="crosshair"
        >
          Meet{" "}
          <Text as="span" color="white">
            Our Team
          </Text>
        </Heading>
        <Text fontSize={{ base: "md", md: "xl" }} mt={4}> {/* Responsive font size */}
          A passionate team of experts driving innovation in car rentals.
        </Text>
      </Box>

      {/* Image Section */}
      <VStack
        w={{ base: "100%", md: "50%" }} // Full width on small screens
        align={{ base: "center", md: "flex-start" }} // Center align on small screens
      >
        <Image
          src="https://imgs.search.brave.com/Wjl8JiNQ7al9vslIdDJP8OZ1LfjaWoFJGSosLQDFBkc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTM2/ODQ0MzIwL3Bob3Rv/L21vbmtleS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9TlBp/U0N3RXU3blczWUV6/MVpMSjNRbjZETENN/VDRCakhBWnRiMUx2/VVdCdz0"
          alt="Team"
          w={{ base: "80%", md: "60%" }} // Responsive width
          borderRadius="full"
          transition="transform 0.3s ease, box-shadow 0.3s ease, scale 0.3s ease"
          _hover={{
            transform: "rotate(1deg) translate3d(-1rem,0.5rem,3rem) scale(1.2)",
            boxShadow: "0px 0px 20px 5px #00db00",
          }}
          cursor="crosshair"
        />
      </VStack>
    </Flex>
  </MotionBox>
);

export default MeetOurTeam;
