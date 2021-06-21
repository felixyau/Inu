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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
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

import { useRouter } from "next/router";
import { IndexModal } from "../IndexModal";


interface UserInteractionProps {
  post: PostSnippetFragment;
}

export const UserInteraction: React.FC<UserInteractionProps> = ({ post }) => {
  const { data: meData } = useMeQuery();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const onClose = () => {
    setOpen(false);
    router.push("/")
  }

  return (
    <>
      <IndexModal onClose={onClose} open={open} post={post}/>
      <Flex p="0" direction="column">
        <Box mb="8px">{post.points} likes</Box>
        <Flex direction="column">
          <PostText post={post} />
          <NextLink href={`/?id=${post.id}`} as={`/post/${post.id}`}>
            <Box as="a" style={{ cursor: "pointer" }} className="grayFont">
              <button onClick={() => setOpen(true)}> 
              View all {post.comments ? post.comments.length : 0} comments
              </button>
            </Box>
          </NextLink>
          <>
            {post.comments
              ? post.comments
                  .filter((comments) => comments.commentor.id !== meData?.me?.id)
                  .slice(0, 2)
                  .map((comment) => {
                    return <TopComments key={comment.id} comment={comment} />;
                  })
              : null}

            {post.comments && !!meData
              ? post.comments
                  .filter((comment) => comment.commentor?.id === meData?.me?.id)
                  .map((comment) => (
                    <TopComments key={comment.id.toString()} comment={comment} />
                  ))
              : null}
          </>
          <Text className="smallFont grayFont">{post.createdAt}</Text>
        </Flex>
      </Flex>
      <CommentBox post={post} />
    </>
  );
};
