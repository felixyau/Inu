import { Flex, Link } from "@chakra-ui/react";
import React from "react";
import { NameAndDescription } from "../NameAndDescription";
import { UserIcon } from "../UserIcon";
import NextLink from "next/link";
import { Comments, Maybe, UsernameAndId } from "../../generated/graphql";
import { comments } from "../../utilities/types";
interface AllCommentsProps {
  comment: comments
}
export const AllComments: React.FC<AllCommentsProps> = ({ comment }) => {
  return (
    <Flex width="100%" padding="16px" zIndex={1}>
      <Flex mr="12px" align="center">
        <UserIcon size="32px" />
      </Flex>
      <NameAndDescription />
      <Flex align="center" ml="auto">
        <NextLink href="/user/[id]" as={`/user/${comment.commentor?.userId}`}>
          <Link fontSize=".5rem">Follow</Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};
