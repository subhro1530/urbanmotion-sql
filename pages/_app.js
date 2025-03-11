import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { Global } from "@emotion/react";
import theme from "@/theme";
import "../styles/globals.css"; // Ensure this is properly imported

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>UrbanMotion | Rent Your Dream Car</title>
        <meta name="description" content="UrbanMotion - Your Car Solution" />
        <link rel="icon" href="/short.png" />
      </Head>
      <Global
        styles={{
          "html, body": {
            overflowX: "hidden", // Prevent horizontal scrolling globally
          },
        }}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
