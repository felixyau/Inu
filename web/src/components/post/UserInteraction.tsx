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
  UsernameAndId,
} from "../../generated/graphql";
import { Collapse } from "react-collapse";
import NextLink from "next/link";
import { PostText } from "./postText";
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

const updateAfterVote = (
  cache: ApolloCache<AddCommentMutation>,
  post: PostSnippetFragment,
  newText: string
) => {
  const data = cache.readFragment<{
    id: number;
    comments: comments;
  }>({
    id: "Post:" + post.id,
    fragment: gql`
      fragment __ on Post {
        id
        comments
      }
    `,
  });
  let realData: {
    comments:comments
  };
  const newComment:comments = {
    text: newText,
    commentor: {
      userId: 
      username: 
    }
  }
    realData = {
        comments: [...post.comments?, newComment]
    };

  cache.writeFragment({
    id: "Post:" + post.id,
    fragment: gql`
      fragment __ on Post {
        points
        voteStatus
      }
    `,
    data: realData,
  });
};

export const UserInteraction: React.FC<UserInteractionProps> = ({ post }) => {
  const [height, setHeight] = useState<string | number>("18px");
  const textInput = useRef<HTMLTextAreaElement>(null);
  const [addComment] = useAddCommentMutation();
  function handleClick(e: any, text: string) {
    e.preventDefault();
    addComment({
      variables: { postId: post.id, text },
      update: (cache) => cache.evict({ fieldName: "posts" }),
    });
  }
  // useEffect(() => {
  //   const tx = document.getElementsByTagName("textarea");
  //   console.log(tx);
  //   // for (let i = 0; i < tx.length; i++) {
  //   //   tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow:hidden;");
  //   // }
  //   for (let i = 0; i < tx.length; i++) {
  //     setHeight(tx[i].scrollHeight.toString());
  //   }
  // });
  const changeHeight = (e: ChangeEvent) => {
    setHeight("auto");
    e.target.setAttribute("style", "height:'auto'");
    const scrollHeight = e.target.scrollHeight;
    console.log("scrollheight:", scrollHeight);
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
                  console.log("comment:", comment);
                  return <TopComments comment={comment} />;
                })
              : null}
          </>
        </Flex>
      </Flex>

      <Formik
        initialValues={{ text: "" }}
        onSubmit={(value) => {
          console.log("value:", value);
          //setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleChange, values, handleSubmit }) => {
          //const [disable, setDisable] = useState(false);
          const disable = isSubmitting || !values.text.trim();
          return (
            <form onSubmit={(e) => handleSubmit(e)}>
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
