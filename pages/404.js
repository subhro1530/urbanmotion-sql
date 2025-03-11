// pages/404.js
import { Box, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Custom404 = () => {
    const router = useRouter();

    return (
        <Box
            display="flex"
            justifyContent="end"
            alignItems="center"
            height={{base:"80vh",md:"100vh"}}
            flexDirection="column"
            textAlign="center"
            bgImage={{base:"/mob_error_404.gif",md:"/error_404.gif"}}
            bgSize="contain"
            bgRepeat="no-repeat"
            bgPosition="center"
            color="#00b300"
            overflowY="hidden"
            padding="5"
            zIndex={1}
        >
            <Box bgColor="white" zIndex={2}>
                <Text fontSize="4xl" fontWeight="bold" mb={4}>
                    404 - Page Not Found
                </Text>
                <Text mb={4}>Sorry, the page you are looking for does not exist.</Text>
                <Button
                    onClick={() => router.push('/')}
                    bg="#00db00"
                    color="white"
                    _hover={{ bg: "#00b300" }}
                >
                    Go Back to Home
                </Button>
            </Box>
        </Box>
    );
};

export default Custom404;
