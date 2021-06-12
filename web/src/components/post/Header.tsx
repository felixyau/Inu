import { Flex, Box, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { NameAndDescription } from "../NameAndDescription";
import { UserIcon } from "../UserIcon";
import { PostSnippetFragment } from "../../generated/graphql";

interface HeaderProps {
  post: PostSnippetFragment
}

export const Header: React.FC<HeaderProps> = ({post}) => {
  return (
    <Flex width="100%" padding="16px 0" zIndex={1}>
        <Flex mr="12px" align="center">
          <UserIcon size="32px"/>
        </Flex>
        <NameAndDescription />
      <Flex align="center" ml="auto">
        <NextLink href="/user/[id]" as={`/user/${post.creator.icon}`}>
          <Link fontSize=".5rem">Follow</Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};
