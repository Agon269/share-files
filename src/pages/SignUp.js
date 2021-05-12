import React, { useRef, useState } from "react";
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
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { handleValidation } from "../components/Validate";
import { useToast } from "@chakra-ui/toast";

function SignUp() {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const toast = useToast();

  const [user, setUser] = useState(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let values = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    if (handleValidation(values) === true) {
      auth
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passRef.current.value
        )
        .then((user) => {
          setUser(user);
        })
        .catch((err) => {
          toast({
            title: err.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    } else {
      const err = handleValidation(values);
      let message;
      if (err["email"]) {
        message = err["email"];
      } else {
        message = err["password"];
      }
      toast({
        title: message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={""} py={8} px={4}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Create an account</Heading>
            <Text fontSize={"lg"} color={"gray.400"}>
              Share your files using random emails✌️
            </Text>
          </Stack>
          <form autoComplete="off" onSubmit={onSubmitHandler}>
            <Stack spacing={5}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  focusBorderColor="teal.900"
                  name="email"
                  ref={emailRef}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  focusBorderColor="teal.900"
                  name="password"
                  type="password"
                  autoComplete="off"
                  ref={passRef}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  mt="4"
                  colorScheme="teal"
                  variant="outline"
                  _hover={{
                    bg: "teal.400",
                  }}
                  type="submit"
                >
                  Sign Up
                </Button>
                <Text fontSize={"lg"} textAlign={"center"} color={"gray.400"}>
                  Already have an <Link to={"/"}>account?</Link>{" "}
                </Text>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </div>
  );
}

export default SignUp;
