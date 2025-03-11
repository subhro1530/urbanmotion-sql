import Navbar from "../components/Others/Navbar";
import Sidebar from "../components/HeroSection/Sidebar";
import HeroSection from "../components/HeroSection/HeroSection";
import TestimonialSection from "@/components/HeroSection/TestimonialSection";
import BookCar from "@/components/HeroSection/BookCar";
import DiscountBanner from "@/components/HeroSection/DiscountBanner";
import FeatureHighlights from "@/components/HeroSection/FeatureHighlights";
import FAQSection from "@/components/HeroSection/FAQSection";
import Footer from "@/components/Others/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <HeroSection />
      <TestimonialSection />
      <DiscountBanner />
      <FeatureHighlights />
      <BookCar />
      <FAQSection />
      <Footer />
    </>
  );
};

export default Home;
