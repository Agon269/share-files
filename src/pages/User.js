import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth";
import app from "../firebase";
import Card from "../components/Card";
import { withRouter } from "react-router-dom";

import { Button, Center, Box } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Loading from "../components/Loading";
import Header from "../components/Header";

const db = app.firestore();

const User = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fileRefs = await db.collection("files");
      const snap = await fileRefs.where("uid", "==", currentUser.uid).get();

      let arr = [];

      snap.forEach((doc) => {
        arr.push({ data: doc.data(), code: doc.id });
      });

      setUploads(arr);

      setLoading(false);
    };

    fetchData();
  }, [currentUser]);

  if (loading) {
    return <Loading />;
  }
  if (!uploads || uploads.length === 0) {
    return (
      <>
        <Header />
        <Card>
          <h2>You haven't uploaded any files yet.</h2>
          <Button
            mt={"4"}
            colorScheme={"teal"}
            onClick={() => {
              history.push("/upload");
            }}
          >
            Click here to upload files
          </Button>
        </Card>
      </>
    );
  }
  const table = (uploads) => {
    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>File name</Th>
            <Th>Date of upload</Th>
            <Th isNumeric>Download link</Th>
          </Tr>
        </Thead>

        <Tbody>
          {uploads.map((upload) => {
            return (
              <Tr key={upload.code}>
                <Td>{upload.data.name}</Td>
                <Td>{upload.data?.date}</Td>
                <Td>{upload.code}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    );
  };
  return (
    <>
      <Header />
      <Center py={"42"}>
        <Box>{table(uploads)}</Box>
      </Center>
    </>
  );
};

export default withRouter(User);
