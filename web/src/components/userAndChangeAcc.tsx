import { Box, Circle, Flex, Link, Image, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { UserIcon } from "./UserIcon";
import { NameAndDescription } from "./NameAndDescription";

interface UserAndChangeAccProps {}

export const UserAndChangeAcc: React.FC<UserAndChangeAccProps> = () => {
  const userId = 1;
  return (
    <Flex width="100%">
      <Box mr="12px">
        <UserIcon size="50px"/>
</Box>
      <NameAndDescription/>
      <Flex align="center">
        <NextLink href="/user/[id]" as={`/user/${userId}`}>
          <Link fontSize=".5rem">Change</Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};
