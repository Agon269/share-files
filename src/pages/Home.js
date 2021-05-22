import Header from "../components/Header";
import React from "react";
import { withRouter, Link as RouterLink } from "react-router-dom";

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  SlideFade,
  Link,
} from "@chakra-ui/react";

function Home({ history }) {
  return (
    <>
      <Header />
      <SlideFade in={true} offsetY="20px">
        <Container maxW={"3xl"}>
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 10, md: 20 }}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: "xl", sm: "3xl", md: "4xl" }}
              lineHeight={"140%"}
            >
              Share files with your friends using
              <br />
              <Text as={"span"} color={"teal.200"}>
                random emails
              </Text>
            </Heading>

            <Stack
              direction={"column"}
              spacing={3}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
            >
              <Button
                colorScheme={"teal"}
                px={6}
                onClick={() => {
                  history.push("/upload");
                }}
              >
                Upload files
              </Button>
              <Link as={RouterLink} to={"/download"} color={"teal.400"}>
                Download
              </Link>
            </Stack>
          </Stack>
        </Container>
      </SlideFade>
    </>
  );
}

export default withRouter(Home);
