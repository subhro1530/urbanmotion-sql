import { Flex, Icon, Link } from "@chakra-ui/react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <Flex
      direction="column"
      position="fixed"
      left="0"
      top="0"
      h="100vh"
      w="40px"
      bg="linear-gradient(180deg, #0f0, #004d00)"
      justify="center"
      align="center"
      display={{ base: "none", md: "flex" }} // Hides on mobile
      zIndex="200"
    >
      {[
        { icon: FaTwitter, link: "https://x.com/TheUrbanMotion" },
        { icon: FaLinkedin, link: "https://www.linkedin.com/in/urbanmotion-urban-motion-89832433b/" },
        { icon: FaYoutube, link: "https://www.youtube.com/watch?v=kUvV3JfFAqY" },
        { icon: FaGithub, link: "https://github.com/subhro1530/URBANMOTION" },
      ].map((item, index) => (
        <Link
          key={index}
          href={item.link}
          isExternal
          w="100%" // Makes the link span the full width of the sidebar
          h="50px"
          bg="black"
          display="flex"
          justifyContent="center"
          alignItems="center"
          _hover={{
            bg: "#004d00",
            transform: "scale(1.1)",
            transition: "0.3s",
          }}
          zIndex="2"
          about="_blank"
        >
          <Icon as={item.icon} boxSize="5" color="white" />
        </Link>
      ))}
    </Flex>
  );
};

export default Sidebar;
