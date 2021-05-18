import React from "react";
import { Spinner, Center } from "@chakra-ui/react";
export default function Loading() {
  return (
    <Center py={80}>
      <Spinner size="xl" />
    </Center>
  );
}
