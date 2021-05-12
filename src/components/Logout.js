import React from "react";
import { Button, Stack } from "@chakra-ui/react";
import { auth } from "../firebase";
import { firebase } from "../firebase";
export default function Logout() {
  const handleClick = () => {
    firebase.auth().signOut();
  };
  return (
    <Stack
      direction="row"
      align={"flex-end"}
      justify={"flex-end"}
      p={"4"}
      spacing={4}
    >
      <Button colorScheme="teal" variant="outline" onClick={handleClick}>
        Logout
      </Button>
    </Stack>
  );
}
