import { Box, FormControl, FormLabel, Input, Button, Select, Heading } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const RentalOrderForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    car: "",
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/api/rentals`, formData);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box maxWidth="500px" mx="auto" p={6} boxShadow="lg" borderRadius="md">
      <Heading mb={6}>Place a Rental Order</Heading>
      <FormControl mb={4}>
        <FormLabel>Customer Name</FormLabel>
        <Input name="customerName" onChange={handleChange} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input name="email" onChange={handleChange} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Select Car</FormLabel>
        <Select name="car" onChange={handleChange}>
          <option value="Car A">Car A</option>
          <option value="Car B">Car B</option>
        </Select>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Rental Duration</FormLabel>
        <Select name="duration" onChange={handleChange}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </Select>
      </FormControl>
      <Button colorScheme="teal" onClick={handleSubmit} width="full">Submit</Button>
    </Box>
  );
};

export default RentalOrderForm;
