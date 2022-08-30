import { Link as RouterLink } from "react-router-dom";
import {
  Heading,
  Box,
  Flex,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Navbar() {
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box as={RouterLink} to="/">
              <Heading size="md">Photon</Heading>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            ></HStack>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}
