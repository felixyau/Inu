import { Flex, Box, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { NameAndDescription } from "../NameAndDescription";
import { UserIcon } from "../UserIcon";

interface UsernameAndPictureProps {}

export const UsernameAndPicture: React.FC<UsernameAndPictureProps> = ({}) => {
  let user = {
    id: 1,
  };
  return (
    <Flex width="100%" padding="16px">
        <Flex mr="12px" align="center">
          <UserIcon size="32px"/>
        </Flex>
        <NameAndDescription />
      <Flex align="center" ml="auto">
        <NextLink href="/user/[id]" as={`/user/${user.id}`}>
          <Link fontSize=".5rem">Follow</Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};
