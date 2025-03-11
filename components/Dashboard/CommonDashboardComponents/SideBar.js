import { Box, Text, VStack, Flex, Icon, Link, Image, Spacer, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaSignOutAlt, FaBars, FaTimes, } from "react-icons/fa"; // Icons for Profile and Logout
import { useState, useEffect } from "react";


const Sidebar = ({ text, datas, onSidebarClick }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // State for responsive menu
  const [isDesktop, setIsDesktop] = useState(false); // State for responsive menu
  useEffect(() => {
    // Function to check the device type
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsDesktop(width > 768); // Set true for desktop, false for mobile (768px breakpoint)
    };

    // Initial check
    checkDeviceType();

    // Optional: Add a resize event listener to update state if the screen size changes
    window.addEventListener("resize", checkDeviceType);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  const handleLogout = () => {
    // Logic to handle logout, like clearing user data or redirecting
    localStorage.removeItem("sessionId");
    localStorage.removeItem("userType");
    router.push("/signin"); // Redirect to login page after logout
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <IconButton
        aria-label="Menu"
        icon={isOpen ? <FaTimes /> : <FaBars />}
        display={{ base: "flex", md: "none" }}
        bg="transparent"
        color="#00db00"
        fontSize="24px"
        _hover={{
          color: "white",
        }}
        onClick={toggleMenu}
        transition="transform 0.2s"
        transform={isOpen ? "rotate(90deg)" : "rotate(0deg)"}
        position="absolute"
        right={5}
        top={5}
        zIndex={12}
      />
      {(isOpen || isDesktop) && (
        <Box
          w={{ base: "100vw", md: "20%" }}
          bg="gray.900"
          p={4}
          h={{ base: "100vh", md: "auto" }}
          color="white"
          shadow="xl"
          position={{ base: "absolute", md: "sticky" }}
          top={0}
          borderRight="2px solid #2d3748" // A subtle border to add a bit of structure
          borderRadius={{ base: 0, md: "lg" }}
          marginRight={{ md: 3 }}
          display={{ base: "flex", md: "unset" }}
          flexDirection="column"
          justifyContent={{ base: "unset", md: "center" }}
          alignItems="center"
          pt={{ base: 16, md: 0 }}
          zIndex={11}
        >
          <Link href="/" _hover={{ textDecoration: "none" }}>
          <Image
            src="/hori.png" // Path to the logo in the `public` folder
            alt="Urban Motion Logo"
            boxSize={{ base: "unset", md: "180px" }} // Adjust size as needed
            objectFit="contain"
            mt={{ base: "0px", md: "-50px" }}
          />
          </Link>
          <Text fontSize="xl" mt={{ base: 0, md: -6 }} fontWeight="light" color="#00db00" mb={6}>
            {text}
          </Text>
          <VStack align="start" spacing={4}>
            {datas.map((data, index) => (
              <Flex
                key={index}
                align="center"
                gap={3}
                p={3}
                w="100%"
                cursor="pointer"
                borderRadius="md"
                transition="all 0.3s ease"
                _hover={{
                  bg: "#00db00",
                  color: "white",
                  transform: "translateX(5px)",
                }}
                onClick={() => { onSidebarClick(data.path); toggleMenu(); }} // Update the active component
              >
                <Icon as={data.icon} w={6} h={6} />
                <Text fontWeight="medium" fontSize={{ base: "xl", md: "lg" }}>
                  {data.label}
                </Text>
              </Flex>
            ))}
          </VStack>
          <Spacer display={{ base: "none", md: "unset" }} />{" "}
          {/* This creates space to push the Profile and Logout buttons to the bottom */}
          {/* Profile Section */}
          {/* Logout Section */}
          <Flex
            align="center"
            mt={3}
            gap={3}
            p={3}
            w={{ base: "58%", md: "100%" }}
            cursor="pointer"
            borderRadius="md"
            transition="all 0.3s ease"
            _hover={{
              bg: "red.600", // Red background on hover for logout
              color: "white",
              transform: "translateX(5px)",
            }}
            onClick={handleLogout} // Handle logout logic
            justifyContent={{ md: "unset", base: "flex-start" }}
            alignItems={{ md: "unset", base: "center" }}
          >
            <Icon as={FaSignOutAlt} w={6} h={6} />
            <Text fontWeight="medium" fontSize="lg">
              Logout
            </Text>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
