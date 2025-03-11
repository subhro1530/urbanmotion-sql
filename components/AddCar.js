import {
    Box,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
    useToast,
    VStack,
    HStack,
    Image,
    Spinner,
    IconButton
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

const AddCar = () => {
    const [carDetails, setCarDetails] = useState({
        model: "",
        image: "",
        registrationNumber: "",
        pricing: "",
        type: "",
    });
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploadingImage, setIsLUploadingImage] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const fileInputRef = useRef();
    const toast = useToast();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarDetails({ ...carDetails, [name]: value });
    };
    const handleImageChange = (e) => {
        setUploadedImageUrl("");
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };
    const resetFileInput = () => {
        setImage(null);
        fileInputRef.current.value = ""; // Clear the file input
    };
    const handleImageUpload = async () => {
        if (!image) {
            toast({
                title: "No file selected",
                description: "Please select an image to upload.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        if (isUploadingImage) return; // Prevent multiple triggers
        setIsLUploadingImage(true);

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME); // Optional: If you're using presets in Cloudinary
        formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
        formData.append("folder", "urbanmotionsql/cars");

        setIsLoading(true);

        // Log the payload being sent to Cloudinary

        try {
            if (formData && image) {
                const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: "post",
                    body: formData
                })

                if (response.status === 200) {
                    const data = await response.json();
                    const uploadedImagePublicId = data.public_id;
                    const uploadedUrl = data.url;
                    setUploadedImageUrl(uploadedUrl);
                    setIsLoading(false);
                    setImage(null);
                    resetFileInput();
                    return uploadedImagePublicId;
                }
                else {
                    toast({
                        title: "Failed to upload image!",
                        description: "The image cannot been uploaded to Cloudinary.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top",
                        variant: "subtle",
                        bgColor: "teal.500",
                        color: "white",
                    });
                }
                setIsLoading(false);
                setImage(null);
                resetFileInput();
                return null;
            }

            // Extract the URL from the response and set it

        } catch (error) {
            setIsLoading(false);
            setImage(null);
            resetFileInput();
            console.error("Error uploading image:", error);
            toast({
                title: "Error uploading image",
                description: error.message || "An unexpected error occurred.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
                variant: "subtle",
                bgColor: "teal.500",
                color: "white",
            });
        }
        finally {
            setIsLUploadingImage(false); // Reset the flag once upload completes
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uploadedImagePublicId = await handleImageUpload();

        if (!uploadedImagePublicId) {
            toast({
                title: "Image upload failed",
                description: "Please try again to upload the image.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "subtle",
                bgColor: "teal.500",
                color: "white",
            });
            return; // Exit early if the image upload fails
        }

        setCarDetails({ ...carDetails, ["image"]: uploadedImagePublicId });
        const updatedCarDetails = {
            ...carDetails,
            image: uploadedImagePublicId, // Ensure the carImage is correctly 
        };

        const carData = {
            model: updatedCarDetails.model,
            image: updatedCarDetails.image, // Add carImage to the data
            registrationNumber: updatedCarDetails.registrationNumber,
            pricing: updatedCarDetails.pricing,
            type: updatedCarDetails.type,
        };
        const response = await axios.post(
            "https://car-rental-backend-postgres.vercel.app/api/cars/add-car",
            carData
        );
        if (response.status === 201) {
            toast({
                title: "Car added successfully!",
                description: "The car has been added to your inventory.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "subtle",
                bgColor: "teal.500",
                color: "white",
            });
            setCarDetails({
                registrationNumber: "",
                model: "",
                carType: "",
                quarterly: "",
                monthly: "",
                weekly: "",
                carImage: "",
            });
        }
        else {
            toast({
                title: "Error adding car",
                description:
                    error.response?.data?.message || "An unexpected error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            w={{ base: "full", md: "90%", lg: "80%" }}
            p={{ base: 4, md: 8 }}
            bg="gray.800"
            borderRadius="lg"
            boxShadow="lg"
            maxW="800px"
            mx="auto"
            mt={{ base: 16, md: 20 }}
        >
            <Box textAlign="center" mb={{ base: 4, md: 6 }}>
                <Box display="flex" flexDirection={{ base: "column", md: "row" }} alignItems="center" justifyContent="center" mb={4}>
                    <Image src="/Resources/add-car40.png" alt="" h={{ base: "35px", md: "50px" }} mr={{ base: 0, md: 3 }} />
                    <Heading as="h1" size={{ base: "md", md: "lg" }} color="#00db00" mt={{ base: 2, md: 0 }}>
                        Add Car
                    </Heading>
                </Box>
                <Text color="gray.400" fontSize={{ base: "sm", md: "md" }}>
                    Fill in the details below to add a new car to your inventory.
                </Text>
            </Box>

            <form onSubmit={handleSubmit}>

                <VStack spacing={4} width={{ base: "100%", md: "100%" }} height={"10%"} justifyContent={"center"}>
                        <FormControl>
                            <FormLabel fontSize={{ base: "sm", md: "md" }}>Registration Number</FormLabel>
                            <Box display="flex" alignItems="center">
                                <Image src="/Resources/id.png" alt="" h="30px" mr={3} />
                                <Input
                                    placeholder="Enter registration number"
                                    name="registrationNumber"
                                    value={carDetails.registrationNumber}
                                    onChange={handleInputChange}
                                    bg="gray.100"
                                    color="black"
                                    type="text"
                                    fontSize={{ base: "sm", md: "md" }}
                                />
                            </Box>
                        </FormControl>

                    <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>Model</FormLabel>
                        <Box display="flex" alignItems="center">
                            <Image src="/Resources/model.png" alt="" h="30px" mr={3} />
                            <Input
                                placeholder="Enter car model"
                                name="model"
                                value={carDetails.model}
                                onChange={handleInputChange}
                                bg="gray.100"
                                color="black"
                                type="text"
                                fontSize={{ base: "sm", md: "md" }}
                            />
                        </Box>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>Car Fuel Type</FormLabel>
                        <Box display="flex" alignItems="center">
                            <Image src="/Resources/car-fuel-type32.png" alt="" h="30px" mr={3} />
                            <Select
                                name="type"
                                value={carDetails.type}
                                onChange={handleInputChange}
                                bg="gray.100"
                                color="black"
                                fontSize={{ base: "sm", md: "md" }}
                            >
                                <option value="" disabled>Select Car Fuel Type</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                            </Select>
                        </Box>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>Pricing (Monthly)</FormLabel>
                        <Box display="flex" alignItems="center">
                            <Image src="/Resources/rental-price-per-day321.png" alt="" h="30px" mr={3} />
                            <Input
                                type="number"
                                placeholder="Enter pricing"
                                name="pricing"
                                value={carDetails.pricing}
                                onChange={handleInputChange}
                                bg="gray.100"
                                color="black"
                                fontSize={{ base: "sm", md: "md" }}
                            />
                        </Box>
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>Car Image</FormLabel>
                        <Box display="flex" alignItems="center" width="25%">
                            <Image src="/Resources/BookingWhite.png" alt="" h="30px" mr={3} />
                            <Box position="relative" width="100%">
                                <Input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    opacity="0"
                                    position="absolute"
                                    width="100%"
                                    height="100%"
                                    cursor="pointer"
                                />
                                <Box
                                    as="button"
                                    bg="gray.100"
                                    color="black"
                                    px={4}
                                    py={2}
                                    borderRadius="md"
                                    textAlign="center"
                                    fontSize={{ base: "sm", md: "md" }}
                                >
                                    {image ? image.name : "Choose a file"}
                                </Box>
                            </Box>
                        </Box>
                    </FormControl>
                </VStack>

                <Box mt={6} textAlign="center">
                    <Button
                        bg="#00db00"
                        color="white"
                        borderRadius="md"
                        fontSize={{ base: "sm", md: "lg" }}
                        px={{ base: 4, md: 5 }}
                        py={{ base: 3, md: 4 }}
                        _hover={{
                            bg: "white",
                            boxShadow: "0 0 15px #00db00, 0 0 30px #00db00",
                            border: "2px solid #00db00",
                            color: "#00db00",
                        }}
                        sx={{
                            boxShadow: "0 0 10px #00db00, 0 0 20px rgba(0, 219, 0, 0.5)",
                            transition: "0.3s ease",
                        }}
                        type="submit"
                    >
                        Add Car
                    </Button>
                </Box>
            </form>
        </Box>

    );
};

export default AddCar;
