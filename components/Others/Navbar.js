import {
  Flex,
  Box,
  Link,
  Image,
  IconButton,
  Text,
  VStack,
  Button,
  Spinner
} from "@chakra-ui/react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for responsive menu
  const [sessionId, setSessionId] = useState("temporary"); // Store sessionId in state
  const [userData, setUserData] = useState(null); // Store user data
  const [userType, setUserType] = useState(null); // Store user type
  const [showProfileMenu, setShowProfileMenu] = useState(false); // Show/hide profile menu
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSessionId = localStorage.getItem("sessionId");
      const storedUserType = localStorage.getItem("userType");
      if (storedSessionId && storedUserType) {
        setSessionId(storedSessionId);
        setUserType(storedUserType);

        // Fetch user data based on sessionId
        fetch(
          `https://urban-motion-backend.vercel.app/api/sessions/${storedSessionId}`
        )
          .then((response) => response.json())
          .then((data) => {
            setUserData(data); // Ensure a new reference
          })
          .catch((err) => console.error("Error fetching user data:", err));
      }
      else {
        setSessionId(null);
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionId");
    localStorage.removeItem("userType");
    setSessionId(null);
    router.push("/signin");
  };

  return (
    <Flex
      as="nav"
      position="fixed"
      top="0"
      left="0"
      w="100%"
      bg="rgba(0, 0, 0, 0.8)"
      backdropFilter="blur(15px)"
      zIndex="300"
      align="center"
      justify="space-between"
      p="1.5rem 2rem"
    >
      {/* Logo */}
      <Link href="/" _hover={{ textDecoration: "none" }}>
        <Image src="/hori.png" alt="Logo" h="40px" cursor="pointer" />
      </Link>

      {/* Desktop Links */}
      <Flex display={{ base: "none", md: "flex" }} gap="2.5rem" align="center">
        {["About", "Perks", "Gallery"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            fontWeight="bold"
            fontSize="15px"
            textTransform="uppercase"
            color="#00db00"
            _hover={{
              color: "white",
              transform: "scale(1.1)",
              transition: "0.15s",
            }}
          >
            {item}
          </Link>
        ))}

        {sessionId === "temporary" ? (
          <Flex justifyContent="center" alignItems="center" h="50px">
            <Spinner color="green.500" size="md" />
            <Text ml="2" color="white" fontSize="14px">
              Loading user details...
            </Text>
          </Flex>
        ) : sessionId === null ? (
          <Link
            href="/signin"
            display="inline-flex"
            alignItems="center"
            fontSize="15px"
            color="black"
            bg="#00db00"
            px="14px"
            py="6px"
            borderRadius="sm"
            _hover={{
              bg: "white",
              color: "black",
              transform: "scale(1.05)",
              transition: "0.2s ease-in-out",
            }}
          >
            <FaUserCircle style={{ marginRight: "8px" }} />
            Login
          </Link>
        ) : (
          <Flex align="center" position="relative">
            <Image
              cursor="pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              src="/Resources/DefaultMale.png"
              alt=""
              h="50px"
              w="50px"
            />
            {showProfileMenu && (
              <Box
                position="absolute"
                top="50px"
                right="0"
                bg="gray.900"
                p="1rem"
                borderRadius="md"
                zIndex="1000"
                boxShadow="0px 4px 6px rgba(0, 0, 0, 0.2)"
                display="flex"
                flexDirection="column"
                alignItems="center"
                w="300px"
              >
                {userType ? (
                  <Text
                    color="white"
                    fontSize="14px"
                    mb="1rem"
                    textAlign="center"
                    w="100%"
                    wordBreak="break-word"
                    textTransform="capitalize"
                  >
                    Welcome, {userType}
                  </Text>
                ) : (
                  <Text
                    color="white"
                    fontSize="14px"
                    mb="1rem"
                    textAlign="center"
                    w="100%"
                    wordBreak="break-word"
                  >
                    Welcome, User
                  </Text>
                )}
                {userData ? (
                  <Text
                    color="white"
                    fontSize="14px"
                    mb="1rem"
                    textAlign="center"
                    w="100%"
                    wordBreak="break-word"
                  >
                    Hi, {userData.data.name}
                  </Text>
                ) : (
                  <Text
                    color="white"
                    fontSize="14px"
                    mb="1rem"
                    textAlign="center"
                    w="100%"
                    wordBreak="break-word"
                  >
                    Hi, User
                  </Text>
                )}
                <Link
                  href="/dashboard"
                  fontSize="16px"
                  fontWeight="bold"
                  bg="green.500"
                  color="white"
                  w="90%"
                  textAlign="center"
                  borderRadius="md"
                  py="12px"
                  _hover={{
                    background: "linear-gradient(90deg, #00db00, #009900)",
                    color: "white",
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap="10px"
                  mb="1rem"
                  transition="all 0.3s"
                >
                  <Image
                    src="/Resources/Dashboard.png"
                    alt="Dashboard Icon"
                    h="24px"
                    bg="white"
                    borderRadius="3"
                    padding="4px"
                  />
                  Dashboard
                </Link>
                <Button
                  aria-label="Logout"
                  colorScheme="red"
                  fontSize="16px"
                  fontWeight="bold"
                  py="23px"
                  w="90%"
                  onClick={handleLogout}
                  _hover={{
                    background: "linear-gradient(90deg, red, maroon)",
                    color: "white",
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap="10px"
                  transition="all 0.3s"
                >
                  <Image
                    src="/Resources/Logout_Blue.png"
                    alt="Logout Icon"
                    h="24px"
                    bg="white"
                    borderRadius="3"
                    padding="4px"
                  />
                  Logout
                </Button>
              </Box>
            )}
          </Flex>
        )}

      </Flex>

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
      />

      {/* Mobile Menu */}
      {isOpen && (
        <VStack
          position="absolute"
          top="100%"
          left="0"
          w="100%"
          bg="rgba(0, 0, 0, 0.8)"
          backdropFilter="blur(15px)"
          p="1rem"
          spacing="1rem"
          align="center"
          display={{ base: "flex", md: "none" }}
        >
          {["About", "Perks", "Gallery"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              fontWeight="bold"
              fontSize="15px"
              textTransform="uppercase"
              color="white"
              _hover={{
                color: "green.300",
                transform: "scale(1.1)",
                transition: "0.15s",
              }}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
          {sessionId === "temporary" ? (
            <VStack justifyContent="center" alignItems="center" h="50px" w="100%">
              <Spinner color="green.500" size="md" />
              <Text color="gray.700" fontSize="16px" mt="2">
                Loading user details...
              </Text>
            </VStack>
          ) : sessionId === null ? (
            <Link
              href="/signin"
              display="inline-flex"
              alignItems="center"
              fontSize="15px"
              color="black"
              bg="#00db00"
              px="14px"
              py="6px"
              borderRadius="sm"
              _hover={{
                bg: "white",
                color: "black",
                transform: "scale(1.05)",
                transition: "0.2s ease-in-out",
              }}
            >
              <FaUserCircle style={{ marginRight: "8px" }} />
              Login
            </Link>
          ) : userData && userType ? (
            <>
              <Text
                color="white"
                fontSize="22px"
                mb="0.2rem"
                textAlign="center"
                w="100%"
                wordBreak="break-word"
                textTransform="capitalize"
              >
                Welcome, {userType}
              </Text>
              <Text
                color="white"
                fontSize="22px"
                mb="0.2rem"
                textAlign="center"
                w="100%"
                wordBreak="break-word"
              >
                Hi, {userData.data.name}
              </Text>
              <Link
                href="/dashboard"
                fontSize="16px"
                fontWeight="bold"
                bg="green.500"
                color="white"
                w="50%"
                textAlign="center"
                borderRadius="md"
                py="12px"
                _hover={{
                  background: "linear-gradient(90deg, #00db00, #009900)",
                  color: "white",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="10px"
                mb="0.2rem"
                transition="all 0.3s"
              >
                <Image
                  src="/Resources/Dashboard.png"
                  alt="Dashboard Icon"
                  h="24px"
                  bg="white"
                  borderRadius="3"
                  padding="4px"
                />
                Dashboard
              </Link>
              <Button
                aria-label="Logout"
                colorScheme="red"
                fontSize="16px"
                fontWeight="bold"
                py="23px"
                w="50%"
                onClick={handleLogout}
                _hover={{
                  background: "linear-gradient(90deg, red, maroon)",
                  color: "white",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="10px"
                transition="all 0.3s"
              >
                <Image
                  src="/Resources/Logout_Blue.png"
                  alt="Logout Icon"
                  h="24px"
                  bg="white"
                  borderRadius="3"
                  padding="4px"
                />
                Logout
              </Button>
            </>
          ):(<></>)
        }
        </VStack>
      )}
    </Flex>
  );
};

export default Navbar;
