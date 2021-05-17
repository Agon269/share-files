import React, { useCallback, useContext, useRef } from "react";
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
import { Link, Redirect, withRouter } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import { auth } from "../firebase";
import { AuthContext } from "../Auth";

function LogIn({ history }) {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const toast = useToast();

  const onSubmitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const email = emailRef.current.value;
      const password = passRef.current.value;
      try {
        await auth.signInWithEmailAndPassword(email, password);
        history.push("/");
      } catch (err) {
        toast({
          title: err.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    },
    [history]
  );
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={""} py={8} px={4}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in trial</Heading>
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
                  Aleady have an <Link to={"/create"}>account?</Link>{" "}
                </Text>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </>
  );
}

export default withRouter(LogIn);
