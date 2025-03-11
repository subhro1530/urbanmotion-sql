import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Others/Navbar";
import Footer from "@/components/Others/Footer";
import CompellingNarrative from "@/components/About/CompellingNarrative";
import MissionStatement from "@/components/About/MissionStatement";
const CoreValues = dynamic(() => import("@/components/About/CoreValues"), {
  ssr: false,
});
import MeetOurTeam from "@/components/About/MeetOurTeam";
import SocialProof from "@/components/About/SocialProof";
import CallToAction from "@/components/About/ContactUs";

const AboutPage = () => {
  return (
    <Box bg="black" color="white" minH="100vh" overflowX="hidden" position={{base:"relative",md:"unset"}} top="50px">
      <Navbar />
      <CompellingNarrative />
      <MissionStatement />
      <CoreValues />
      <MeetOurTeam />
      <SocialProof />
      <CallToAction />
      <Footer />
    </Box>
  );
};

export default AboutPage;
