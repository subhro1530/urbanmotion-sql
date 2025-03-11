import Navbar from "../components/Others/Navbar";
import AddCar from "../components/AddCar";
import {Box} from "@chakra-ui/react";

const Add_Car = () => {
    return (
        <>
            <Box bgColor="#00db00" maxH="100vh">
                <Navbar />
                <AddCar />
            </Box>
        </>
    );
};

export default Add_Car;
