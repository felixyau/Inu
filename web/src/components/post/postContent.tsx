import {
  Link,
  Heading,
  Box,
  Text,
  Container,
  Flex,
  Grid,
  Spacer,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NextLink from "next/link";
import { Post, PostSnippetFragment, User } from "../../generated/graphql";
import { FriendsDesciption } from "../FriendsDesciption";
import { PostAction } from "./PostAction";

interface PostContentProps {
  post: PostSnippetFragment,
}

export const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <Flex direction="column">
      <Image
        width="100%"
        src={`${post.photo}`}
        alt="a dog"
        objectFit="cover"
        maxHeight="614px"
      />
      
    </Flex>
  );
};
