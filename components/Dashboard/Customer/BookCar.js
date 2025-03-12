import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Input,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CldImage } from 'next-cloudinary';
import axios from "axios";

const SimpleBookCar = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [days, setDays] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const toast = useToast();

  useEffect(() => {
    fetchCars();
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      fetchCustomerEmail(sessionId);
    }
  }, []);

  const fetchCars = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("https://car-rental-backend-postgres.vercel.app/api/cars/get-available-cars");
      const availableCars = res.data.filter(car => !car.booked);
      setCars(availableCars);
    } catch (error) {
      console.error("Error fetching cars", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomerEmail = async (sessionId) => {
    try {
      const res = await axios.get("https://car-rental-backend-postgres.vercel.app/api/customers/get-all-customers");
      const customers = res.data;
      const customer = customers.find(cust => cust.id === sessionId);
      if (customer) {
        setCustomerEmail(customer.email);
      } else {
        console.error("Customer not found for sessionId");
      }
    } catch (error) {
      console.error("Error fetching customer email", error);
    }
  };

  const openBookingModal = (car) => {
    setSelectedCar(car);
    setDays("");
    setIsModalOpen(true);
  };

  const handleBooking = async () => {
    if (!days || isNaN(days) || parseInt(days, 10) <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number of days",
        status: "error",
        isClosable: true,
        position: "top"
      });
      return;
    }
    if (!customerEmail) {
      toast({
        title: "Customer Not Found",
        description: "Unable to retrieve customer email.",
        status: "error",
        isClosable: true,
        position: "top"
      });
      return;
    }
    const pricePerWeek = parseInt(selectedCar.pricing, 10);
    const finalPrice = pricePerWeek * parseInt(days / 7, 10);
    try {
      const bookingData = {
        registrationNumber: selectedCar.registrationNumber,
        email: customerEmail,
        finalPrice: finalPrice.toString(),
        duration: `${days} days`
      };
      const res = await axios.post(
        "https://car-rental-backend-postgres.vercel.app/api/booking/book-car",
        bookingData
      );
      if (res.status === 200 || res.status === 201) {
        toast({
          title: "Booking Confirmed",
          description: `You have booked ${selectedCar.model} for ${days} days.`,
          status: "success",
          isClosable: true,
          position: "top"
        });
        fetchCars();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error booking car", error);
      toast({
        title: "Booking Failed",
        description: "Unable to complete booking. Please try again.",
        status: "error",
        isClosable: true,
        position: "top"
      });
    }
  };

  return (
    <Box p={4} bg="gray.800" borderRadius="lg">
      <Heading color="#00db00" mb={4}>
        Book a Car
      </Heading>
      {isLoading ? (
        <Spinner size="xl" color="#00db00" />
      ) : (
        <VStack spacing={4} align="stretch">
          {cars.map(car => (
            <HStack key={car.id} p={4} bg="gray.700" borderRadius="md" justify="space-between">
              <HStack>
                {car.image ? (
                  <CldImage
                    src={car.image}
                    alt="Car Image"
                    width="250"
                    height="150"
                    style={{
                      width: "250px",
                      height: "150px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <Image
                    src="/dummy_car.png"
                    alt={car.model}
                    boxSize={{ base: "150px", md: "200px" }}
                    objectFit="contain"
                    borderRadius="md"
                    _hover={{
                      transform: "scale(1.01) scaleX(-1)",
                      transition: "0.03s ease-in transform",
                    }}
                    cursor="pointer"
                    mx="auto"
                  />
                )}
                <Box>
                  <Text color="#00db00" fontWeight="bold">
                    {car.model}
                  </Text>
                  <Text color="gray.300">{car.type}</Text>
                  <Text color="gray.300">Price: ₹{car.pricing} per week</Text>
                </Box>
              </HStack>
              <Button colorScheme="green" bg="#00db00" onClick={() => openBookingModal(car)}>
                Book Now
              </Button>
            </HStack>
          ))}
        </VStack>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent bg="gray.800">
          <ModalHeader color="#00db00">
            Book {selectedCar?.model}
          </ModalHeader>
          <ModalCloseButton color="#00db00" />
          <ModalBody>
            <Input
              placeholder="Enter number of days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              type="number"
              bg="white"
              color="black"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" bg="#00db00" mr={3} onClick={handleBooking}>
              Confirm Booking
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SimpleBookCar;
