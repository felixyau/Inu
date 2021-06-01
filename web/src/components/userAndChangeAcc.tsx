import { Flex } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface UserAndChangeAccProps {}

export const UserAndChangeAcc: React.FC<UserAndChangeAccProps> = ({}) => {
  let userId = 1;
  return (
    <Flex>
      <div>UserIcon</div>
      <Flex direction="column">
        <NextLink href="/user/[id]" as={`/user/${userId}`}></NextLink>
      </Flex>
    </Flex>
  );
};
