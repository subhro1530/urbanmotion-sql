import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Text,
    VStack,
    HStack,
    Spinner,
    Image,
    useToast
} from '@chakra-ui/react';
import { useRouter } from "next/router";


// Dynamically import react-icons
const FaCreditCard = dynamic(() => import('react-icons/fa').then((mod) => mod.FaCreditCard), { ssr: false });
const MdQrCodeScanner = dynamic(() => import('react-icons/md').then((mod) => mod.MdQrCodeScanner), { ssr: false });
const UpiLogo = () => (
    <Image
        src="https://www.vectorlogo.zone/logos/upi/upi-icon.svg"
        alt="UPI Logo"
        width="4"
        height="4"
    />
);

const PaymentPage = () => {
    const toast = useToast();
    const router = useRouter();
    const { carId, finalPrice, rating } = router.query;
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [paymentDone, setPaymentDone] = useState(false);

    // State for card input values
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    // State for UPI input values
    const [upiDetails, setUpiDetails] = useState({
        upiId: '',
        upiPin: '',
    });

    useEffect(() => {
        console.log("Car ID:", carId);
        console.log("Final Price:", finalPrice);
        console.log("Rating:", rating);
    }, [carId, finalPrice, rating]);

    const handlePayment = async () => {
        const isCardDetailsEmpty =
            !cardDetails.cardNumber &&
            !cardDetails.expiryDate &&
            !cardDetails.cvv;

        const isUpiDetailsEmpty =
            !upiDetails.upiId &&
            !upiDetails.upiPin;

        if ((isCardDetailsEmpty && paymentMethod === "card") || (isUpiDetailsEmpty && paymentMethod === "upi")) {
            setIsEmpty(true);
            setTimeout(() => {
                setIsEmpty(false);
            }, 1000);
        }
        else {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setPaymentDone(true);
                setUpiDetails({ upiId: '', upiPin: '' });
                setCardDetails({ cardNumber: '', expiryDate: '', cvv: '' });
            }, 2500);
            setTimeout(() => {
                setPaymentDone(false);
            }, 3000);
        }

        const requestBody1 = (rating === 0) ? { registrationNumber: carId, price: finalPrice } : {
            registrationNumber: carId,
            rating: rating,
            price: finalPrice
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
    };


    return (
        <Center h="100vh" bg="#00db00">
            {isLoading && (
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
                    <Text fontSize="sm" color="#00db00" ml={8} mb={2}>
                        Paying ₹{finalPrice} ...
                    </Text>
                    <Spinner size="xl" color="green" />
                </Box>
            )}
            <Box bg="black" p={{ base: 8, md: 8 }} borderRadius="md" boxShadow="200px" justifyContent="center" alignItems="center" display="flex" flexDirection="column" height={{ base: "700px", md: "600px" }} width={{ base: "90%", md: "unset" }}>
                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <Box display="flex" justifyContent="center">
                        <Image src="short.png" alt="" h="50px" mr={2} borderRadius="sm" />
                        <Text fontSize="2xl" mb={4} display="flex" alignItems="center" color="whiteAlpha.900" h="50px">
                            UrbanMotion Payment Page
                        </Text>
                    </Box>
                    <Text fontSize="sm" color="#00db00" mb={2}>
                        Please make a final payment of ₹{finalPrice} to successfully return the car with registrationNumber: {carId}
                    </Text>
                </Box>
                <RadioGroup colorScheme="green" onChange={setPaymentMethod} value={paymentMethod} mt={2}>
                    <Stack direction="row" spacing={5} color="whiteAlpha.800">
                        <Radio value="card" >
                            <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                                <FaCreditCard /> Card
                            </Box>
                        </Radio>
                        <Radio value="upi">
                            <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                                <UpiLogo /> UPI
                            </Box>
                        </Radio>
                        <Radio value="qr" isDisabled>
                            <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                                <MdQrCodeScanner /> QR Code (Coming Soon)
                            </Box>
                        </Radio>
                    </Stack>
                </RadioGroup>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    {paymentMethod === 'card' && (
                        <VStack
                            mt={4}
                            spacing={2}
                            bgGradient="linear(to-r, darkgreen, lightgreen)" // Simulates a card's gradient background
                            p={6}
                            borderRadius="lg"
                            boxShadow="lg"
                            width="full"
                            maxW="400px"
                            position="relative"
                            color="white"
                        >
                            {/* Card Chip */}
                            <Box
                                width="50px"
                                height="35px"
                                bgColor="gold"
                                borderRadius="md"
                                mb={4}
                                alignSelf="flex-start"
                            ></Box>

                            {/* Card Holder Name */}
                            <FormControl>
                                <FormLabel color="whiteAlpha.800" fontSize="sm">
                                    Card Number
                                </FormLabel>
                                <Input
                                    placeholder="1234 5678 9012 3456"
                                    value={cardDetails.cardNumber}
                                    onChange={(e) =>
                                        setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                                    }
                                    color="white"
                                    bg="transparent"
                                    borderColor="whiteAlpha.700"
                                    _placeholder={{ color: 'whiteAlpha.600' }}
                                    _focus={{
                                        outline: "none",
                                        borderColor: "rgba(0, 255, 0, 0.8)",
                                        boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                                    }}
                                />
                            </FormControl>

                            <HStack spacing={4} w="full">
                                <FormControl>
                                    <FormLabel color="whiteAlpha.800" fontSize="sm">
                                        Expiry Date
                                    </FormLabel>
                                    <Input
                                        placeholder="MM/YY"
                                        value={cardDetails.expiryDate}
                                        onChange={(e) =>
                                            setCardDetails({ ...cardDetails, expiryDate: e.target.value })
                                        }
                                        color="white"
                                        bg="transparent"
                                        borderColor="whiteAlpha.700"
                                        _placeholder={{ color: 'whiteAlpha.600' }}
                                        _focus={{
                                            outline: "none",
                                            borderColor: "rgba(0, 255, 0, 0.8)",
                                            boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                                        }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel color="whiteAlpha.800" fontSize="sm">
                                        CVV
                                    </FormLabel>
                                    <Input
                                        placeholder="123"
                                        type="password"
                                        color="white"
                                        bg="transparent"
                                        value={cardDetails.cvv}
                                        onChange={(e) =>
                                            setCardDetails({ ...cardDetails, cvv: e.target.value })
                                        }
                                        borderColor="whiteAlpha.700"
                                        _placeholder={{ color: 'whiteAlpha.600' }}
                                        _focus={{
                                            outline: "none",
                                            borderColor: "rgba(0, 255, 0, 0.8)",
                                            boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                                        }}
                                    />
                                </FormControl>
                            </HStack>

                            {/* Card Branding */}
                            <Box
                                mt={4}
                                alignSelf="flex-end"
                                display="flex"
                                alignItems="center"
                                gap={2}
                            >
                                <Box as="span" fontWeight="bold" fontSize="xs">
                                    RuPay
                                </Box>
                                <Box
                                    as="span"
                                    bgColor="white"
                                    height="15px"
                                    width="15px"
                                    borderRadius="50%"
                                ></Box>
                                <Box
                                    as="span"
                                    bgColor="red.500"
                                    height="15px"
                                    width="15px"
                                    borderRadius="50%"
                                ></Box>
                            </Box>
                        </VStack>
                    )}

                    {paymentMethod === 'upi' && (
                        <VStack mt={4} spacing={4} color="whiteAlpha.800" height="200px">
                            <FormControl>
                                <FormLabel>UPI ID</FormLabel>
                                <Input placeholder="example@upi" value={upiDetails.upiId}
                                    onChange={(e) =>
                                        setUpiDetails({ ...upiDetails, upiId: e.target.value })
                                    } _focus={{
                                        outline: "none",
                                        bg: "rgba(255, 255, 255, 0.3)",
                                        borderColor: "rgba(0, 255, 0, 0.8)",
                                        boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",

                                    }} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>UPI PIN</FormLabel>
                                <Input placeholder="****" type="password" value={upiDetails.upiPin}
                                    onChange={(e) =>
                                        setUpiDetails({ ...upiDetails, upiPin: e.target.value })
                                    } _focus={{
                                        outline: "none",
                                        bg: "rgba(255, 255, 255, 0.3)",
                                        borderColor: "rgba(0, 255, 0, 0.8)",
                                        boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                                    }} />
                            </FormControl>
                        </VStack>
                    )}

                    <Button
                        mt={6}
                        colorScheme="green"
                        onClick={handlePayment}
                        isDisabled={paymentMethod === 'qr'}
                        width="50%"
                    >
                        Pay Now
                    </Button>
                </Box>
            </Box>
            {paymentDone && (toast({
                title: "Payment Successful",
                description: "Your payment was successfully completed.",
                status: "success",
                duration: 4000,
                isClosable: true,
                position: "top",
                variant: "subtle",
                bgColor: "green.600",
                color: "white",
            }))}
            {isEmpty && (toast({
                title: "Invalid Credentials",
                description: "Please fill in your details to proceed payment.",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top",
                variant: "subtle",
                bgColor: "yellow.600",
                color: "white",
            }))}
        </Center>
    );
};

export default PaymentPage;
