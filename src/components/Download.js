import React from "react";
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,
} from "@chakra-ui/react";
function Download() {
  return (
    <Container pt={48}>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input
          focusBorderColor="teal.900"
          name="password"
          type="password"
          autoComplete="off"
        />
      </FormControl>
      <Button
        mt="4"
        colorScheme="teal"
        variant="outline"
        _hover={{
          bg: "teal.900",
        }}
      >
        Download
      </Button>
    </Container>
  );
}

export default Download;
