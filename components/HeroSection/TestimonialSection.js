import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Avatar,
  Icon,
  filter,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { keyframes } from "@emotion/react";

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const TestimonialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <Flex
      ref={ref}
      bg={{ base: "rgba(0, 0, 0, 0.8)", md: "#000" }} // Dim background for mobile
      color="white"
      p={{ base: "2rem", md: "4rem" }}
      align="center"
      justify="center"
      direction={{ base: "column", md: "row" }}
      height={{ base: "auto", md: "100vh" }}
      position="relative"
      overflow="hidden"
      flexDirection={{ base: "column-reverse", md: "unset" }}
    >
       <Box
          position="absolute"
          display={{base:"block",md:"none"}}
          top={{ base: "0px", md: "0" }}
          left="0"
          width="100%"
          height={{ base: "120vh", md: "100vh" }}
          bg={{ base: "rgba(0, 0, 0, 0.6)", md: "rgba(0, 100, 0, 0.1)" }}
          zIndex={{ base: "1", md: "1" }}
          animation={`${fadeIn} 2s ease-in-out`} // Add animation for smooth appearance
        />

      {/* Left Content */}
      <MotionBox
        flex="1"
        p={{ base: "1rem", md: "3rem" }}
        textAlign={{ base: "center", md: "left" }}
        zIndex="12"
        maxWidth={{ base: "100%", md: "50%" }}
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1 }}
        position={{ base: "absolute", md: "unset" }}
        top={{ base: "150px", md: "unset" }}
      >
        <Heading
          fontSize={{ base: "3xl", md: "5xl" }}
          lineHeight="1.3"
          mb="6"
          textTransform="uppercase"
          fontWeight="bold"
        >
          <Text as="span" color="#32CD32">
            Lowest
          </Text>{" "}
          Rental Cars
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} mb="4">
          Drive smarter with the latest self-driving technologies. Our rentals
          are designed for luxury, safety, and an unforgettable experience. Rent
          now to redefine your journey.
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} mb="4">
          Discover the freedom of self-driving cars, where precision meets
          innovation. Whether for business or leisure, enjoy every mile with
          unmatched comfort and efficiency.
        </Text>
        <Text fontSize={{ base: "sm", md: "md" }} fontStyle="italic" mb="6">
          “This is a game-changer! The comfort and technology blew me away.”
        </Text>
        <Text fontSize="lg" fontWeight="bold" mb="2">
          Eleanor Smith
        </Text>
        <Text fontSize="sm" mb="4">
          Automotive Journalist
        </Text>
        <Flex
          align="center"
          justify={{ base: "center", md: "flex-start" }}
          mb="6"
        >
          {[...Array(5)].map((_, index) => (
            <Icon
              as={StarIcon}
              key={index}
              color="#FFBF00"
              boxSize={{ base: 4, md: 5 }}
              mr="1"
            />
          ))}
        </Flex>
        <Avatar src="/profile.png" name="Eleanor Smith" _hover={{transform:"scale(1.5)"}} />
      </MotionBox>

      {/* Right Content */}
      <Box
        flex="1"
        position="relative"
        textAlign="center"
        maxWidth={{ base: "100%", md: "50%" }}
        zIndex={{base:"0",md:"13"}}
        height="100%"
      >
        {/* Image 1 */}
        <MotionImage
          src="/image1.png"
          alt="Car 1"
          width={{ base: "90%", md: "50%" }}
          height={{ base: "22rem", md: "33.5rem" }}
          objectFit="cover"
          position={{ base: "relative", md: "absolute" }}
          left={{ base: "-20", md: "0%" }}
          top={{ base: "0%", md: "5%" }}
          boxShadow="lg"
          zIndex={{base:"10",md:"15"}}
          margin={4}
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2 }}
          opacity={{base:"0.6 !important",md:"1 !important"}}
          borderRadius="1rem"
          cursor="crosshair"
          _hover={{ opacity: "0.5 !important",filter: "brightness(0.8)",transform:"scale(1.05) rotate(-10deg) translate3d(-1rem,0.5rem,3rem) !important", zIndex:"13" }}
        />
        {/* Image 2 */}
        <MotionImage
          src="/image2.png"
          alt="Car 2"
          width={{ base: "90%", md: "50%" }}
          height={{ base: "22rem", md: "33.5rem" }}
          objectFit="cover"
          right={{ base: "-20", md: "-5%" }}
          position={{ base: "relative", md: "absolute" }}
          bottom={{ base: "25%", md: "5%" }}
          boxShadow="lg"
          zIndex={{base:"11",md:"14"}}
          margin={4}
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.4 }}
          opacity={{base:"0.6 !important",md:"1 !important"}}
          borderRadius="1rem"
          cursor="crosshair"
          _hover={{ opacity: "0.5 !important",filter: "brightness(0.8)",transform:"scale(1.05) rotate(10deg) translate3d(-1rem,0.5rem,3rem) !important" }}
        />
      </Box>
    </Flex>
  );
};

export default TestimonialSection;
