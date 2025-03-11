import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  useToast,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState,useEffect } from "react";
import Navbar from "@/components/Others/Navbar";
import { useRouter } from "next/router";


const MotionBox = motion(Box);

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "customer", // Default account type
  });
  const [additionalData, setAdditionalData] = useState({
    drivingLicenseId: "",
    verificationType: "aadhar", // Default verification type
    verificationId: "",
    position: "", // Only for admin
    passcode: "", // Only for admin
  });
  const toast = useToast();

  useEffect(() => {
      const sessionId = localStorage.getItem("sessionId");
      const userType = localStorage.getItem("userType");
  
      if (sessionId && userType) {
        router.push("/dashboard");
        toast({
          title: "Already Logged In",
          description: "You are already logged in. Redirecting to the dashboard.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      }
      else{
        setIsLoading(false);
      }
    }, [router, toast]);

  // General input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Additional data input change handler
  const handleAdditionalChange = (e) => {
    const { name, value } = e.target;
    setAdditionalData((prev) => ({ ...prev, [name]: value }));
  };

  // Sign Up button handler
  const handleSignUp = async () => {
    setIsLoading(true); // Set loading to true before fetching
    const apiEndpoints = {
      customer:
        "https://urban-motion-backend.vercel.app/api/customers/add-customer",
      retailer:
        "https://urban-motion-backend.vercel.app/api/retailers/add-retailer",
      admin: "https://urban-motion-backend.vercel.app/api/admins/add-admin",
    };

    const { accountType, ...filteredFormData } = formData; // Remove accountType
    const payload = {
      ...filteredFormData,
      drivingLicenseId: additionalData.drivingLicenseId,
      verificationType: additionalData.verificationType,
      verificationId: additionalData.verificationId,
    };

    // Validate required fields
    if (!payload.verificationId) {
      toast({
        title: "Error",
        description: "Verification ID is required for all account types.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Admin validation
    if (formData.accountType === "admin") {
      if (!additionalData.position || !additionalData.passcode) {
        toast({
          title: "Error",
          description: "Position and passcode are required for admin.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      payload.position = additionalData.position;
      payload.passcode = additionalData.passcode;

      // Remove any keys that are not needed for admin
      delete payload.drivingLicenseId;
      delete payload.verificationType;
    }

    console.log("Payload being posted:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(apiEndpoints[formData.accountType], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: result.message || "Account created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false); // Set loading to false after data is fetched
      } else {
        setIsLoading(false); // Set loading to false after data is fetched
        throw new Error(result.message || "Error during signup.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false); // Set loading to false after data is fetched
    }
  };
  return (
    <>
      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          flexDirection="column"
          position="absolute"
          bg="rgba(0,0,0,0.5)"
          zIndex={3}
          width="100%"
          borderRadius="lg"
        >
          <Image src="/Resources/car-rent.png" alt="" h="50px" zIndex={4} />
          <Spinner size="xl" color="green" />
        </Box>
      )}
      <Navbar />
      <Flex
        minH="100vh"
        bg="black"
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        width="100vw"
        flexDir={{ base: "column-reverse", md: "unset" }}
      >
        {/* Left Panel */}
        <MotionBox
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          bg="gray.900"
          color="#00db00"
          px={8}
          py={12}
          w={{ base: "100%", md: "30%" }}
          textAlign="center"
          minH={{ base: "60vh", md: "100vh" }}
          borderRadius={{ base: "none", md: "lg" }}
          display="flex"
          justifyContent={{ base: "unset", md: "center" }}
          alignItems="center"
          flexDirection="column"
        >
          <Heading fontSize={{ base: "2xl", md: "4xl" }} mb={4} zIndex={2}>
            Welcome Back!
          </Heading>
          <Text fontSize="md" mb={8} zIndex={2}>
            To keep connected with us please log in with your personal info
          </Text>
          <Button
            bg="black" // Button background
            color="lightgreen" // Text color
            border="2px solid transparent" // Initial border
            borderRadius="md"
            fontSize="lg"
            px="5"
            py="4"
            position="relative"
            zIndex={2}
            _hover={{
              bg: "#00db00", // Keep background color on hover
              boxShadow: "0 0 15px #00db00, 0 0 30px #00db00", // Glowing effect
              border: "2px solid #00db00", // Highlight border
              color: "white"
            }}
            sx={{
              boxShadow: "0 0 10px #00db00, 0 0 20px rgba(0, 219, 0, 0.5)", // Default glow
              transition: "0.3s ease", // Smooth transition
            }}
            onClick={() => router.push("/signin")}
          >
            SIGN IN
          </Button>
          <Image src="/side_car_right.png" alt="Logo" h="200px" cursor="pointer" position="absolute" bottom={0} display={{ base: "flex", md: "none" }} justifyContent="center" alignItems="center" />
        </MotionBox>

        {/* Right Panel */}
        <MotionBox
          px={{ base: 6, md: 8 }}
          py={8}
          backgroundImage="url('/signup_bg.jpg')"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          boxShadow="2xl"
          borderRadius="lg"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          w={{ base: "100%", md: "70%" }}
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minH="100vh"
          paddingTop="92px"
        >
          <Heading fontSize="3xl" color="white" mb={4}>
            Create an Account
          </Heading>
          <Text fontSize="sm" color="whitesmoke" mb={6}>
            Fill in the details below for registration:
          </Text>
          <Select
            name="accountType"
            bg="gray.100"
            mb={2}
            width={{ base: "300px", md: "300px" }}
            onChange={handleInputChange}
            defaultValue=""
            _hover={{
              bg: "rgba(255, 255, 255, 0.7)",
              borderColor: "rgba(255, 255, 255, 0.5)",
            }}
            _focus={{
              outline: "none",
              bg: "rgba(255, 255, 255, 0.5)",
              borderColor: "rgba(0, 255, 0, 0.8)",
              boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
            }}
          >
            <option value="" disabled>
              Select Account Type
            </option>
            <option value="customer">👤 Customer</option>
            <option value="retailer">🏪 Retailer</option>
            <option value="admin">👑 Admin</option>
          </Select>
          <Input
            name="name"
            placeholder="Full Name"
            bg="gray.100"
            mb={2}
            width={{ base: "300px", md: "300px" }}
            onChange={handleInputChange}
            _hover={{
              bg: "rgba(255, 255, 255, 0.7)",
              borderColor: "rgba(255, 255, 255, 0.5)",
            }}
            _focus={{
              outline: "none",
              bg: "rgba(255, 255, 255, 0.5)",
              borderColor: "rgba(0, 255, 0, 0.8)",
              boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
            }}
            type="text"
          />
          <Input
            name="email"
            placeholder="Email"
            bg="gray.100"
            mb={2}
            width={{ base: "300px", md: "300px" }}
            onChange={handleInputChange}
            _hover={{
              bg: "rgba(255, 255, 255, 0.7)",
              borderColor: "rgba(255, 255, 255, 0.5)",
            }}
            _focus={{
              outline: "none",
              bg: "rgba(255, 255, 255, 0.5)",
              borderColor: "rgba(0, 255, 0, 0.8)",
              boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
            }}
            type="email"
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            bg="gray.100"
            mb={2}
            width={{ base: "300px", md: "300px" }}
            onChange={handleInputChange}
            _hover={{
              bg: "rgba(255, 255, 255, 0.7)",
              borderColor: "rgba(255, 255, 255, 0.5)",
            }}
            _focus={{
              outline: "none",
              bg: "rgba(255, 255, 255, 0.5)",
              borderColor: "rgba(0, 255, 0, 0.8)",
              boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
            }}
          />
          {formData.accountType === "customer" &&
            <Input
              name="drivingLicenseId"
              placeholder="Driving License ID (optional)"
              bg="gray.100"
              mb={2}
              width={{ base: "300px", md: "300px" }}
              onChange={handleAdditionalChange}
              _hover={{
                bg: "rgba(255, 255, 255, 0.7)",
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
              _focus={{
                outline: "none",
                bg: "rgba(255, 255, 255, 0.5)",
                borderColor: "rgba(0, 255, 0, 0.8)",
                boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
              }}
              type="text"
            />
          }
          <Select
            name="verificationType"
            bg="gray.100"
            mb={2}
            width={{ base: "300px", md: "300px" }}
            onChange={handleAdditionalChange}
            defaultValue=""
            _hover={{
              bg: "rgba(255, 255, 255, 0.7)",
              borderColor: "rgba(255, 255, 255, 0.5)",
            }}
            _focus={{
              outline: "none",
              bg: "rgba(255, 255, 255, 0.5)",
              borderColor: "rgba(0, 255, 0, 0.8)",
              boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
            }}
          >
            <option value="" disabled>
              Select Verification ID Type
            </option>
            <option value="aadhar">Aadhar</option>
            <option value="pan">PAN</option>
          </Select>
          <Input
            name="verificationId"
            placeholder="Verification ID"
            bg="gray.100"
            mb={2}
            width={{ base: "300px", md: "300px" }}
            onChange={handleAdditionalChange}
            _hover={{
              bg: "rgba(255, 255, 255, 0.7)",
              borderColor: "rgba(255, 255, 255, 0.5)",
            }}
            _focus={{
              outline: "none",
              bg: "rgba(255, 255, 255, 0.5)",
              borderColor: "rgba(0, 255, 0, 0.8)",
              boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
            }}
            type="text"
          />
          {formData.accountType === "admin" && (
            <>
              <Input
                name="position"
                placeholder="Position"
                bg="gray.100"
                mb={2}
                width={{ base: "300px", md: "300px" }}
                onChange={handleAdditionalChange}
                _hover={{
                  bg: "rgba(255, 255, 255, 0.7)",
                  borderColor: "rgba(255, 255, 255, 0.5)",
                }}
                _focus={{
                  outline: "none",
                  bg: "rgba(255, 255, 255, 0.5)",
                  borderColor: "rgba(0, 255, 0, 0.8)",
                  boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                }}
                type="text"
              />
              <Input
                name="passcode"
                placeholder="Passcode"
                type="password"
                bg="gray.100"
                mb={2}
                width={{ base: "300px", md: "300px" }}
                onChange={handleAdditionalChange}
                _hover={{
                  bg: "rgba(255, 255, 255, 0.7)",
                  borderColor: "rgba(255, 255, 255, 0.5)",
                }}
                _focus={{
                  outline: "none",
                  bg: "rgba(255, 255, 255, 0.5)",
                  borderColor: "rgba(0, 255, 0, 0.8)",
                  boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                }}
              />
            </>
          )}
          <Button
            mb={2}
            width={{ base: "300px", md: "110px" }}
            onClick={handleSignUp}
            bg="white" // Button background
            color="black" // Text color
            border="2px solid transparent" // Initial border
            borderRadius="md"
            fontSize="lg"
            px="5"
            py="4"
            position="relative"
            _hover={{
              bg: "#00db00", // Keep background color on hover
              boxShadow: "0 0 15px #00db00, 0 0 30px #00db00", // Glowing effect
              border: "2px solid #00db00", // Highlight border
              color: "white"
            }}
            sx={{
              boxShadow: "0 0 10px #00db00, 0 0 20px rgba(0, 219, 0, 0.5)", // Default glow
              transition: "0.3s ease", // Smooth transition
            }}
          >
            SIGN UP
          </Button>
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="200px"
            >
              <Spinner size="md" color="black" />
            </Box>
          ) : null}
          <Image src="/side_car_right.png" alt="Logo" h="200px" cursor="pointer" position="absolute" bottom={0} right={10} display={{ base: "none", md: "unset" }} />
        </MotionBox>
      </Flex>
    </>
  );
};

export default SignUp;
