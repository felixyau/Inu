import { Flex, Box, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { NameAndDescription } from "../NameAndDescription";
import { UserIcon } from "../UserIcon";
import { PostSnippetFragment } from "../../generated/graphql";
import { EditDelete } from "../EditAndDelete";

interface HeaderProps {
  post: PostSnippetFragment;
}

export const Header: React.FC<HeaderProps> = ({ post }) => {
  const creator = post.creator;
  return (
    <Flex width="100%" padding="16px 0" zIndex={1}>
      <Flex mr="12px" align="center">
        <UserIcon
          src={creator.icon}
          size="32px"
          userId={creator.id}
        />
      </Flex>
      <Flex minWidth="68%" align="center">
          <NextLink href="/user/[id]" as={`/user/${creator.id}`}>
            <Link className="boldFont">{creator.username}</Link>
          </NextLink>
      </Flex>
      <EditDelete post={post} creator={post.creator}/>
      <Flex align="center" ml="auto">
        <NextLink href="/user/[id]" as={`/user/${creator.icon}`}>
          <Link fontSize=".5rem">Follow</Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};
