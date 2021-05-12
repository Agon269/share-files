import React from "react";
import ReactDOM from "react-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import App from "./App";

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "#301934",
        color: "white",
      },
      // styles for the `a`
      a: {
        color: "teal.300",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
