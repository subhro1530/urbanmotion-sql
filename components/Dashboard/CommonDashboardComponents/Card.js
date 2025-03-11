import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, HStack, Spinner, Input, Button, IconButton, Image, Select, SimpleGrid, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaEdit, FaSave, FaTimesCircle } from "react-icons/fa";

const MotionBox = motion(Box);

const Card = ({ userType, userData }) => {
  userType = userType.toLowerCase();
  const toast = useToast();
  const [isEditable, setIsEditable] = useState(false); // Editable state
  const [formData, setFormData] = useState(userData || {}); // Form data for inputs
  const [isFlipped, setIsFlipped] = useState(false); // Flip animation state


  useEffect(() => {
    setFormData(userData);
  }, [userData])


  const handleEditClick = () => {
    setIsFlipped(!isFlipped);
    setIsEditable(!isEditable);
  };
  const handleCancelClick = () => {
    setIsFlipped(!isFlipped);
    setIsEditable(!isEditable);
    setFormData(userData);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAdditionalChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Check for changes in the form data
    const changes = {};
    for (const key in formData) {
      if (formData[key] !== userData[key]) {
        changes[key] = formData[key];
      }
    }

    // If there are no changes, no need to proceed
    if (Object.keys(changes).length === 0) {
      toast({
        title: "No changes detected",
        description: "You haven't made any changes.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      setIsEditable(false);
      setIsFlipped(false);
      return;
    }

    // Add the email field as it's required
    const payload = { email: userData.email, ...changes };

    let endpoint = "";
    if (userType === "customer") {
      endpoint = "https://urban-motion-backend.vercel.app/api/customers/update-customer";
    } else if (userType === "retailer") {
      endpoint = "https://urban-motion-backend.vercel.app/api/retailers/update-retailer";
    } else if (userType === "admin") {
      endpoint = "https://urban-motion-backend.vercel.app/api/admins/update-admin";
    } else {
      toast({
        title: "Invalid User Type",
        description: "Unable to process the request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save data.");
      }

      toast({
        title: "Success",
        description: "Your changes have been saved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving your changes.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsEditable(false);
      setIsFlipped(false);
    }
  };

  return (
    <MotionBox
      w={{ base: "325px", md: "500px" }}
      h={{ base: "225px", md: "300px" }}
      bgImage="url('/card_bg.jpg')"
      bgSize="cover"
      bgPosition="center"
      borderRadius="lg"
      boxShadow="2xl"
      position="relative"
      border="1px solid white"
      m={6}
      p={6}
      cursor="pointer"
      animate={{ rotateY: isFlipped ? 360 : 0 }}
      style={{ perspective: "1000px" }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      <IconButton
        aria-label="Menu"
        icon={isEditable ? <FaSave /> : <FaEdit />}
        bg="transparent"
        color="black"
        fontSize={{ base: "16px", md: "24px" }}
        _hover={{
          color: "white",
        }}
        onClick={isEditable ? handleSave : handleEditClick}
        position="absolute"
        top={{ base: -2, md: 3 }}
        right={{ base: -2, md: 3 }}
        zIndex={12}
      />
      <IconButton
        aria-label="Menu"
        icon={<FaTimesCircle />}
        display={isEditable ? "block" : "none"}
        bg="transparent"
        color="black"
        fontSize={{ base: "16px", md: "24px" }}
        _hover={{
          color: "white",
        }}
        onClick={handleCancelClick}
        position="absolute"
        top={{ base: -2, md: 3 }}
        left={{ base: 1, md: 3 }}
        zIndex={12}
      />
      {userType === "loading" && (<Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        minHeight="200px"
      >
        <Spinner boxSize="70px" color="white" />
        <Text color="green" fontSize="xl" mt={4}>Loading User Details</Text>
      </Box>)}

      {/* Front Side of the Card */}
      {!isFlipped && formData && (
        <HStack>
          <VStack align="start" color="#ffffff" spacing="3" h="100%" width="80%">
            <Text
              fontSize={{ base: "xl", md: "4xl" }}
              fontWeight="bold"
              color="darkgreen"
              textShadow="0 0 5px #b0ffb0, 0 0 10px #70ff70, 0 0 15px #00db00"
            >
              {userType.toUpperCase()}
            </Text>
            <Box flex="1">
              {formData.name && <Text fontSize={{ base: "md", md: "2xl" }} textTransform="capitalize" m={1}>Name: {formData.name}</Text>}
              {formData.drivingLicenseId && (
                <Text fontSize={{ base: "sm", md: "xl" }} m={1}>License ID: {formData.drivingLicenseId}</Text>
              )}
              {formData.verificationType && (
                <Text fontSize={{ base: "sm", md: "xl" }} m={1} textTransform="capitalize">
                  Verification Type: {formData.verificationType}
                </Text>
              )}
              {formData.verificationId && (
                <Text fontSize={{ base: "sm", md: "xl" }} m={1}>Verification ID: {formData.verificationId}</Text>
              )}
              {formData.position && <Text fontSize={{ base: "sm", md: "xl" }}>Position: {formData.position}</Text>}
            </Box>
            <Text
              position="absolute"
              bottom="5"
              right="5"
              fontSize={{ base: "xs", md: "sm" }}
              color="rgba(255, 255, 255, 0.7)"
            >
              UrbanMotion ID Card
            </Text>
          </VStack>
          <VStack align="start" color="#ffffff" spacing="3" h="100%" p={1} width="20%">
            <Image src="/Resources/car-rent.png" alt="" h="auto" />
          </VStack>
        </HStack>
      )}

      {/* Back Side of the Card */}
      {isFlipped && formData && (
        <VStack spacing="6" align="center" justify="center" h="100%" mt={{ base: 1, md: 6 }}>
          <SimpleGrid columns={2} spacing={2} alignItems="center" width="100%" maxWidth="500px">
            <Text fontSize={{ base: "md", md: "lg" }} textAlign="right" pr={4} fontWeight="medium" color="white">
              Name:
            </Text>
            <Input
              placeholder="Name"
              value={formData.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              size={{ base: "md", md: "lg" }}
              bg="rgba(255, 255, 255, 0.1)"
              color="white"
              border="none"
              width="100%"
              _hover={{
                bg: "rgba(255, 255, 255, 0.2)",
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
              _focus={{
                outline: "none",
                bg: "rgba(255, 255, 255, 0.3)",
                borderColor: "rgba(0, 255, 0, 0.8)",
                boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
              }}
            />
            {userType === "customer" && (
              <>
                <Text fontSize={{ base: "md", md: "lg" }} textAlign="right" pr={4} fontWeight="medium" color="white">
                  Driving License ID:
                </Text>
                <Input
                  placeholder="Driving License ID"
                  value={formData.drivingLicenseId || ""}
                  onChange={(e) => handleInputChange("drivingLicenseId", e.target.value)}
                  size={{ base: "md", md: "lg" }}
                  bg="rgba(255, 255, 255, 0.1)"
                  color="white"
                  border="none"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.2)",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "rgba(255, 255, 255, 0.3)",
                    borderColor: "rgba(0, 255, 0, 0.8)",
                    boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                  }}
                  width="100%"
                />
              </>
            )}
            <Text fontSize={{ base: "md", md: "lg" }} textAlign="right" pr={4} fontWeight="medium" color="white">
              Verification ID Type:
            </Text>
            <Select
              name="verificationType"
              bg="rgba(255, 255, 255, 0.1)"
              border="2px solid rgba(255, 255, 255, 0.3)"
              color="white"
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="medium"
              borderRadius="md"
              onChange={handleAdditionalChange}
              _hover={{
                bg: "rgba(255, 255, 255, 0.2)",
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
              _focus={{
                outline: "none",
                bg: "rgba(255, 255, 255, 0.3)",
                borderColor: "rgba(0, 255, 0, 0.8)",
                boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
              }}
              defaultValue=""
              width="100%"
            >
              <option value="" disabled style={{ color: "gray", fontWeight: "bold" }}>
                Select Verification ID Type
              </option>
              <option value="aadhar" style={{ color: "black", fontWeight: "bold" }}>
                Aadhar
              </option>
              <option value="pan" style={{ color: "black", fontWeight: "bold" }}>
                PAN
              </option>
            </Select>
            <Text fontSize={{ base: "md", md: "lg" }} textAlign="right" pr={4} fontWeight="medium" color="white">
              Verification ID:
            </Text>
            <Input
              placeholder="Verification ID"
              value={formData.verificationId || ""}
              onChange={(e) => handleInputChange("verificationId", e.target.value)}
              size={{ base: "md", md: "lg" }}
              bg="rgba(255, 255, 255, 0.1)"
              color="white"
              border="none"
              width="100%"
              _hover={{
                bg: "rgba(255, 255, 255, 0.2)",
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
              _focus={{
                outline: "none",
                bg: "rgba(255, 255, 255, 0.3)",
                borderColor: "rgba(0, 255, 0, 0.8)",
                boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
              }}
            />
            {userType === "admin" && (
              <>
                <Text fontSize={{ base: "md", md: "lg" }} textAlign="right" pr={4} fontWeight="medium" color="white">
                  Position:
                </Text>
                <Input
                  placeholder="Position"
                  value={formData.position || ""}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  size={{ base: "md", md: "lg" }}
                  bg="rgba(255, 255, 255, 0.1)"
                  color="white"
                  border="none"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.2)",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  }}
                  _focus={{ outline: "none", bg: "rgba(255, 255, 255, 0.2)" }}
                  width="100%"
                />
              </>
            )}
          </SimpleGrid>
        </VStack>
      )}
    </MotionBox>
  );
};

export default Card;
