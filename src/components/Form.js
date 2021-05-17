import React, { useRef } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

function Form({ onSubmitHandler, content }) {
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    let values = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    onSubmitHandler(values);
  };
  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={""} py={8} px={4}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>{content.title}</Heading>
            <Text fontSize={"lg"} color={"gray.400"}>
              {content.subtit}
            </Text>
          </Stack>
          <form autoComplete="off" onSubmit={submitHandler}>
            <Stack spacing={5}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  ref={emailRef}
                  focusBorderColor="teal.900"
                  name="email"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  focusBorderColor="teal.900"
                  name="password"
                  type="password"
                  autoComplete={"off"}
                  ref={passRef}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type="submit"
                  mt="4"
                  colorScheme="teal"
                  variant="outline"
                  _hover={{
                    bg: "teal.800",
                  }}
                >
                  {content.button}
                </Button>
                <Text fontSize={"lg"} textAlign={"center"} color={"gray.400"}>
                  {content.linkContent}{" "}
                  <Link to={content.to}>{content.link}?</Link>{" "}
                </Text>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </>
  );
}

export default Form;
