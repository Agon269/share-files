import React, { useState } from "react";
import { Button, Box, Container, SimpleGrid } from "@chakra-ui/react";
import FileUpload from "../components/FileUpload";
import Download from "../components/Download";
import Logout from "../components/Logout";
// import Footer from "../components/Footer";
function Home() {
  const [usage, setUsage] = useState(null);

  const choose = () => {
    if (usage === null) {
      return null;
    } else if (usage === "download") {
      return <Download />;
    } else if (usage === "upload") {
      return <FileUpload />;
    }
  };

  return (
    <>
      <Logout />
      <Container p={8}>
        <SimpleGrid columns={1} spacing={40}>
          <Box height="80px">{choose()}</Box>
          <Box height="20px"></Box>
          <Box height="80px" align={"center"} justify={"center"}>
            <Button
              bg="teal.700"
              mr="4"
              onClick={() => {
                setUsage("upload");
              }}
            >
              Upload
            </Button>
            <Button bg="teal.700" onClick={() => setUsage("download")}>
              Download
            </Button>
          </Box>
          <Box height="2px"></Box>
        </SimpleGrid>
      </Container>
    </>
  );
}

export default Home;
{
  /* <FileUpload />
        <Download /> */
}
