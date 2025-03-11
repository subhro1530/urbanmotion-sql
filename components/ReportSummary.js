import { Box, Heading, Button, Select } from "@chakra-ui/react";
import { useState } from "react";

const ReportSummary = () => {
  const [period, setPeriod] = useState("15-days");

  const generateReport = () => {
    console.log("Generating report for:", period);
  };

  return (
    <Box maxWidth="500px" mx="auto" p={6} boxShadow="lg" borderRadius="md">
      <Heading mb={6}>Generate Summary Report</Heading>
      <Select mb={4} onChange={(e) => setPeriod(e.target.value)}>
        <option value="15-days">Last 15 Days</option>
        <option value="1-month">Last 1 Month</option>
      </Select>
      <Button colorScheme="teal" onClick={generateReport} width="full">Generate Report</Button>
    </Box>
  );
};

export default ReportSummary;
