import React, { useState } from "react";
import { Text, Stack, Button } from "@chakra-ui/react";
import { withRouter } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import { firebase } from "../firebase";
import db from "../firebase";

import Header from "../components/Header";
import Card from "../components/Card";
import DropZone from "../components/DropZone";
import Loading from "../components/Loading";
//================================================================
function Upload({ history }) {
  const [loading, setLoading] = useState(false);
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
    console.log(download);
    let readyFile = {
      link: download,
      name: file.name,
    };

    const res = await db.collection("downloadlinks").add({ readyFile });

    setDownloadLink(res.id);
  };
  const uploadFile = async () => {
    try {
      setLoading(true);
      await upload(file);
      setLoading(false);
    } catch (err) {
      toast({
        title: err,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Header />

      <Card>
        <DropZone done={uploaded} />

        {file !== null && downloadLink == null ? (
          <>
            <Text m={3}>{file.name}</Text>{" "}
            <Button onClick={uploadFile} colorScheme={"teal"} m={3}>
              Upload this file ?
            </Button>
          </>
        ) : (
          ""
        )}
        <Stack>
          {downloadLink ? (
            <>
              <Text m={3}>Download Code : {downloadLink}</Text>
              <Button
                variant="solid"
                onClick={() => {
                  setFile(null);
                  setDownloadLink(null);
                }}
              >
                Upload again?
              </Button>
            </>
          ) : (
            ""
          )}
        </Stack>
      </Card>
    </>
  );
}

export default withRouter(Upload);
