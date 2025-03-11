import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FaDollarSign, FaCar, FaHeadset, FaShieldAlt } from "react-icons/fa";

const FeatureHighlights = () => {
  const features = [
    {
      icon: FaDollarSign,
      title: "Affordable Rates",
      description:
        "Enjoy budget-friendly pricing without compromising on quality.",
    },
    {
      icon: FaCar,
      title: "Wide Selection of Cars",
      description:
        "Choose from a diverse range of vehicles to suit your needs.",
    },
    {
      icon: FaHeadset,
      title: "24/7 Customer Support",
      description: "We're here to assist you anytime, day or night.",
    },
    {
      icon: FaShieldAlt,
      title: "Safety Guaranteed",
      description:
        "Experience peace of mind with our top-notch safety measures.",
    },
  ];

  return (
    <Flex
      bg="#10141e"
      color="white"
      py={12} // Increased padding for greater height
      px={4}
      justify="center"
      wrap="wrap"
      gap={6}
      minHeight={{ base: "400px", md: "500px" }} // Consistent height across all screen sizes
    >
      {features.map((feature, index) => (
        <Box
          key={index}
          textAlign="center"
          p={6}
          borderWidth="1px"
          borderColor="#00db00"
          borderRadius="lg"
          boxShadow="xl"
          w={{ base: "90%", sm: "300px", md: "250px" }}
          transition="transform 0.2s"
          _hover={{
            transform: "scale(1.03) rotate(5deg) translate3d(-1rem,0.5rem,3rem)",
            boxShadow: "2xl",
            bg: "gray.800",
            boxShadow: "0px 0px 20px 5px #00db00",
          }}
        >
          <Icon
            as={feature.icon}
            my={{ md: "20px" }}
            boxSize={{ md: "20", base: "12" }}
            color="#00db00"
          />{" "}
          {/* Larger icon size */}
          <Text
            fontWeight="bold"
            fontSize={{ md: "2xl", base: "xl" }}
            mb={{ md: "2" }}
            mt={4}
          >
            {feature.title}
          </Text>
          <Text fontSize="sm" mt={2} color="gray.300">
            {feature.description}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

export default FeatureHighlights;
