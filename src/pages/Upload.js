import React, { useState } from "react";
import { Text, Stack, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { firebase } from "../firebase";
import db from "../firebase";

import Card from "../components/Card";
import DropZone from "../components/DropZone";
//================================================================
function Upload({ done }) {
  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const toast = useToast();

  //setting the file to the uploaded state to display name and verify
  const uploaded = (file) => {
    setFile(file);
  };
  const upload = async (acceptedFiles) => {
    let bucketName = "files";
    let file = acceptedFiles;
    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
    await storageRef.put(file);
    let download = await storageRef.getDownloadURL();

    let readyFile = {
      link: download,
      name: file.name,
    };
    const res = await db.collection("downloadlinks").add({ readyFile });

    setDownloadLink(res.id);
  };
  const uploadFile = async () => {
    try {
      await upload(file);
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
    <Card>
      <DropZone done={uploaded} />
      <Stack>{downloadLink ? <Text>{downloadLink}</Text> : ""}</Stack>
      <Stack>
        {file ? (
          <>
            <Text>{file.name}</Text>{" "}
            <Button onClick={uploadFile} bg="teal.700">
              do you want to upload
            </Button>
          </>
        ) : (
          ""
        )}
      </Stack>
    </Card>
  );
}

export default Upload;
