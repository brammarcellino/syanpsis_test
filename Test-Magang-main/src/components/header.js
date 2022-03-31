import React from "react";
import {
  Heading,
  Flex,
} from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      as="nav"
      align="left"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="black"
    >
      <Flex align="left" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          form pendaftaran
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Header;