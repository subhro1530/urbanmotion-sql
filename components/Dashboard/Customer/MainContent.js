import {
  Box, Heading, Text, useColorModeValue, Flex, Button, Image, Spinner, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  useToast,
  Input
} from "@chakra-ui/react";
import { useState } from "react";
import Card from "../CommonDashboardComponents/Card";


const MainContent = ({ customerData }) => {
  const bgColor = useColorModeValue("gray.800", "gray.800");
  // State for managing gender
  const [gender, setGender] = useState("male"); // Default gender is male
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // Function to toggle gender
  const toggleGender = () => {
    setGender((prevGender) => (prevGender === "male" ? "female" : "male"));
  };
  
  return (
    <>
      <Box flex="1" p={6} bg={bgColor} borderRadius="lg" display={{ base: "flex", md: "flex" }}
        flexDirection={{ base: "column-reverse", md: "column" }} justifyContent={{ base: "center", md: "flex-start" }} alignItems={{ base: "center", md: "flex-start" }} maxW="800px" minH={{ base: "100vh", md: "100vh" }}
      >
        {/* Welcome Text */}
        <Text color="gray.400" mb={6} display={{ base: "unset", md: "none" }} >
          Here&apos;s your dashboard where you can manage cars, bookings, account
          settings, and more.
        </Text>
        <Heading color="#00db00" p={{ base: 6, md: 0 }} mb={4} width={{ base: "100vw" }}fontSize={{base:"3xl",md:"4xl"}}>
          Welcome,<Box as="br" /> {customerData?.name || "Customer"}!
        </Heading>
        <Text color="gray.400" mb={6} display={{ base: "none", md: "unset" }}>
          Here&apos;s your dashboard where you can manage cars, bookings, account
          settings, and more.
        </Text>

        {/* Customer Details */}
        {customerData ? (
          <Box color="gray.100" mb={2} mt={2}>
            <Text>Email: {customerData.email}</Text>
          </Box>
        ) : (
          <Text></Text>
        )}

        {/* Gender Section Positioned in Top-Right */}
        <Flex
          direction="column"
          align="center"
          position={{ base: "unset", md: "absolute" }}
          top={8}
          right={6}
          p={4}
          bg="gray.700"
          borderRadius="lg"
          shadow="lg"
          w="240px"
        >
          <Image
            src={gender === "male" ? "/Resources/DefaultMale.png" : "/Resources/DefaultFemale.png"}
            alt={gender === "male" ? "Male Profile" : "Female Profile"}
            boxSize="80px"
            borderRadius="full"
            border="2px solid #00db00"
            shadow="md"
            mb={4}
          />
        </Flex>
      </Box>
    </>
  );
};

export default MainContent;
