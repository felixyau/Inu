import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import React, {
  ChangeEvent,
  FormEvent,
  HtmlHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AddCommentMutation,
  Comments,
  Maybe,
  PostSnippetFragment,
  useAddCommentMutation,
  useMeQuery,
} from "../../generated/graphql";
import { Collapse } from "react-collapse";
import NextLink from "next/link";
import { PostText } from "./PostText";
import { Formik, useField } from "formik";
import { TopComments } from "./TopComments";
import { ApolloCache, gql } from "@apollo/client";
import { comments } from "../../utilities/types";
import { CommentBox } from "./CommentBox";


interface UserInteractionProps {
  post: PostSnippetFragment;
}

export const UserInteraction: React.FC<UserInteractionProps> = ({ post }) => {
  const meData = useMeQuery();

  return (
    <>
      <Flex p="0" direction="column">
        <Box mb="8px">{post.points} likes</Box>
        <Flex direction="column">
          <PostText post={post} />
          <NextLink href={`/?id=${post.id}`} as={`/post/${post.id}`}>
          <Box as="a" style={{cursor: "pointer"}} className="grayFont">
            View all {post.comments ? post.comments.length : 0} comments
          </Box>
          </NextLink>
          <>
            {post.comments
              ? post.comments.slice(0, 2).map((comment) => {
                  return <TopComments key={comment.id} comment={comment} />;
                })
              : null}

            {post.comments && !!meData
              ? post.comments
                  .filter(
                    (comment) =>
                      comment.commentor?.id === meData.data?.me?.id
                  )
                  .map((comment) => <TopComments key={comment.id} comment={comment}/>)
              : null}
          </>
          <Text className="smallFont grayFont">{post.createdAt}</Text>
        </Flex>
      </Flex>
      <CommentBox post={post}/>
    </>
  );
};
