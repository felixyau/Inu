import { ApolloCache } from "@apollo/client";
import { Box, Circle, Flex, Image } from "@chakra-ui/react";
import { Formik } from "formik";
import React, { ChangeEvent } from "react";
import { gql } from "urql";
import {
  AddCommentMutation,
  PostSnippetFragment,
  useAddCommentMutation,
} from "../../generated/graphql";
import { comments } from "../../utilities/types";
import { UserIcon } from "../UserIcon";

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
        # comments {
        #   id
        #   text
        #   commentor {
        #     id
        #     username
        #     icon
        #   }
        # }
      }
    `,
  });
  console.log("data:", data)

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
            <Box p="8px 16px 8px 0">
              <Circle size="40px" bg="white" color="white">
                <Image
                  objectFit="cover"
                  height="100%"
                  width="100%"
                  borderRadius="50%"
                  src="data:image/png;base64,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"
                />
              </Circle>
            </Box>
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
