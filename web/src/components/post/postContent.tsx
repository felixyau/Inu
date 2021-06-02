import {
  Link,
  Heading,
  Box,
  Text,
  Container,
  Flex,
  Grid,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { Post, User } from "../../generated/graphql";
import { FriendsDesciption } from "../FriendsDesciption";

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
    <Flex>
    
    <Box h="200px" ml={2} pl="40px">
      <Box>
        <NextLink href="/post/[id]" as={`/post/${post.id}`}>
          <Link>
          <Box>
            <Heading fontSize="xl">
              {post.title}
            </Heading>
            <Text>posted by {creator.username}</Text>
            </Box>
          </Link>
          
        </NextLink>
      </Box>
      <Container isTruncated>{post.text}</Container>
    </Box>
    </Flex>
  );
};
