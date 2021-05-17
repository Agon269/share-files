import React, { useState, useRef } from "react";
import { FormLabel, Input, Button, Container } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import db from "../firebase";

import Card from "../components/Card";

function Download() {
  const [fileLink, setFileLink] = useState("");
  const toast = useToast();

  const code = useRef(null);

  const download = async (e) => {
    e.preventDefault();
    const snap = await db
      .collection("downloadlinks")
      .doc(code.current.value)
      .get();
    let file;
    try {
      file = await snap.data();
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
  };

  return (
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
            variant="outline"
            _hover={{
              bg: "teal.900",
            }}
          >
            Submit
          </Button>
          {fileLink ? (
            <a href={fileLink} download>
              download
            </a>
          ) : (
            ""
          )}
        </form>
      </Card>
    </Container>
  );
}

export default Download;
