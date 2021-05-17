import React, { useCallback, useContext } from "react";
import Form from "../components/Form";
import { auth } from "../firebase";
import { AuthContext } from "../Auth";
import { useToast } from "@chakra-ui/toast";
import { Redirect, withRouter } from "react-router-dom";
import { handleValidation } from "../components/Validate";

function Signin({ history }) {
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
          await auth.createUserWithEmailAndPassword(
            value.email,
            value.password
          );
          history.push("/");
        } catch (err) {
          toast({
            title: err.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      }
    },
    [history, toast]
  );
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Form content={content} onSubmitHandler={onSubmitHandler} />
    </div>
  );
}
export default withRouter(Signin);
