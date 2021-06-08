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
  UsernameAndId,
} from "../../generated/graphql";
import { Collapse } from "react-collapse";
import NextLink from "next/link";
import { PostText } from "./PostText";
import { Formik, useField } from "formik";
import { TopComments } from "./TopComments";
import { ApolloCache, gql } from "@apollo/client";

interface UserInteractionProps {
  post: PostSnippetFragment;
}

type comments = Pick<Comments, "text"> & {
  commentor?: Maybe<
    { __typename?: "usernameAndId" } & Pick<
      UsernameAndId,
      "username" | "userId"
    >
  >;
};

const updateAfterAddComment = (
  cache: ApolloCache<AddCommentMutation>,
  post: PostSnippetFragment,
  commentData: comments
) => {
  const data = cache.readFragment<{
    id: number;
    comments: comments[];
  }>({
    id: "Post:" + post.id,
    fragment: gql`
      fragment _ on Post {
        id
        comments
      }
    `,
  });

  let realData: comments[];
  realData = [...data!.comments, commentData]; //assume incorrect postId is the only case that fragment is not in cache and so data return null

  cache.writeFragment({
    id: "Post:" + post.id,
    fragment: gql`
      fragment _ on Post {
        comments
      }
    `,
    data: { comments: realData },
  });
};

export const UserInteraction: React.FC<UserInteractionProps> = ({ post }) => {
  const [height, setHeight] = useState<string | number>("18px");
  const textInput = useRef<HTMLTextAreaElement>(null);
  const [addComment] = useAddCommentMutation();
  const meData = useMeQuery();

  function handleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    text: string
  ) {
    addComment({
      variables: { postId: post.id, text },
      update: (cache, result) => {
        if (result.data?.addComment)
          updateAfterAddComment(cache, post, result.data?.addComment);
      },
    });
    e.currentTarget.value;
  }

  const changeHeight = (e: ChangeEvent) => {
    e.target.setAttribute("style", "height:'auto'");
    const scrollHeight = e.target.scrollHeight;
    e.target.setAttribute("style", `height:${scrollHeight}px`); //Why state Height doesn't work
  };

  return (
    <>
      <Flex p="0 16px" direction="column">
        <Box mb="8px">{post.points} likes</Box>
        <Flex direction="column">
          <PostText post={post} />
          <Box color="rgba(142,142,142,1)">
            View all {post.comments ? post.comments.length : 0} comments
          </Box>
          <>
            {post.comments
              ? post.comments.slice(0, 2).map((comment) => {
                  return <TopComments comment={comment} />;
                })
              : null}

            {post.comments && !!meData
              ? post.comments
                  .filter(
                    (comment) =>
                      comment.commentor?.userId === meData.data?.me?.id
                  )
                  .map((comment) => <TopComments comment={comment}/>)
              : null}
          </>
        </Flex>
      </Flex>

      <Formik
        initialValues={{ text: "" }}
        onSubmit={(value) => {
          console.log("value:", value);
        }}
      >
        {({
          isSubmitting,
          handleChange,
          values,
          handleSubmit,
          setSubmitting,
          setValues,
        }) => {
          //const [disable, setDisable] = useState(false);
          const disable = isSubmitting || !values.text.trim();
          return (
            <form
              className="commentBox"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
                setSubmitting(false);
                setValues({ text: "" });
              }}
            >
              <Box p="8px 16px 8px 0">Emoji</Box>
              <Flex align="center" width="100%">
                <textarea
                  ref={textInput}
                  rows={1}
                  style={{ height }}
                  className="commentInput"
                  name="text"
                  placeholder="comment"
                  onChange={(e: ChangeEvent) => {
                    handleChange(e);
                    changeHeight(e);
                  }}
                  value={values.text}
                ></textarea>
              </Flex>
              <Button
                opacity={disable ? 0.3 : 1}
                disabled={disable}
                p="8px 0 8px 16px"
                type="submit"
                onClick={(e) => handleClick(e, values.text)}
              >
                post
              </Button>
            </form>
          );
        }}
      </Formik>
    </>
  );
};
