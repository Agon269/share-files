import React, { useCallback, useContext, useState } from "react";
import Form from "../components/Form";
import { auth } from "../firebase";
import { AuthContext } from "../Auth";
import { useToast } from "@chakra-ui/toast";
import { Redirect, withRouter } from "react-router-dom";
import { handleValidation } from "../components/Validate";
import Loading from "../components/Loading";

function Signin({ history }) {
  const [loading, setLoading] = useState(false);
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
          await auth.signInWithEmailAndPassword(value.email, value.password);
          setLoading(false);
          history.push("/");
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
    <div>
      <Form content={content} onSubmitHandler={onSubmitHandler} />
    </div>
  );
}
export default withRouter(Signin);
