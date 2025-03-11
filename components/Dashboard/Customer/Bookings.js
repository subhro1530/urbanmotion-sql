import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Spinner,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  useToast,
  Image,
  HStack,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  Icon,
  Input
} from "@chakra-ui/react";
import {
  FaRupeeSign
} from "react-icons/fa";
import { CldImage } from 'next-cloudinary';
import axios from "axios";
import { useRouter } from "next/router";

const Bookings = () => {
  const [customerData, setCustomerData] = useState(null);
  const [carBooked, setCarBooked] = useState(null);
  const [carId, setCarId] = useState("");
  const [returnDate, setReturnDate] = useState(null);
  const [remainingDays, setRemainingDays] = useState("");
  const [numberPaymentsDone, setNumberPaymentsDone] = useState("");
  const [paymentPlan, setPaymentPlan] = useState("");
  const [finalPaymentPrice, setFinalPaymentPrice] = useState("");
  const [installmentsAmount, setInstallmentsAmount] = useState("");
  const [newDuration, setNewDuration] = useState(0);
  const [actualDays, setActualDays] = useState(0);
  const [rating, setRating] = useState(0);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRouterLoading, setIsRouterLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const selectedOptionRef = useRef('');

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");

    const fetchCustomerData = async () => {
      if (sessionId) {
        try {
          const response = await fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`);
          const data = await response.json();
          return data.data; // Return the customer data
        } catch (error) {
          toast({
            title: "Error Fetching Data",
            description: "Unable to fetch customer data.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          console.error("Failed to fetch customer data:", error);
          return null;
        }
      }
      return null;
    };

    const fetchData = async () => {
      setIsLoading(true);
      const customerData = await fetchCustomerData();
      if (customerData && customerData.carCurrentlyBookedId) {
        setCustomerData(customerData); // Update state
        setCarId(customerData.carCurrentlyBookedId);
        fetchCarDetails(customerData.carCurrentlyBookedId); // Fetch car details
      } else {
        setIsLoading(false); // Stop isLoading if no car is booked
      }
    };

    fetchData();
    fetchCustomerData();
  }, [toast]);

  const fetchCarDetails = async (carId) => {
    try {
      const response = await axios.get(
        `https://urban-motion-backend.vercel.app/api/cars/car?registrationNumber=${carId}`
      );
      if (response && response.data) {
        setCarBooked(response.data.data);
      } else {
        console.error('Response data is undefined.');
      }
    } catch (error) {
      toast({
        title: "Error Fetching Data",
        description: "Unable to fetch car details.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error fetching cars:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomerData2 = async (sessionId) => {
    if (sessionId) {
      try {
        const response = await fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`);
        const data = await response.json();
        return data.data; // Return the customer data
      } catch (error) {
        toast({
          title: "Error Fetching Data",
          description: "Unable to fetch customer data.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error("Failed to fetch customer data:", error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    if (carBooked) {
      calculateReturnDate(); // Calculate return date when carBooked is updated
      calculateRemainingDays();
      calculateNumberofInstallments();
      calculateFinalPaymentPrice();
      setNewDuration(carBooked.durationGivenFor);
    }
  }, [carBooked]);

  useEffect(() => {
    if (remainingDays !== null && numberPaymentsDone !== null && carBooked && customerData) {
      calculateFinalPaymentPrice();
    }
  }, [remainingDays, numberPaymentsDone, carBooked, customerData]); // Re-run when dependencies change



  const handlePaymentPlanChange = (e) => {
    const selectValue = e.target.value;
    // Debugging log
    selectedOptionRef.current = selectValue;
    setPaymentPlan(selectValue);
    // Debugging log
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setNewDuration(`${value} days`);
    // Dynamically update option disabled statuses based on the input value
    const weeklyOption = document.getElementById("weekly");
    const monthlyOption = document.getElementById("monthly");
    const quarterlyOption = document.getElementById("quarterly");

    // Enable or disable options based on the input value
    if (carBooked) {
      const duration = parseInt(carBooked.durationGivenFor); // Extract number from string
      if (duration < 90) {
        if (duration < 30) {
          monthlyOption.disabled = true;
          quarterlyOption.disabled = true;
        }
        else {
          quarterlyOption.disabled = true;
        }
      }
      const newValue = duration + value;
      weeklyOption.disabled = newValue <= 0;
      monthlyOption.disabled = newValue <= 30;
      quarterlyOption.disabled = newValue <= 90;
    }
  };


  const calculateReturnDate = () => {
    if (!carBooked) return;

    const duration = parseInt(carBooked.durationGivenFor); // Extract number from string
    const handedOnDate = new Date(carBooked.handedOn);

    // Add the extracted duration to the handedOnDate
    handedOnDate.setDate(handedOnDate.getDate() + duration);

    // Set the calculated date in the state
    setReturnDate(handedOnDate.toLocaleString());
  };

  const calculateRemainingDays = () => {
    if (!carBooked) return;

    const duration = parseInt(carBooked.durationGivenFor); // Extract number from string
    const handedOnDate = new Date(carBooked.handedOn);

    // Calculate the return date
    handedOnDate.setDate(handedOnDate.getDate() + duration);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in time between the return date and the current date
    const timeDifference = handedOnDate - currentDate;

    // Calculate the remaining days (convert time difference from milliseconds to days)
    const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Set the calculated remaining days in the state
    setRemainingDays(remainingDays);
  };


  const calculateNumberofInstallments = (days) => {
    if (!carBooked) return;
    if (!customerData) return;
    let usedDays;

    if (days == undefined) {
      const duration = parseInt(carBooked.durationGivenFor); // Extract number from string
      // Now calculate the number of installments
      usedDays = duration - remainingDays;
    }
    else {
      usedDays = days;
    }
    const planPricing = customerData.plan === "weekly" ? 7 : customerData.plan === "monthly" ? 30 : 90;
    const numberOfInstallments = Math.floor(usedDays / planPricing);
    setNumberPaymentsDone(numberOfInstallments);
  };
  const calculateFinalPaymentPrice = () => {
    if (!carBooked || !customerData) return;

    const bookedDays = parseInt(carBooked.durationGivenFor);
    const cost =
      customerData.plan === "weekly"
        ? carBooked.carPricing.weekly / 7
        : customerData.plan === "monthly"
          ? carBooked.carPricing.monthly / 30
          : carBooked.carPricing.quarterly / 90;

    if (remainingDays === bookedDays) {
      // No actual usage
      setActualDays(1);
      setFinalPaymentPrice(cost);
      setInstallmentsAmount(0);
    } else {
      const actualDays = bookedDays - remainingDays;
      const finalPrice = actualDays * cost;

      const wholeCost =
        customerData.plan === "weekly"
          ? carBooked.carPricing.weekly
          : customerData.plan === "monthly"
            ? carBooked.carPricing.monthly
            : carBooked.carPricing.quarterly;

      calculateNumberofInstallments(actualDays);
      const installmentAmt = parseInt(numberPaymentsDone) * wholeCost;
      // Update states only after all calculations are complete
      setActualDays(actualDays);
      setFinalPaymentPrice(finalPrice);
      setInstallmentsAmount(installmentAmt);
    }
  };


  const handleReturnClick = () => {
    if (!carBooked) {
      return; // No car booked
    }
    const bookedDays = parseInt(carBooked.durationGivenFor);
    if (remainingDays === bookedDays) {
      toast({
        title: "It's been less than a day since you booked the car.",
        description:
          "So, you will be charged for at least 1 day for the car before returning.",
        status: "info",
        duration: 4000,
        isClosable: true,
        position: "top",
        variant: "subtle",
        bgColor: "teal.500",
        color: "white",
      });
      calculateFinalPaymentPrice();
    }
    setShowReturnModal(true); // Show the modal for rating
  };
  const handleEditClick = () => {
    if (!carBooked) {
      return; // No car booked
    }
    setShowEditModal(true); // Show the modal for rating
  };

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value)); // Set selected rating
  };

  const handleSubmitReturn = async () => {
    if (!carBooked) return;
    if (finalPaymentPrice - installmentsAmount === 0) {

      const requestBody1 = (rating === 0) ? { registrationNumber: carBooked.registrationNumber,price:finalPaymentPrice } : {
        registrationNumber: carBooked.registrationNumber,
        rating: rating,
        price: finalPaymentPrice
      };
      try {
        const response1 = await fetch(
          "https://urban-motion-backend-liart.vercel.app/api/cars/return-car",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody1),
          }
        );

        const result1 = await response1.json();

        if (response1.ok) {
          setTimeout(() => {
            setIsLoading(true);
            toast({
              title: "Car Returned",
              description:
                "Thank you for your feedback! Your car has been returned.",
              status: "success",
              duration: 4000,
              isClosable: true,
              position: "top",
              variant: "subtle",
              bgColor: "teal.500",
              color: "white",
            });
            router.push("/dashboard");
          }, 5000);
        } else {
          toast({
            title: "Error",
            description:
              result1.message || "Something went wrong while returning the car.",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top",
            variant: "subtle",
            bgColor: "red.600",
            color: "white",
          });
        }
      } catch (error) {
        toast({
          title: "Network Error",
          description:
            "There was an issue connecting to the server. Please try again later.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
          variant: "subtle",
          bgColor: "red.600",
          color: "white",
        });
      }
    }
    else {
      setIsRouterLoading(true); // Show isLoading spinner while submitting the request
      router.push({
        pathname: "/payment",
        query: { carId: carBooked.registrationNumber, finalPrice: (numberPaymentsDone > 0) ? finalPaymentPrice - installmentsAmount : finalPaymentPrice, rating: rating },
      });
    }
  };
  const handleSubmitEdit = async () => {

    setIsLoading(true); // Show isLoading spinner while submitting the request

    // Prepare the request payload
    const oldDuration = parseInt(carBooked.durationGivenFor); // Extract number from string
    const latestDuration = parseInt(newDuration);
    console.log('oldDuration: ', oldDuration);
    console.log('newDuration: ', newDuration);
    console.log('latestDuration: ', latestDuration);
    const requestBody = (latestDuration > 0) ? {
      registrationNumber: carBooked.registrationNumber,
      plan: paymentPlan,
      durationGivenFor: `${oldDuration + latestDuration} days`,
    } : {
      registrationNumber: carBooked.registrationNumber,
      plan: paymentPlan,
      durationGivenFor: `${carBooked.durationGivenFor}`,
    };
    console.log("requestBody: ", requestBody);

    try {
      const response = await fetch(
        "https://urban-motion-backend.vercel.app/api/customers/update-plan-duration",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();

      if (response.ok) {
        fetchCarDetails(carBooked.registrationNumber);
        const sessionId = localStorage.getItem("sessionId");
        const customerData = await fetchCustomerData2(sessionId);
        setCustomerData(customerData);
        toast({
          title: "Booking Details of Car Updated",
          description:
            "Your Car Booking Details has been updated.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
          variant: "subtle",
          bgColor: "teal.500",
          color: "white",
        });
      } else {
        toast({
          title: "Error",
          description:
            result.message || "Something went wrong while updating the details of your car booking.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
          variant: "subtle",
          bgColor: "red.600",
          color: "white",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description:
          "There was an issue connecting to the server. Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
        variant: "subtle",
        bgColor: "red.600",
        color: "white",
      });
    } finally {
      setIsLoading(false); // Hide isLoading spinner after request is completed
      setShowEditModal(false); // Close the modal
    }
  };

  return (
    <div>
      {isRouterLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          flexDirection="column"
          position="absolute"
          bg="rgba(0,0,0,0.5)"
          zIndex={3}
          width="100%"
          borderRadius="lg"
        >
          <Image src="/Resources/car-rent.png" alt="" h="50px" zIndex={4} />
          <Spinner size="xl" color="green" />
        </Box>
      )}
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
          flexDirection="column"
          mt={64}
        >
          <Image src="/Resources/car-rent.png" alt="" h="50px" mb={2} />
          <Spinner size="xl" color="green" />
        </Box>
      ) : carBooked ? (
        <HStack flexDirection={{ base: "column-reverse", md: "unset" }}>
          <VStack
            p={{ base: 3, md: 5 }}
            boxShadow="md"
            borderRadius="lg"
            bg="gray.800"
            height={{ base: "80vh", md: "105vh" }}
            alignItems="center"
            flexDirection={{ base: "column", md: "column" }}
            width={{ base: "100%", md: "50%" }}
            spacing={10}
          >
            <Box textAlign="center" mb={2} display={{ base: "none", md: "unset" }}>
              <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                <Image src="/Resources/booking.png" alt="" h="50px" mr={2} />
                <Heading as="h1" size="lg" color="white" ml={2} mt={{ base: 6, md: 4 }}>
                  Your <span style={{ color: "#00db00" }}> Car Booking</span> Details
                </Heading>
              </Box>
              <Text color="gray.400">
                You can view the currently booked car here.
              </Text>
            </Box>
            {/* Use a wrapper box to align all text items */}
            <VStack width="100%" spacing={{ base: 2, md: 2 }} fontSize={{ base: "sm", md: "md" }}>
              <Text display="flex" justifyContent={{ base: "space-between", md: "space-between" }} width="100%" mb={2} alignItems="center">
                <Text display="flex" justifyContent="left" width={{ base: "40%", md: "40%" }} alignItems="center">
                  <Image src="/Resources/model.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Car Model:</span> </Text><span>{carBooked.model}</span>
              </Text>
              <Text display="flex" justifyContent={{ base: "space-between", md: "space-between" }} width="100%" mb={2} alignItems="center">
                <Text display="flex" justifyContent="left" width={{ base: "60%", md: "40%" }} alignItems="center">
                  <Image src="/Resources/car-fuel-type32.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Car Fuel Type:</span> </Text> <span>{carBooked.carType}</span>
              </Text>
              <Text display="flex" justifyContent={{ base: "space-between", md: "space-between" }} width="100%" mb={2} alignItems="center">
                <Text display="flex" justifyContent="left" width={{ base: "70%", md: "40%" }} alignItems="center">
                  <Image src="/Resources/id.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Registration Number:</span> </Text>
                <span>{carBooked.registrationNumber}</span>
              </Text>
              <Text display="flex" justifyContent={{ base: "space-between", md: "space-between" }} width="100%" mb={2} alignItems="center">
                <Text display="flex" justifyContent="left" width={{ base: "40%", md: "40%" }} alignItems="center">
                  <Image src="/Resources/year32.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Car Booked Time:</span>{" "} </Text>
                <span>{new Date(carBooked.handedOn).toLocaleString()}</span>
              </Text>
              <Text display="flex" justifyContent={{ base: "space-between", md: "space-between" }} width="100%" mb={2} alignItems="center">
                <Text display="flex" justifyContent="left" width={{ base: "70%", md: "50%" }} alignItems="center">
                  <Image src="/Resources/money 32 - 2.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Customer Payment Plan:</span>{" "} </Text>
                <span style={{ textTransform: "capitalize" }}  >{customerData.plan}</span>
              </Text>
              <Text display="flex" justifyContent={{ base: "space-between", md: "space-between" }} width="100%" mb={2} alignItems="center">
                <Text display="flex" justifyContent="left" width={{ base: "50%", md: "40%" }} alignItems="center">
                  <Image src="/Resources/rental-price-per-day321.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span style={{ textTransform: "capitalize" }}>{customerData.plan} Pricing:</span></Text> <span> <Icon as={FaRupeeSign} color="white" mb={-0.5} />{customerData.plan === "weekly" ? carBooked.carPricing.weekly : customerData.plan === "monthly" ? carBooked.carPricing.monthly : carBooked.carPricing.quarterly}</span>
              </Text>
              <Text display="flex" justifyContent={{ base: "space-between", md: "space-between" }} width="100%" mb={2} alignItems="center">
                <Text display="flex" justifyContent="left" width={{ base: "60%", md: "40%" }} alignItems="center">
                  <Image src="/Resources/Calendar 32.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Duration Booked For:</span>{" "}</Text>
                <span>{carBooked.durationGivenFor}</span>
              </Text>
              <Text display="flex" justifyContent={{ base: "space-between", md: "space-between" }} width="100%" mb={2} alignItems="center">
                <Text display="flex" justifyContent="left" width={{ base: "60%", md: "40%" }} alignItems="center">
                  <Image src="/Resources/Release Detained License 32.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Remaining Days:</span>{" "}</Text>
                <span>{remainingDays} days</span>
              </Text>
              <Text display="flex" justifyContent={{ base: "space-between", md: "space-between" }} width="100%" mb={2} alignItems="center">
                <Text display="flex" justifyContent="left" width={{ base: "60%", md: "50%" }} alignItems="center">
                  <Image src="/Resources/transactions.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Number of Installments:</span>{" "}</Text>
                <span>{numberPaymentsDone} installments</span>
              </Text>
              <Text display="flex" justifyContent={{ base: "space-between", md: "space-between" }} width="100%" mb={2} alignItems="center">
                <Text display="flex" justifyContent="left" width={{ base: "70%", md: "50%" }} alignItems="center">
                  <Image src="/Resources/money 32.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Total Amount to be Paid:</span></Text>
                <span>
                  <Icon as={FaRupeeSign} color="white" mb={-0.5} />{customerData.plan === "weekly"
                    ? Math.ceil((parseInt(carBooked.durationGivenFor, 10) / 7) * parseInt(carBooked.carPricing.weekly, 10))
                    : customerData.plan === "monthly"
                      ? Math.ceil((parseInt(carBooked.durationGivenFor, 10) / 30) * parseInt(carBooked.carPricing.monthly, 10))
                      : Math.ceil((parseInt(carBooked.durationGivenFor, 10) / 90) * parseInt(carBooked.carPricing.quarterly, 10))}
                </span>
              </Text>
              <Text display="flex" justifyContent={{ base: "space-between", md: "space-between" }} width="100%" alignItems="center">
                <Text display="flex" justifyContent="left" width={{ base: "50%", md: "40%" }} alignItems="center">
                  <Image src="/Resources/mileage.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Return Date:</span>{" "}</Text>
                <span>{returnDate}</span>
              </Text>
            </VStack>
          </VStack>
          <VStack p={{ base: 2, md: 5 }}
            boxShadow="md"
            borderRadius="lg"
            bg="gray.800"
            height={{ base: "80vh", md: "105vh" }}
            alignItems="center"
            flexDirection={{ base: "column", md: "column" }}
            width={{ base: "100%", md: "50%" }}
            spacing={10}>
            <Box p={5} boxShadow="md" borderRadius="lg" bg="gray.700" height={{ base: "55vh", md: "105vh" }} display={{ base: "flex", md: "flex" }} justifyContent="center" alignItems="center" flexDirection="column" width={{ base: "100%", md: "100%" }}>
              <Box textAlign="center" mb={2} display={{ base: "unset", md: "none" }} mt={4}>
                <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                  <Image src="/Resources/booking.png" alt="" h="50px" mr={2} />
                  <Heading as="h1" size="lg" color="white" ml={2} mt={{ base: 6, md: 4 }}>
                    Your <span style={{ color: "#00db00" }}> Car Booking</span> Details
                  </Heading>
                </Box>
                <Text color="gray.400">
                  You can view the currently booked car here.
                </Text>
              </Box>
              <Box
                width="100%" // Make it responsive to fill the screen width on mobile
                maxWidth="350px" // Limit max width for better design on smaller devices
                height="auto" // Allow height to adjust dynamically
                overflow="hidden"
                borderRadius="30px" // Adjusted for a better look on mobile
                mx="auto" // Center the box horizontally
                _hover={{
                  transform: "scale(1.05)", // Simple hover effect without flipping
                  transition: "transform 0.3s ease-in-out",
                }}
                transform={{ base: "unset", md: "scale(1.2)" }}
                mb={{ base: "unset", md: 8 }}
              >
                {carBooked.carImage ? (
                  <CldImage
                    src={carBooked.carImage}
                    alt="Car Image"
                    width="300" // Adjust image size for mobile
                    height="300"
                    style={{
                      width: "100%", // Image takes full width of the container
                      height: "auto", // Maintain aspect ratio
                      objectFit: "contain",
                      borderRadius: "30px", // Match container's borderRadius
                    }}
                  />
                ) : (
                  <Image
                    src="/dummy_car.png"
                    alt={carBooked.model}
                    boxSize="100%" // Dynamically adjust size
                    maxWidth="300px" // Limit the size for better visuals on mobile
                    objectFit="contain"
                    borderRadius="md"
                    _hover={{
                      transform: "scale(1.05)", // Responsive hover effect
                      transition: "0.3s ease-in-out",
                    }}
                    cursor="pointer"
                    mx="auto"
                  />
                )}
                <Text display="flex" justifyContent="center" width="100%" fontSize={{ base: "xl", md: "3xl" }} color="#00db00">
                  {carBooked.model}
                </Text>
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection={{base:"column",md:"row-reverse"}} gap={3}>
              <Button
                colorScheme="green"
                bg="gray.600"
                color="#00db00"
                _hover={{ color: "white", bg: "rgba(0,200,0,0.6)" }}
                onClick={handleReturnClick}
                p={{ base: 6, md: 6 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={2}
              >
                <Image
                  src="/Resources/Return.png"
                  alt=""
                  h="50px"
                  borderRadius="3"
                  p="4px"
                  zIndex={2}
                />
                <span>Return Car</span>
              </Button>
              <Button
                colorScheme="green"
                bg="gray.600"
                color="#00db00"
                _hover={{ color: "white", bg: "rgba(0,200,0,0.6)" }}
                onClick={handleEditClick}
                p={{ base: 6, md: 6 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={2}
              >
                <Image
                  src="/Resources/ReturnCar-100.png"
                  alt=""
                  h="50px"
                  borderRadius="3"
                  p="4px"
                  zIndex={2}
                />
                <span>Edit Plan/Duration</span>
              </Button>
            </Box>
          </VStack>
        </HStack>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          flexDirection="column"
        >
          <Image src="/Resources/BookingBlue.png" alt="" h="150px" mb={2} />
          <Alert status="info" borderRadius="xl"
            color="black" width="50%">
            <AlertIcon />
            No booking found.
          </Alert>
        </Box>
      )}

      {/* Rating Modal */}
      <Modal isOpen={showReturnModal} onClose={() => setShowReturnModal(false)} >
        <ModalOverlay />
        <ModalContent bg="black" color="#00db00">
          <ModalHeader>Are you sure you want to return the car?</ModalHeader>
          <Text fontSize="sm" color="#00db00" ml={8} mb={2}>
            Please rate your experience and help us to grow.
          </Text>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="sm" color="#00db00" ml={8} mb={2}>
              Actual Days Car Used : {actualDays} Days
            </Text>
            <Text fontSize="sm" color="#00db00" ml={8} mb={2}>
              Total Amount to be paid : ₹{finalPaymentPrice}
            </Text>
            {numberPaymentsDone > 0 && <Text fontSize="sm" color="#00db00" ml={8} mb={2}>
              Amount paid in {numberPaymentsDone} installments : ₹{installmentsAmount}
            </Text>}
            {numberPaymentsDone > 0 && <Text fontSize="sm" color="#00db00" ml={8} mb={2}>
              Final Price to pay : ₹{finalPaymentPrice - installmentsAmount}
            </Text>}
            <Select placeholder="Select rating" onChange={handleRatingChange}>
              <option value="1">⭐ - Poor</option>
              <option value="2">⭐⭐ - Fair</option>
              <option value="3">⭐⭐⭐ - Good</option>
              <option value="4">⭐⭐⭐⭐ - Very Good</option>
              <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              isLoading={isLoading}
              onClick={handleSubmitReturn}
              borderRadius="md"
            >
              {finalPaymentPrice - installmentsAmount === 0 ? "Return" : "Pay Now"}
            </Button>
            <Button colorScheme="red" borderRadius="md" ml={2} onClick={() => setShowReturnModal(false)}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Editing Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <ModalOverlay />
        <ModalContent bg="black" color="#00db00">
          <ModalHeader>Change your payment plan and duration!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              size={{ base: "xs", md: "md" }}
              placeholder="Extend car booking for days?"
              onChange={handleInputChange}
              bg="gray.100"
              type="number"
              color="black"
              mb={2}
            />
            <Select onChange={handlePaymentPlanChange} defaultValue="" value={paymentPlan}>
              <option value="" disabled style={{ color: "gray", fontWeight: "bold" }}>
                Select Payment Plan
              </option>
              <option id="weekly" value="weekly" disabled style={{ color: "gray", fontWeight: "bold" }}>Weekly</option>
              <option id="monthly" value="monthly" disabled style={{ color: "gray", fontWeight: "bold" }}>Monthly</option>
              <option id="quarterly" value="quarterly" disabled style={{ color: "gray", fontWeight: "bold" }}>Quarterly</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              isLoading={isLoading}
              onClick={handleSubmitEdit}
              disabled={newDuration <= 0}
            >
              Submit
            </Button>
            <Button colorScheme="red" borderRadius="md" ml={2} onClick={() => setShowEditModal(false)}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Bookings;
