import React from "react";
import { Button, Stack } from "@chakra-ui/react";
import { firebase } from "../firebase";
export default function Logout() {
  const handleClick = () => {
    firebase.auth().signOut();
  };
  return (
    <Stack direction="row" align={"flex-end"} justify={"flex-end"} spacing={4}>
      <Button colorScheme="teal" variant="outline" onClick={handleClick}>
        Log out
      </Button>
    </Stack>
  );
}
