import Logout from "../components/Logout";
import React from "react";
import { withRouter } from "react-router-dom";
import { Stack, Button } from "@chakra-ui/react";

import Card from "../components/Card";
function Home({ history }) {
  return (
    <>
      <Logout />
      <Card>
        <Stack mt={"20"} direction={"row"} spacing={4}>
          <Button
            bg="teal.700"
            flex="1"
            mr="4"
            onClick={() => {
              history.push("/upload");
            }}
          >
            Upload
          </Button>
          <Button
            flex="1"
            bg="teal.700"
            onClick={() => history.push("/download")}
          >
            Download
          </Button>
        </Stack>
      </Card>
    </>
  );
}

export default withRouter(Home);
