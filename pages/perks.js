import Footer from "@/components/Others/Footer";
import Navbar from "@/components/Others/Navbar";
import { Box, Heading, Grid, Flex, Text, Icon, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaCar,
  FaMoneyBillWave,
  FaUserShield,
  FaClock,
  FaRoute,
  FaTools,
} from "react-icons/fa";

const perks = [
  // Layer 1
  { icon: FaCar, title: "Wide Range of Cars", description: "Choose from economy, luxury, or specialty vehicles to suit your needs." },
  { image: "/cars.jpg", alt: "Cars Image" },
  { icon: FaMoneyBillWave, title: "Affordable Prices", description: "Enjoy competitive rates without compromising on quality or comfort." },

  // Layer 2
  { image: "/flexible.jpg", alt: "Flexible Routes" },
  { icon: FaRoute, title: "Flexible Routes", description: "Drive freely without restrictions on mileage or routes." },
  { image: "/affordable.jpg", alt: "Affordable Image" },

  // Layer 3
  { icon: FaTools, title: "Well-Maintained Vehicles", description: "Our fleet is regularly serviced to ensure a safe and smooth ride." },
  { image: "/maintenance.jpg", alt: "Maintenance Image" },
  { icon: FaUserShield, title: "Comprehensive Insurance", description: "Drive with peace of mind with our complete insurance coverage." },

  // Layer 4
  { image: "/insurance.jpg", alt: "Insurance Image" },
  { icon: FaClock, title: "24/7 Availability", description: "Book and pick up your car anytime, anywhere for ultimate convenience." },
  { image: "/availability.jpg", alt: "Availability Image" },
];

// Motion components
const MotionFlex = motion(Flex);
const MotionBox = motion(Box);

const Perks = () => {
  return (
    <>
      <Navbar />
      <Box pt="150px" bg="gray.900" minH="100vh" pb={16} px={8}>
        <Heading
          textAlign="center"
          color="white"
          mb={12}
          fontSize={{ base: "2xl", md: "4xl" }}
          letterSpacing="wide"
          textTransform="uppercase"
        >
          Perks At <Text as="span" color="#00db00">UrbanMotion</Text>
        </Heading>
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={10}
          alignItems="center"
        >
          {perks.map((perk, index) => {
            if (perk.image) {
              // Image card
              return (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  bg="gray.800"
                  borderRadius="lg"
                  boxShadow="lg"
                  overflow="hidden"
                >
                  <Image src={perk.image} alt={perk.alt} w="full" h="200px" objectFit="cover" cursor="pointer" _hover={{
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease-in-out",
                  }}/>
                </MotionBox>
              );
            }
            // Text card
            return (
              <MotionFlex
                key={index}
                direction="column"
                align="center"
                bg="gray.800"
                p={8}
                borderRadius="lg"
                boxShadow="xl"
                _hover={{
                  transform: "translateY(-5px)",
                  bg: "gray.700",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }} // Only one transition prop
                cursor="pointer"
              >
                <Icon as={perk.icon} w={16} h={16} color="#00db00" mb={4} />
                <Heading fontSize="xl" color="white" mb={3} textAlign="center">
                  {perk.title}
                </Heading>
                <Text fontSize="md" color="gray.300" textAlign="center">
                  {perk.description}
                </Text>
              </MotionFlex>
            );
          })}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default Perks;
