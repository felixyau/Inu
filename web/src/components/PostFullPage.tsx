import { Flex, Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment } from "../generated/graphql";
import { AllComments } from "./post/AllComments";
import { CommentBox } from "./post/CommentBox";
import { Header } from "./post/Header";
import { PostAction } from "./post/PostAction";

interface PostFullPageProps {
  post: PostSnippetFragment;
}

export const PostFullPage: React.FC<PostFullPageProps> = ({ post }) => {
  return (
    <Flex
      maxWidth="834px"
      width="95%"
      pt="30px"
      m="0 auto 16px"
      maxHeight="600px"
    >
      <Flex shadow="md" borderWidth="1px" borderRadius="md">
        <Box width="497px">
          <Image
            src={post.photo}
            alt="a dog"
            width="100%"
            objectFit="cover"
            height="100%"
          ></Image>
        </Box>
        <Flex width="335px" direction="column" p="0 16px">
          <Header post={post} />
          <Flex direction="column">
            <Flex className="commentSession" direction="column" height="372px">
              {post.comments
                ? post.comments.map((comment) => {
                    return <AllComments key={comment.id} comment={comment} />;
                  })
                : null}
            </Flex>
            <PostAction post={post} />
            <Text className="boldFont">{post.points} likes</Text>
            <Text className="smallFont grayFont">{post.createdAt}</Text>
            <CommentBox post={post} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
