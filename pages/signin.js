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
  const [adminPassphrase, setAdminPassphrase] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [isRouterLoading, setIsRouterLoading] = useState(true); // State to track loading
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
    }
    else{
      setIsRouterLoading(false);
    }
  }, [router, toast]);


  const handleSignIn = async () => {
    try {
      // Determine the endpoint based on userType
      setIsLoading(true); // Set loading to true before fetching
      let endpoint = "";
      if (userType === "customer") {
        endpoint = "/api/customers/verify-customer";
      } else if (userType === "retailer") {
        endpoint = "/api/retailers/verify-retailer";
      } else if (userType === "admin") {
        // Check admin passphrase (in case the backend requires one)
        if (adminPassphrase !== "urbancars") {
          throw new Error("Invalid admin passphrase.");
        }
        endpoint = "/api/admins/verify-admin";
      }

      // Prepare form data (without userType)
      const formData = { email, password };

      // Log the JSON and the endpoint to the console
      console.log(
        "Posting to endpoint:",
        `https://urban-motion-backend.vercel.app${endpoint}`
      );
      console.log("Posted JSON:", JSON.stringify(formData));

      // Make POST request to the appropriate endpoint
      const response = await fetch(
        `https://urban-motion-backend.vercel.app${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      // Log response status and body
      console.log("Response Status:", response.status);
      const result = await response.json();
      console.log("Response JSON:", result);

      // Check if the response is successful and contains the sessionId
      // Inside handleSignIn function in SignIn component
      // Inside handleSignIn function in SignIn component
      if (response.ok && result.verified) {
        toast({
          title: "Success",
          description: "Logged in successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Store user type in localStorage
        localStorage.setItem("userType", userType);
        if (result.sessionId) {
          localStorage.setItem("sessionId", result.sessionId);
          console.log("Session ID stored in localStorage:", result.sessionId);
        }
        setIsLoading(false); // Set loading to false after data is fetched
        // Redirect to the dashboard page after successful login
        router.push("/dashboard");
      } else {
        setIsLoading(false); // Set loading to false after data is fetched
        throw new Error(result.message || "Invalid login credentials.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
        minH={{ base: "100vh", md: "100vh" }}
        bg="black"
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        width="100vw"
      >
        {/* Left Panel - Sign In Form */}
        <MotionBox
          px={8}
          py={12}
          backgroundImage="url('/signup_bg.jpg')"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          color="lightgreen"
          textAlign="center"
          w={{ base: "100%", md: "70%" }}
          minH={{ base: "90vh", md: "100vh" }}
          borderRadius={{ base: "none", md: "lg" }}
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
          <Select
            name="accountType"
            bg="gray.100"
            color="black"
            mb={4}
            width={{ base: "300px", md: "350px" }}
            defaultValue=""
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
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
            name="email"
            placeholder="Email"
            bg="gray.100"
            color="black"
            mb={4}
            width={{ base: "300px", md: "350px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Input
            name="password"
            type="password"
            color="black"
            placeholder="Password"
            bg="gray.100"
            mb={4}
            width={{ base: "300px", md: "350px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {userType === "admin" && (
            <Input
              type="password"
              placeholder="Admin Passphrase"
              width={{ base: "300px", md: "350px" }}
              bg="gray.100"
              color="black"
              mb={4}
              value={adminPassphrase}
              onChange={(e) => setAdminPassphrase(e.target.value)}
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
          )}
          <Button
            bg="white"
            color="black"
            border="2px solid transparent"
            borderRadius="md"
            fontSize="lg"
            px="5"
            py="4"
            _hover={{
              bg: "#00db00",
              boxShadow: "0 0 15px #00db00, 0 0 30px #00db00",
              border: "2px solid #00db00",
              color: "white",
            }}
            sx={{
              boxShadow: "0 0 10px #00db00, 0 0 20px rgba(0, 219, 0, 0.5)",
              transition: "0.3s ease",
            }}
            onClick={handleSignIn}
          >
            SIGN IN
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
          <Image src="/side_car_left.png" alt="Logo" h="200px" cursor="pointer" position="absolute" bottom={0} left={10} display={{ base: "none", md: "unset" }} />
        </MotionBox>

        {/* Right Panel - Sign Up Redirect */}
        <MotionBox
          px={{ base: 6, md: 8 }}
          py={{ base: 10, md: 8 }}
          bg="gray.900"
          color="#00db00"
          boxShadow="2xl"
          borderRadius="lg"
          w={{ base: "100%", md: "30%" }}
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent={{ base: "unset", md: "center" }}
          alignItems="center"
          minH={{ base: "60vh", md: "100vh" }}
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Heading fontSize={{ base: "2xl", md: "4xl" }} mb={4}>
            New Here?
          </Heading>
          <Text fontSize="md" mb={6}>
            Sign up and discover a great amount of new opportunities!
          </Text>
          <Button
            bg="black"
            color="lightgreen"
            border="2px solid transparent"
            borderRadius="md"
            fontSize="lg"
            px="5"
            py="4"
            _hover={{
              bg: "#00db00",
              boxShadow: "0 0 15px #00db00, 0 0 30px #00db00",
              border: "2px solid #00db00",
              color: "white",
            }}
            sx={{
              boxShadow: "0 0 10px #00db00, 0 0 20px rgba(0, 219, 0, 0.5)",
              transition: "0.3s ease",
            }}
            onClick={() => router.push("/signup")}
          >
            SIGN UP
          </Button>
          <Image src="/side_car_left.png" alt="Logo" h="200px" cursor="pointer" position="absolute" bottom={0} display={{ base: "flex", md: "none" }} justifyContent="center" alignItems="center" />
        </MotionBox>
      </Flex>
    </>
  );
};

export default SignIn;
