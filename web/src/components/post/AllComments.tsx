import { Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { comments } from "../../utilities/types";
import { NameAndDescription } from "../NameAndDescription";
import { UserIcon } from "../UserIcon";
import { TopComments } from "./TopComments";
interface AllCommentsProps {
  comment: comments
}
export const AllComments: React.FC<AllCommentsProps> = ({ comment }) => {
  return (
    <Flex width="100%" mb="16px" zIndex={1}>
      <Flex mr="12px" align="center">
        <UserIcon size="32px" userId={comment.commentor.id} src={comment.commentor.icon}/>
      </Flex>
      <TopComments comment={comment}/>
      <Flex align="center" ml="auto">
        <NextLink href="/user/[id]" as={`/user/${comment.commentor.id}`}>
          <Link fontSize=".5rem">Follow</Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};
