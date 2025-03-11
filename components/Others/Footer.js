import {
  Box,
  Flex,
  Text,
  Link,
  VStack,
  HStack,
  Icon,
  Input,
  Button,
  Image,
  useToast
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";
import emailjs from "emailjs-com"; // Import EmailJS
import React, { useState } from "react";


const Footer = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const toast = useToast();
  const socialLinks = [
    { icon: FaTwitter, link: "https://x.com/TheUrbanMotion" },
    { icon: FaLinkedin, link: "https://www.linkedin.com/in/urbanmotion-urban-motion-89832433b/" },
    { icon: FaYoutube, link: "https://www.youtube.com/watch?v=kUvV3JfFAqY" },
    { icon: FaGithub, link: "https://github.com/subhro1530/urbanmotion" },
  ];

  const navbarLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Perks", href: "/perks" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (email) {
      emailjs
        .send(
          "urbanmotion", // Service ID
          "urbanmotion_template", // Template ID from EmailJS
          {
            user_email: email,
            user_name: username,
            message: "Thank you for subscribing to UrbanMotion.",
          }, // Data being sent (email)
          "7wARxgqnQG0HcsgzD" // Public key from EmailJS
        )
        .then(
          (response) => {
            toast({
              title: "Subscription Successful.",
              description:
                "You have successfully subscribed to our newsletter.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setEmail(""); // Reset the email field after submission
          },
          (error) => {
            toast({
              title: "Subscription Failed.",
              description:
                "There was an issue with your subscription. Please try again.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        );
    } else {
      toast({
        title: "Invalid Email.",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };


  return (
    <Box
      as="footer"
      bg="gray.900"
      color="white"
      py={10}
      px={{ base: 4, md: 12 }}
      bgImage="url('https://static.vecteezy.com/system/resources/thumbnails/033/164/427/small_2x/3d-abstract-digital-technology-green-light-particles-wave-free-png.png')"
      bgSize="cover"
      bgPosition="center"
    >
      {/* Logo Section */}
      <Flex justify="center" mb={8}>
        <Image src="/hori.png" alt="UrbanMotion Logo" w="150px" />
      </Flex>

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="start"
        maxW="1200px"
        mx="auto"
        mb={10}
      >
        {/* Navigation Links */}
        <VStack align="flex-start" spacing={4} mb={{ base: 6, md: 0 }}>
          <Text fontSize="lg" fontWeight="bold">
            Quick Links
          </Text>
          {navbarLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              color="gray.300"
              _hover={{ color: "#00db00" }}
              fontSize="sm"
            >
              {link.label}
            </Link>
          ))}
        </VStack>

        {/* Newsletter Subscription */}
        <VStack align="flex-start" spacing={4} w={{ base: "100%", md: "40%" }}>
          <Text fontSize="lg" fontWeight="bold">
            Subscribe to Our Newsletter
          </Text>
          <Text color="gray.400" fontSize="sm">
            Stay updated with the latest news, events, and offers. Subscribe to
            our newsletter now!
          </Text>
          <HStack w="100%">
            <form onSubmit={handleSubscribe}>
              <Flex direction="column" alignItems="center">
                <Flex w={{ base: "100%", md: "auto" }} mb={4} direction="column" alignItems="center">
                  <Input
                    placeholder="Enter your username"
                    bg="gray.700"
                    size="lg"
                    color="white"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    _placeholder={{ color: "gray.400" }}
                    m={2}

                  />
                  <Input
                    placeholder="Enter your email"
                    bg="gray.700"
                    size="lg"
                    color="white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    _placeholder={{ color: "gray.400" }}
                    m={2}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    bg="#00db00"
                    color="black"
                    _hover={{
                      bg: "#00b300",
                      color: "white",
                      boxShadow: "0 0 8px #00db00, 0 0 15px #00db00", // Glowing effect
                      border: "2px solid #00db00",
                    }}
                    m={2}
                  >
                    Subscribe
                  </Button>
                </Flex>
              </Flex>
            </form>
          </HStack>
        </VStack>

        {/* Social Media Links */}
        <VStack align="flex-start" spacing={4}>
          <Text fontSize="lg" fontWeight="bold">
            Follow Us
          </Text>
          <HStack spacing={4}>
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.link}
                isExternal
                aria-label={social.link}
                _hover={{ color: "#00db00" }}
              >
                <Icon as={social.icon} boxSize={6} />
              </Link>
            ))}
          </HStack>
        </VStack>
      </Flex>

      {/* Divider */}
      <Box
        borderTop="1px solid"
        borderColor="gray.700"
        mt={8}
        mb={4}
        w="100%"
      />

      {/* Footer Bottom */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
      >
        <Text fontSize="sm" color="gray.500">
          © 2024 UrbanMotion. All rights reserved.
        </Text>
        <HStack spacing={4}>
          <Link
            href="/terms"
            fontSize="sm"
            color="gray.300"
            _hover={{ color: "white" }}
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            fontSize="sm"
            color="gray.300"
            _hover={{ color: "white" }}
          >
            Privacy
          </Link>
          <Link
            href="#faq"
            fontSize="sm"
            color="gray.300"
            _hover={{ color: "white" }}
          >
            FAQ
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Footer;
