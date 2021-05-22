import React, { useCallback, useContext, useState } from "react";
import Form from "../components/Form";
import app from "../firebase";
import { AuthContext } from "../Auth";
import { ScaleFade } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Redirect, withRouter } from "react-router-dom";
import { handleValidation } from "../components/Validate";
import Loading from "../components/Loading";

function Signin({ history }) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const content = {
    title: "Sign up",
    subtit: "Share your files using random emails✌️",
    button: "Sign up",
    linkContent: "Already have an",
    link: "account",
    to: "/signin",
  };

  const onSubmitHandler = useCallback(
    async (value) => {
      if (handleValidation(value) !== true) {
        let error = handleValidation(value);
        toast({
          title: error.error,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        try {
          setLoading(true);
          app
            .auth()
            .createUserWithEmailAndPassword(value.email, value.password)
            .then(() => {
              setLoading(false);
              history.push("/");
            });
        } catch (err) {
          toast({
            title: err.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          setLoading(false);
        }
      }
    },
    [history, toast]
  );

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <ScaleFade initialScale={0.6} in={true}>
      <Form content={content} onSubmitHandler={onSubmitHandler} />
    </ScaleFade>
  );
}
export default withRouter(Signin);
