import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface NameAndDescriptionProps {}

export const NameAndDescription: React.FC<NameAndDescriptionProps> = ({}) => {
  let user = {
    id: 1,
  };
  return (
    <Flex direction="column" minWidth="68%">
      <Box>
        <NextLink href="/user/[id]" as={`/user/${user.id}`}>
          <Link fontSize="12px">UserName</Link>
        </NextLink>
      </Box>
      <Box fontSize="12px">UserFullName</Box>
    </Flex>
  );
};
