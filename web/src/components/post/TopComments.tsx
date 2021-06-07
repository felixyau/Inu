import { Box, Link } from "@chakra-ui/react";
import React from "react";
import { Comments, Maybe, UsernameAndId } from "../../generated/graphql";
import NextLink from "next/link";

interface TopCommentsProps {
  comment: Pick<Comments, "text"> & {
    commentor?: Maybe<{
        __typename?: "usernameAndId" | undefined;
    } & Pick<UsernameAndId, "username" | "userId">>
}
}

export const TopComments: React.FC<TopCommentsProps> = ({ comment }) => {
console.log("text:",comment.text)
  return (
    <Box as="span">
      <NextLink href="/user/[id]" as={`/user/${comment.commentor?.userId}`}>
        <Link as="samp" float="left">{comment.commentor?.username}</Link>
      </NextLink>
      <Box>
        &nbsp;
        {comment.text}
      </Box>
    </Box>
  );
};
