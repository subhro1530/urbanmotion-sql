import {
  Box,
  Heading,
  Image,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
  Text,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const RentalHistory = () => {
  const [rentalHistory, setRentalHistory] = useState([]);

  useEffect(() => {
    const customerId = localStorage.getItem("sessionId");
    if (customerId) {
      axios
        .get(
          "https://car-rental-backend-postgres.vercel.app/api/booking/bookings"
        )
        .then((response) => {
          const filteredBookings = response.data.filter(
            (booking) => booking.customerId === customerId
          );
          setRentalHistory(filteredBookings);
        })
        .catch((error) =>
          console.error("Error fetching rental history:", error)
        );
    }
  }, []);

  const printPDF = () => {
    const doc = new jsPDF();
    let yPos = 10;

    // Title
    doc.setFontSize(16);
    doc.text("Rental History", 10, yPos);
    yPos += 10;

    // Table header
    doc.setFontSize(12);
    doc.text("Booking ID", 10, yPos);
    doc.text("Car ID", 70, yPos);
    doc.text("Duration", 110, yPos);
    doc.text("Final Price", 150, yPos);
    yPos += 7;

    // Draw a line for header separation
    doc.line(10, yPos, 200, yPos);
    yPos += 5;

    // Table content
    rentalHistory.forEach((booking) => {
      doc.text(`${booking.id}`, 10, yPos);
      doc.text(`${booking.carId}`, 70, yPos);
      doc.text(`${booking.duration}`, 110, yPos);
      doc.text(`$${booking.finalPrice}`, 150, yPos);
      yPos += 7;
      // If yPos is too low, add a new page
      if (yPos > 280) {
        doc.addPage();
        yPos = 10;
      }
    });

    doc.save("rental-history.pdf");
  };

  return (
    <Box
      p={6}
      bg="gray.100"
      borderRadius="lg"
      boxShadow="lg"
      transition="all 0.4s ease-in-out"
      _hover={{ boxShadow: "2xl", transform: "scale(1.02)" }}
    >
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={6}
        transition="all 0.3s ease-in-out"
        _hover={{ transform: "scale(1.1)" }}
      >
        <Image
          src="/Resources/vehilcesList.png"
          alt="Rental Icon"
          h="60px"
          borderRadius="full"
          boxShadow="md"
        />
        <Heading
          as="h1"
          size="lg"
          color="#00db00"
          ml={3}
          mt={2}
          textShadow="1px 1px 3px rgba(0, 0, 0, 0.2)"
        >
          Rental History
        </Heading>
      </Box>

      {/* Table Section */}
      <Table variant="striped" colorScheme="green" borderRadius="md">
        <Thead bg="#00db00" color="white">
          <Tr>
            <Th color="white" fontWeight="bold">
              Booking ID
            </Th>
            <Th color="white" fontWeight="bold">
              Car ID
            </Th>
            <Th color="white" fontWeight="bold">
              Duration
            </Th>
            <Th color="white" fontWeight="bold">
              Final Price
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {rentalHistory.length > 0 ? (
            rentalHistory.map((booking) => (
              <Tr
                key={booking.id}
                transition="all 0.3s ease-in-out"
                _hover={{
                  bg: "rgba(0, 219, 0, 0.1)",
                  transform: "translateY(-2px)",
                  boxShadow: "sm",
                }}
              >
                <Td fontWeight="medium" color="gray.700">
                  {booking.id}
                </Td>
                <Td fontWeight="medium" color="gray.600">
                  {booking.carId}
                </Td>
                <Td fontWeight="medium" color="gray.600">
                  {booking.duration}
                </Td>
                <Td fontWeight="bold" color="#00db00">
                  ${booking.finalPrice}
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4}>
                <Text
                  textAlign="center"
                  color="gray.500"
                  fontStyle="italic"
                  mt={4}
                >
                  No rental history available.
                </Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {/* Print PDF Button */}
      <Box display="flex" justifyContent="center" mt={6}>
        <Button
          colorScheme="green"
          onClick={printPDF}
          _hover={{ bg: "green.500", transform: "scale(1.02)" }}
        >
          Print Rental History as PDF
        </Button>
      </Box>
    </Box>
  );
};

export default RentalHistory;
