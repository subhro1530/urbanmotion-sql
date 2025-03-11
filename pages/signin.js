import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
  Select,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Others/Navbar";

const MotionBox = motion(Box);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("customer");
  const [isLoading, setIsLoading] = useState(false);
  const [isRouterLoading, setIsRouterLoading] = useState(true);
  const toast = useToast();
  const router = useRouter();

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
    } else {
      setIsRouterLoading(false);
    }
  }, [router, toast]);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);

      // API Endpoint
      const endpoint =
        "https://car-rental-backend-postgres.vercel.app/api/customers/verify-customer";

      // Request Body
      const formData = { email, password };

      console.log("Posting to endpoint:", endpoint);
      console.log("Posted JSON:", JSON.stringify(formData));

      // Make API Request
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Response Status:", response.status);
      const result = await response.json();
      console.log("Response JSON:", result);

      // If valid response, proceed to dashboard
      if (response.ok && result.id && result.email === email) {
        toast({
          title: "Success",
          description: "Logged in successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Store session details
        localStorage.setItem("userType", "customer");
        localStorage.setItem("sessionId", result.id);
        console.log("Session ID stored:", result.id);

        setIsLoading(false);
        router.push("/dashboard");
      } else {
        throw new Error("Invalid login credentials.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {isRouterLoading && (
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
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        width="100vw"
      >
        {/* Sign In Form */}
        <MotionBox
          px={8}
          py={12}
          backgroundImage="url('/signup_bg.jpg')"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          color="lightgreen"
          textAlign="center"
          w="70%"
          minH="100vh"
          borderRadius="lg"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Heading fontSize="3xl" mb={4}>
            Sign In
          </Heading>
          <Text fontSize="sm" mb={6} color="gray.400">
            Enter your credentials to access your account.
          </Text>
          <Input
            name="email"
            placeholder="Email"
            bg="gray.100"
            color="black"
            mb={4}
            width="350px"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            bg="gray.100"
            color="black"
            mb={4}
            width="350px"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            bg="white"
            color="black"
            fontSize="lg"
            px="5"
            py="4"
            _hover={{ bg: "#00db00", boxShadow: "0 0 15px #00db00" }}
            onClick={handleSignIn}
          >
            SIGN IN
          </Button>
          {isLoading && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="50px"
            >
              <Spinner size="md" color="black" />
            </Box>
          )}
          <Image
            src="/side_car_left.png"
            alt="Logo"
            h="200px"
            position="absolute"
            bottom={0}
            left={10}
            display={{ base: "none", md: "unset" }}
          />
        </MotionBox>

        {/* Sign Up Redirect */}
        <MotionBox
          px={8}
          py={8}
          bg="gray.900"
          color="#00db00"
          boxShadow="2xl"
          borderRadius="lg"
          w="30%"
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minH="100vh"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Heading fontSize="4xl" mb={4}>
            New Here?
          </Heading>
          <Text fontSize="md" mb={6}>
            Sign up and discover a great amount of new opportunities!
          </Text>
          <Button
            bg="black"
            color="lightgreen"
            fontSize="lg"
            px="5"
            py="4"
            _hover={{ bg: "#00db00", boxShadow: "0 0 15px #00db00" }}
            onClick={() => router.push("/signup")}
          >
            SIGN UP
          </Button>
        </MotionBox>
      </Flex>
    </>
  );
};

export default SignIn;
