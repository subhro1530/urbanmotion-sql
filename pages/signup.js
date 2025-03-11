import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/Others/Navbar";
import { useRouter } from "next/router";

const MotionBox = motion(Box);

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toast = useToast();

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      router.push("/dashboard");
      toast({
        title: "Already Logged In",
        description: "Redirecting to your dashboard.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    } else {
      setIsLoading(false);
    }
  }, [router, toast]);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Sign Up button handler
  const handleSignUp = async () => {
    setIsLoading(true);
    const apiEndpoint =
      "https://car-rental-backend-postgres.vercel.app/api/customers/add-customer";

    // Validate required fields
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "All fields are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
        router.push("/signin"); // Redirect to sign-in page
      } else {
        throw new Error(result.message || "Signup failed.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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
          position="absolute"
          bg="rgba(0,0,0,0.5)"
          zIndex={3}
          width="100%"
        >
          <Image
            src="/Resources/car-rent.png"
            alt="Loading"
            h="50px"
            zIndex={4}
          />
          <Spinner size="xl" color="green" />
        </Box>
      )}

      <Navbar />

      <Flex
        minH="100vh"
        bg="black"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100vw"
      >
        <MotionBox
          px={8}
          py={12}
          bg="gray.900"
          color="#00db00"
          textAlign="center"
          borderRadius="lg"
          display="flex"
          flexDirection="column"
          alignItems="center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading fontSize="3xl" mb={4}>
            Create an Account
          </Heading>
          <Text fontSize="md" mb={6}>
            Fill in the details below:
          </Text>

          <Input
            name="name"
            placeholder="Full Name"
            bg="gray.100"
            mb={3}
            width="300px"
            onChange={handleInputChange}
            _focus={{ borderColor: "green.400", boxShadow: "0 0 8px green" }}
          />
          <Input
            name="email"
            placeholder="Email"
            type="email"
            bg="gray.100"
            mb={3}
            width="300px"
            onChange={handleInputChange}
            _focus={{ borderColor: "green.400", boxShadow: "0 0 8px green" }}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            bg="gray.100"
            mb={3}
            width="300px"
            onChange={handleInputChange}
            _focus={{ borderColor: "green.400", boxShadow: "0 0 8px green" }}
          />

          <Button
            width="300px"
            onClick={handleSignUp}
            bg="white"
            color="black"
            border="2px solid transparent"
            borderRadius="md"
            fontSize="lg"
            py={3}
            _hover={{
              bg: "#00db00",
              boxShadow: "0 0 15px #00db00, 0 0 30px #00db00",
              border: "2px solid #00db00",
              color: "white",
            }}
            sx={{ transition: "0.3s ease" }}
          >
            SIGN UP
          </Button>

          {isLoading && <Spinner size="md" color="white" mt={4} />}
        </MotionBox>
      </Flex>
    </>
  );
};

export default SignUp;
