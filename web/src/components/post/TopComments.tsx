import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Comments, Maybe } from "../../generated/graphql";
import NextLink from "next/link";
import { comments } from "../../utilities/types";

interface TopCommentsProps {
  comment: comments
}

export const TopComments: React.FC<TopCommentsProps> = ({ comment }) => {
  return (
    <Box as="span">
      <NextLink href="/user/[id]" as={`/user/${comment.commentor?.id}`}>
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
