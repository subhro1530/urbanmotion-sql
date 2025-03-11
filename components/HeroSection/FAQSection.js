import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box); // Wrapping Box for animations

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I book a car?",
      answer:
        "Simply select your car and follow the on-screen instructions to book.",
    },
    {
      question: "What are the payment methods?",
      answer: "We accept credit cards, debit cards, and PayPal.",
    },
    {
      question: "Is there an age requirement?",
      answer: "Yes, renters must be at least 21 years old.",
    },
    {
      question: "Do I need insurance to rent a car?",
      answer:
        "Insurance is not mandatory, but we recommend it. We also offer rental insurance options for your convenience.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking up to 24 hours before the scheduled rental time. Cancellation fees may apply.",
    },
    {
      question: "Are there mileage limits on rentals?",
      answer:
        "Yes, there is a mileage limit for each rental. Additional charges may apply for exceeding the limit.",
    },
    {
      question: "Can I rent a car for someone else?",
      answer:
        "Yes, but the person driving the car must be present to show a valid driver’s license at the time of pickup.",
    },
    {
      question: "What happens if I return the car late?",
      answer:
        "A late return fee will be charged based on the duration of the delay. Please contact our support team if you anticipate being late.",
    },
    {
      question: "Do you offer one-way rentals?",
      answer:
        "Yes, we offer one-way rentals. Please check availability and additional fees at the time of booking.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team through the Contact page for further assistance.",
    },
  ];

  return (
    <Box
      bgGradient="linear(to-r, black, gray.800)"
      p={{base:8,md:20}}
      color="white"
      w="100%"
      mx="auto"
      id="faq"
    >
      {/* Section Title */}
      <Text
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="bold"
        mb={8}
        textAlign="center"
        textTransform="uppercase"
        letterSpacing="wide"
      >
        Frequently Asked{" "}
        <Text as="span" color="#00dc00">
          Questions
        </Text>
      </Text>

      {/* FAQ Items */}
      <Accordion allowToggle>
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            bg="gray.700"
            borderRadius="md"
            mb={4}
            boxShadow="lg"
          >
            <h2>
              <AccordionButton
                px={6}
                py={4}
                borderRadius="md"
                _hover={{ bg: "gray.600" }}
              >
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="semibold"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  {faq.question}
                </Box>
                <AccordionIcon color="#00dc00" />
              </AccordionButton>
            </h2>

            <MotionBox
              as={AccordionPanel}
              px={6}
              py={4}
              fontSize={{ base: "sm", md: "md" }}
              bg="gray.800"
              color="gray.300"
              borderRadius="md"
              borderTop="1px solid #00dc00"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
            >
              {faq.answer}
            </MotionBox>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default FAQSection;
