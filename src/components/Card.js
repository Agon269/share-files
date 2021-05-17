import React from "react";
import { Box, Center } from "@chakra-ui/react";
export default function Card({ children }) {
  return (
    <div>
      <Center py={"42"}>
        <Box
          maxW={"500px"}
          w={"full"}
          height={"96"}
          alignContent={"center"}
          boxShadow={"2xl"}
          rounded={"lg"}
          borderWidth={"thin"}
          variant={"outline"}
          borderColor={"gray.300"}
          p={6}
          textAlign={"center"}
        >
          {children}
        </Box>
      </Center>
    </div>
  );
}
