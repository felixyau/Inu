import { Flex } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "./Navbar";
import { Wrapper, WrapperVariant } from "./Wrapper";

// interface LayoutProps {
//   variant?: WrapperVariant;
// }

export const Layout: React.FC = ({ children }) => {
  return (
    <Flex className="container">
      <Navbar />
      {children}
    </Flex>
  );
};
