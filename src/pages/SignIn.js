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
import { Link, Redirect } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import { auth } from "../firebase";
import { handleValidation } from "../components/Validate";

function SignIn() {
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
        .signInWithEmailAndPassword(
          emailRef.current.value,
          passRef.current.value
        )
        .then((user) => {
          setUser(user);
        })
        .catch((err) => {
          console.log("her");
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

  if (user) {
    return <Redirect to="/share" />;
  } else {
    return (
      <>
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={""} py={8} px={4}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Sign in</Heading>
              <Text fontSize={"lg"} color={"gray.400"}>
                Share your files using random emails✌️
              </Text>
            </Stack>
            <form autoComplete="off" onSubmit={onSubmitHandler}>
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
                    Sign In
                  </Button>
                  <Text fontSize={"lg"} textAlign={"center"} color={"gray.400"}>
                    Dont have an <Link to={"/signup"}>account?</Link>{" "}
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Flex>
      </>
    );
  }
}

export default SignIn;
