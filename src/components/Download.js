import React, { useState, useRef } from "react";
import { FormLabel, Input, Button, Container } from "@chakra-ui/react";
import db from "../firebase";
import { useToast } from "@chakra-ui/toast";
function Download() {
  const [userDetails, setUserDetails] = useState("");
  const toast = useToast();

  const code = useRef(null);

  const download = async (e) => {
    e.preventDefault();
    console.log("cliker");
    const snap = await db
      .collection("downloadlinks")
      .doc(code.current.value)
      .get();
    let link;
    try {
      link = await snap.data();
      if (!link) {
        toast({
          title: "No such file",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        setUserDetails(link);
      }
    } catch (err) {
      console.log(err);
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
          type="submit"
          colorScheme="teal"
          variant="outline"
          _hover={{
            bg: "teal.900",
          }}
        >
          Submit
        </Button>
        {userDetails ? (
          <a href={userDetails.coded.link} download>
            download
          </a>
        ) : (
          ""
        )}
      </form>
    </Container>
  );
}

export default Download;
