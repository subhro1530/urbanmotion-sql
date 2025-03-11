import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion"; // For popup animation
import { keyframes } from "@emotion/react";
import { useRouter } from "next/router";


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Lamborghini model with motion
const LamborghiniModel = () => {
  const { scene } = useGLTF("/lamborghini.glb");
  const modelRef = useRef();
  const [spinSpeed, setSpinSpeed] = useState(0.002); // Initial fast spin speed

  useEffect(() => {
    // Fast spin for 0.5 seconds after the model fully loads
    const fastSpin1 = setTimeout(() => setSpinSpeed(0.02), 0); // Immediately fast spin
    const slowSpin1 = setTimeout(() => setSpinSpeed(0.002), 500); // Slow spin after 0.5 sec

    // Speed up again for 0.5 seconds after 1 second
    const fastSpin2 = setTimeout(() => setSpinSpeed(0.02), 1000); // Fast spin after 1 sec
    const slowSpin2 = setTimeout(() => setSpinSpeed(0.002), 1500); // Slow spin after 1.5 sec

    return () => {
      clearTimeout(fastSpin1);
      clearTimeout(slowSpin1);
      clearTimeout(fastSpin2);
      clearTimeout(slowSpin2);
    };
  }, []);


  // Adding motion to the model (rotation)
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += spinSpeed; // Adjust rotation speed
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={2}
      position={[0, -1.5, 0]}
    />
  );
};

const HeroSection = () => {
  // Popup animation on component mount
  const router = useRouter();
  const [sessionId, setSessionId] = useState(null); // Initial fast spin speed

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      setSessionId(sessionId);
    }
  }, [])

  const handleBookNow = () => {
    if (sessionId) {
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  }


  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ width: "100%", height: "100vh", overflow: "hidden", overflowX: "hidden" }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        height={{ base: "100%", md: "100%" }}
        bg="black"
        color="white"
        align="center"
        justify="space-between"
        px={{ base: "1rem", md: "80px" }} // Responsive padding
        bgImage={{ base: "url('/mobile_bg.jpg')", md: "none" }} // Mobile: Background Image
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPosition="center"
      >
        <Box
          position="absolute"
          top={{ base: "80px", md: "0" }}
          left="0"
          width="100%"
          height={{ base: "90vh", md: "100vh" }}
          bg={{ base: "rgba(0, 0, 0, 0.5)", md: "rgba(0, 100, 0, 0.1)" }}
          zIndex={{ base: "1", md: "1" }}
          animation={`${fadeIn} 2s ease-in-out`} // Add animation for smooth appearance
        />

        {/* Left Content */}
        <Box
          flex="1"
          textAlign={{ base: "center", md: "left" }}
          px="1rem"
          width={{ base: "100%", md: "30%" }}
          position={{ base: "absolute", md: "none" }}
          top={{ base: "150px", md: "100px" }}
          mt={{ md: "70px" }}
          zIndex={2}
        >
          <Heading
            fontSize={{ base: "6xl", md: "7xl" }}
            textTransform="uppercase"
            textShadow={{ base: "0px 0px 50px white", md: "unset" }}
            mb={{ base: "15", md: "4" }}
            cursor="crosshair"
          >
            <Text as="span" color="white">
              Easiest Car{" "}
            </Text>
            <Text as="span" color="#00db00">
              Rentals
            </Text>
          </Heading>
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            textTransform="uppercase"
            color={{ base: "lightgreen", md: "#00db00" }}
            textShadow="0px 0px 20px black"
            mb="4"
          >
            Find the Best Car For Rent Today
          </Text>
          <Text
            fontSize={{ base: "sm", md: "lg" }}
            mb="4"
            maxW="400px"
            lineHeight="1.8"
          >
            Experience unmatched convenience and luxury with our premium car
            rental services. Book now and hit the road in style.
          </Text>
          <Button
            bgGradient="linear(to-r, #00db00, green.600)"
            color="white"
            _hover={{
              bgGradient: "linear(to-r, #00db00, green.500)",
              transform: "scale(1.1)",
              transition: "0.3s",
            }}
            size="lg"
            textTransform="uppercase"
            cursor="pointer"
            zIndex="2"
            onClick={ handleBookNow }
          >
            Book Now
          </Button>
        </Box>

        {/* Mobile: Background Image   */}
        {/* Right Content (3D Model for Desktop) */}
        {/* Desktop: Show 3D Model */}
        <Box
          flex="2"
          position="relative"
          textAlign="center"
          height="100%"
          width="70%"
          display={{ base: "none", md: "block" }}
          left="260"
          bottom="20"
        >
          <Canvas
            style={{
              width: "100%",
              height: "100%",
              zIndex: 1,
              marginTop: "80px",
            }}
            camera={{ position: [4, 2, 8], fov: 50 }}
            gl={{ antialias: true, preserveDrawingBuffer: false }}
            pointerEvents="none" // Prevent blocking interactions
          >
            <OrbitControls enablePan={false} enableZoom={false} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <LamborghiniModel />
          </Canvas>
        </Box>
      </Flex>
    </motion.div>
  );
};

export default HeroSection;
