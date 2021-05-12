import React from "react";
import { Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
function Footer() {
  return (
    <div>
      <Text size={"sm"} textAlign={"center"} mt={"-16"}>
        Powered by chakra ui <StarIcon color="teal.600" />
      </Text>
    </div>
  );
}

export default Footer;
