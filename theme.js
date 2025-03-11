// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`, // Applies to all headings
    body: `'Poppins', sans-serif`, // Applies to body text
  },
  styles: {
    global: {
      /* Scrollbar Styles */
      "::-webkit-scrollbar": {
        width: "8px",
        height: "8px",
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "#1a202c", // Dark background
        borderRadius: "8px",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "#00db00", // Green thumb
        borderRadius: "8px",
        border: "2px solid #1a202c", // Optional border for contrast
      },
      "::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#009900", // Darker green on hover
      },
      /* Apply to body */
      body: {
        overflowX: "hidden", // Optional: Prevent horizontal scrolling
      },
    },
  },
});

export default theme;
