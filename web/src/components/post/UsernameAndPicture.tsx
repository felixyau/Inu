import { Flex, Box, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface UsernameAndPictureProps {}

export const UsernameAndPicture: React.FC<UsernameAndPictureProps> = ({}) => {
  let user = {
    id: 1,
  };
  return (
    <Flex border="2px" width="100%">
      <Box mr="12px">UserIcon</Box>
      <Flex direction="column" width="68%">
        <Box>
          <NextLink href="/user/[id]" as={`/user/${user.id}`}>
            <Link>UserName</Link>
          </NextLink>
        </Box>
        <Box>UserFullName</Box>
      </Flex>
      <Flex align="center" border="2px">
        <NextLink href="/user/[id]" as={`/user/${user.id}`}>
          <Link fontSize=".5rem">Follow</Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};
