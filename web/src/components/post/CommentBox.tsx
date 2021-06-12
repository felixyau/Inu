import { ApolloCache } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/react";
import { Formik } from "formik";
import React, { ChangeEvent } from "react";
import { gql } from "urql";
import {
  AddCommentMutation,
  PostSnippetFragment,
  useAddCommentMutation,
} from "../../generated/graphql";
import { comments } from "../../utilities/types";

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

interface CommentBoxProps {
  post: PostSnippetFragment;
}

export const CommentBox: React.FC<CommentBoxProps> = ({ post }) => {
  const [addComment] = useAddCommentMutation();
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    text: string
  ) => {
    addComment({
      variables: { postId: post.id, text },
      update: (cache, result) => {
        if (result.data?.addComment)
          updateAfterAddComment(cache, post, result.data?.addComment);
      },
    });
    e.currentTarget.value;
  };

  const changeHeight = (e: ChangeEvent) => {
    e.target.setAttribute("style", "height:'auto'");
    const scrollHeight = e.target.scrollHeight;
    e.target.setAttribute("style", `height:${scrollHeight}px`); //Why state Height doesn't work
  };

  return (
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
                rows={1}
                style={{ height: "18px" }}
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
            <button
              style={{ opacity: disable ? 0.3 : 1, padding: "8px 0 8px 16px" }}
              disabled={disable}
              type="submit"
              onClick={(e) => handleClick(e, values.text)}
            >
              post
            </button>
          </form>
        );
      }}
    </Formik>
  );
};
