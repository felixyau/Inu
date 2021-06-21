import { Box, Flex, Link, Spacer } from "@chakra-ui/react";
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
      <Flex mr="18px" align="center" maxWidth="10%">
        <UserIcon size="32px" userId={comment.commentor.id} src={comment.commentor.icon}/>
      </Flex>
      <Box width="70%">
      <TopComments comment={comment}/>
      </Box>
      <Flex align="center" ml="auto">
        <NextLink href="/user/[id]" as={`/user/${comment.commentor.id}`}>
          <Link fontSize=".5rem">Follow</Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};
