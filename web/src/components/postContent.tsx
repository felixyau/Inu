import {
  Link,
  Heading,
  Box,
  Text,
  Container,
  Flex,
  Grid,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { Post, User } from "../generated/graphql";

interface PostContentProps {
  post: Pick<
    Post,
    | "title"
    | "id"
    | "createdAt"
    | "updatedAt"
    | "points"
    | "voteStatus"
    | "text"
  >;
  creator: Pick<User, "id" | "username">;
}

export const PostContent: React.FC<PostContentProps> = ({ post, creator }) => {
  return (
    <Grid
      h="200px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(2, 1fr)"
      gap={4}
    >
      <Box rowSpan={1} colSpan={1}>
        <NextLink href="/post/[id]" as={`/post/${post.id}`}>
          <Link>
            <Heading fontSize="xl">{post.title}</Heading>
          </Link>
        </NextLink>
      </Box>
      <Box colSpan={1} fontSize={13}>
        posted by {creator.username}
      </Box>
      <Container isTruncated>{post.text}</Container>
    </Grid>
  );
};
