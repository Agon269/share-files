import React from "react";
import { Box, Center, ScaleFade } from "@chakra-ui/react";
export default function Card({ children }) {
  return (
    <div>
      <ScaleFade initialScale={0.9} in={true}>
        <Center py={"42"}>
          <Box
            maxW={"500px"}
            w={"full"}
            height={"96"}
            alignContent={"center"}
            boxShadow="2xl"
            p="6"
            rounded="md"
            variant={"outline"}
            borderColor={"gray.300"}
            textAlign={"center"}
          >
            {children}
          </Box>
        </Center>
      </ScaleFade>
    </div>
  );
}
