import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Comments, Maybe, UsernameAndId } from "../../generated/graphql";
import NextLink from "next/link";

interface TopCommentsProps {
  comment: Pick<Comments, "text"> & {
    commentor?: Maybe<
      {
        __typename?: "usernameAndId" | undefined;
      } & Pick<UsernameAndId, "username" | "userId">
    >;
  };
}

export const TopComments: React.FC<TopCommentsProps> = ({ comment }) => {
  return (
    <Box as="span">
      <NextLink href="/user/[id]" as={`/user/${comment.commentor?.userId}`}>
        <Link float="left">
          <Text className="boldFont">{comment.commentor?.username}</Text>
        </Link>
      </NextLink>
      <Box mb="2px">
        <Text>
          &nbsp;
          {comment.text}
        </Text>
      </Box>
    </Box>
  );
};
