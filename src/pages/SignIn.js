import React, { useCallback, useContext } from "react";
import Form from "../components/Form";
import { auth } from "../firebase";
import { AuthContext } from "../Auth";
import { useToast } from "@chakra-ui/toast";
import { Redirect, withRouter } from "react-router-dom";

function Signin({ history }) {
  const toast = useToast();
  const content = {
    title: "Sign in",
    subtit: "Share your files using random emails✌️",
    button: "Sign in",
    linkContent: "Dont have an",
    link: "account",
    to: "/signup",
  };

  const onSubmitHandler = useCallback(
    async (value) => {
      try {
        await auth.signInWithEmailAndPassword(value.email, value.password);
        history.push("/");
      } catch (err) {
        toast({
          title: err.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
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
