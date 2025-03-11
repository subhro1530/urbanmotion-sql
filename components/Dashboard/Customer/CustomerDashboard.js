import { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../CommonDashboardComponents/SideBar";
import MainContent from "./MainContent";
import BookCar from "./BookCar";
import Bookings from "./Bookings";
import Notifications from "./Notifications";
import Payments from "./Payments";
import RentalHistory from "./RentalHistory";

// Import icons from react-icons
import {
  FaCar,
  FaCalendarAlt,
  FaBell,
  FaMoneyBillWave,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";

const CustomerDashboard = () => {
  const [customerData, setCustomerData] = useState(null);
  const [activeComponent, setActiveComponent] = useState("profile"); // Default active component

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`)
        .then((res) => res.json())
        .then((data) => setCustomerData(data.data))
        .catch((err) => console.error("Failed to fetch customer data:", err));
    }
  }, []);

  const sidebarData = [
    { icon: FaUser, label: "Profile", path: "profile" },
    { icon: FaCar, label: "Book a Car", path: "book-car" },
    { icon: FaCalendarAlt, label: "My Bookings", path: "bookings" },
    { icon: FaBell, label: "Notifications", path: "notifications" },
    { icon: FaMoneyBillWave, label: "Payments", path: "payments" },
    { icon: FaFileAlt, label: "Rental History", path: "rental-history" },
  ];

  // Handle clicking sidebar buttons to change active component
  const handleSidebarClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "profile":
        return <MainContent customerData={customerData} />; // Render MainContent for Profile
      case "book-car":
        return <BookCar />;
      case "bookings":
        return <Bookings />;
      case "notifications":
        return <Notifications />;
      case "payments":
        return <Payments />;
      case "rental-history":
        return <RentalHistory />;
      default:
        return <MainContent customerData={customerData} />;
    }
  };

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      <Sidebar
        text="Customer Dashboard"
        datas={sidebarData}
        onSidebarClick={handleSidebarClick} // Pass the click handler
      />
      <Box
        flex="1"
        p={4}
        color="white"
        borderRadius={{base:0,md:"20px"}}
        bg="gray.900" // Ensure the content area has a solid background
        zIndex={10} // Ensure the content area is above the sidebar
        position="relative" // Keep content positioned above the sidebar
        minH="100vh"
      >
        {renderContent()} {/* Render the active component */}
      </Box>
    </Flex>
  );
};

export default CustomerDashboard;
