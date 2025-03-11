import { Box, useToast, Text, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomerDashboard from "../components/Dashboard/Customer/CustomerDashboard";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    // Fetch userType from localStorage
    const storedUserType = localStorage.getItem("userType");

    // If userType is not found, redirect to login page
    if (!storedUserType) {
      toast({
        title: "Not Authenticated",
        description: "Please log in to access the dashboard.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      router.push("/signin");
      return;
    }

    // Set the userType from localStorage and stop the loading spinner
    setUserType(storedUserType);
    setLoading(false);
  }, [toast, router]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" color="teal.500" />
      </Box>
    );
  }

  return (
    <Box
      p={{ base: 0, md: 1 }}
      bgGradient="linear( rgba(0, 50, 0, 0.9), rgba(38, 226, 91, 1) 50%, rgba(30, 200, 50, 0.9))"
      minH={{ base: "100vh", md: "100vh" }}
    >
      {userType === "customer" && <CustomerDashboard />}
      {!userType && (
        <Text color="gray.400">Invalid user type. Please log in again.</Text>
      )}
    </Box>
  );
};

export default Dashboard;
