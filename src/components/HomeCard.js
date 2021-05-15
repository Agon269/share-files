import { Box, Center, Stack, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import Download from "../components/Download";
import { firebase } from "../firebase";
import { nanoid } from "nanoid";
import db from "../firebase";
export default function SocialProfileSimple() {
  const [usage, setUsage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const done = (file) => {
    setUploadedFile(file);
  };
  const choose = () => {
    if (usage === null) {
      return null;
    } else if (usage === "download") {
      return <Download />;
    } else if (usage === "upload") {
      return <FileUpload done={done} />;
    }
  };
  const upload = async (acceptedFiles) => {
    let bucketName = "files";
    let file = acceptedFiles;
    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
    await storageRef.put(file);

    let download = await storageRef.getDownloadURL();
    let code = nanoid();
    let coded = {
      link: download,
      code,
      name: file.name,
    };
    const res = await db.collection("downloadlinks").add({ coded });

    setDownloadLink(res.id);
  };
  const uploadFile = async () => {
    await upload(uploadedFile);
  };
  return (
    <Center py={"42"}>
      <Box
        maxW={"500px"}
        w={"full"}
        height={"96"}
        alignContent={"center"}
        boxShadow={"2xl"}
        rounded={"lg"}
        borderWidth={"thin"}
        variant={"outline"}
        borderColor={"gray.300"}
        p={6}
        textAlign={"center"}
      >
        <Stack align={"center"} justify={"center"} direction={"row"}>
          {choose()}
        </Stack>

        <Stack>
          {uploadedFile ? (
            <>
              <Text>{uploadedFile.name}</Text>{" "}
              <Button onClick={uploadFile} colorScheme={"teal"}>
                do you want to upload
              </Button>
            </>
          ) : (
            ""
          )}
        </Stack>
        <Stack>{downloadLink ? <Text>{downloadLink}</Text> : ""}</Stack>
        <Stack mt={"20"} direction={"row"} spacing={4}>
          <Button
            bg="teal.700"
            flex="1"
            mr="4"
            onClick={() => {
              setUsage("upload");
            }}
          >
            Upload
          </Button>
          <Button flex="1" bg="teal.700" onClick={() => setUsage("download")}>
            Download
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
