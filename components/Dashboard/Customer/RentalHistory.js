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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const RentalHistory = () => {
  const [customerData, setCustomerData] = useState(null);
  const [rentalHistory, setRentalHistory] = useState([]);

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`)
        .then((res) => res.json())
        .then((data) => setCustomerData(data.data))
        .catch((err) => console.error("Failed to fetch customer data:", err));
    }
    const fetchRentalHistory = async () => {
      if (customerData) {
        try {
          const response = await axios.get(`https://urban-motion-backend-liart.vercel.app/api/booking/customer?customerId=${customerData._id}`);
          setRentalHistory(response.data);
        } catch (error) {
          console.error("Error fetching rental history:", error);
        }
      }
    };

    fetchRentalHistory();
  }, [customerData]);

  return (
    <Box
      p={6}
      bgGradient="linear(to-b, black.500, black.400)"
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
              Car
            </Th>
            <Th color="white" fontWeight="bold">
              Start Date
            </Th>
            <Th color="white" fontWeight="bold">
              End Date
            </Th>
            <Th color="white" fontWeight="bold">
              Days
            </Th>
            <Th color="white" fontWeight="bold">
              Price
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {rentalHistory.length > 0 ? (
            rentalHistory.map((rental) => {
              // Calculate days
              const startDate = dayjs(rental.startDate);
              const endDate = dayjs(rental.endDate);
              const days = endDate.diff(startDate, "day");

              return (
                <Tr
                  key={rental.id}
                  transition="all 0.3s ease-in-out"
                  _hover={{
                    bg: "rgba(0, 219, 0, 0.1)",
                    transform: "translateY(-2px)",
                    boxShadow: "sm",
                  }}
                >
                  <Td fontWeight="medium" color="gray.700">
                    {rental.car}
                  </Td>
                  <Td fontWeight="medium" color="gray.600">
                    {rental.startDate}
                  </Td>
                  <Td fontWeight="medium" color="gray.600">
                    {rental.endDate}
                  </Td>
                  <Td fontWeight="medium" color="#00db00">
                    {days} days
                  </Td>
                  <Td fontWeight="bold" color="#00db00">
                    ${rental.price}
                  </Td>
                </Tr>
              );
            })
          ) : (
            <Tr>
              <Td colSpan={5}>
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
    </Box>
  );
};

export default RentalHistory;
