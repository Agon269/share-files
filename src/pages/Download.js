import React, { useState, useRef } from "react";
import { FormLabel, Input, Button, Container, Stack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import app from "../firebase";

import Header from "../components/Header";
import Card from "../components/Card";
import Loading from "../components/Loading";
const db = app.firestore();
function Download() {
  const [fileLink, setFileLink] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const code = useRef(null);

  const download = async (e) => {
    e.preventDefault();
    if (!code.current.value) {
      toast({
        title: "please enter code",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      setLoading(true);

      const snap = await db
        .collection("downloadlinks")
        .doc(code.current.value)
        .get();
      let file;
      try {
        file = await snap.data();
        setLoading(false);
        if (!file) {
          toast({
            title: "No such file",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        } else {
          let link = file.readyFile.link;
          setFileLink(link);
        }
      } catch (err) {
        toast({
          title: err,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Header />
      <Container>
        <Card>
          <form onSubmit={download}>
            <FormLabel>Download Code</FormLabel>

            <Input
              ref={code}
              focusBorderColor="teal.900"
              name="code"
              autoComplete="off"
            />

            <Button
              type={"submit"}
              mt="4"
              colorScheme="teal"
              justifyContent={"end"}
              display={"block"}
              variant="outline"
              _hover={{
                bg: "teal.900",
              }}
            >
              Submit
            </Button>
            <Stack p={32}>
              {fileLink ? (
                <a
                  target="_blank"
                  rel="noreferrer"
                  color={"teal"}
                  href={fileLink}
                  download
                >
                  Click to download file
                </a>
              ) : (
                ""
              )}
            </Stack>
          </form>
        </Card>
      </Container>
    </>
  );
}

export default Download;
