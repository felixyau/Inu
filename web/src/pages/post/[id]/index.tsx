import { Box, Divider, Flex, Stack, Image, calc, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { Router, useRouter } from "next/router";
import React from "react";
import { Layout } from "../../../components/Layout";
import { PostSnippetFragment, usePostQuery } from "../../../generated/graphql";
import { createUrqClient } from "../../../utilities/CreateUqrlClient";
import { getPostFromUrl } from "../../../utilities/getPostFromUrl";
import withApollo from "../../../utilities/withApollo";
import { Header } from "../../../components/post/Header";
import { TopComments } from "../../../components/post/TopComments";
import { AllComments } from "../../../components/post/AllComments";
import { PostAction } from "../../../components/post/PostAction";
import { CommentBox } from "../../../components/post/CommentBox";
import { PostFullPage } from "../../../components/PostFullPage";

const Post: React.FC = ({}) => {
  //what is next page
  const { data, error, loading } = getPostFromUrl(); //should be used to skip extra query
  console.log("check if correct data:", data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;
  if (!data?.post) return <div>couldn't find the post</div>;
  const post = data.post;
  console.log("post:",post);

  return (
    <Layout>
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
              <Flex
                className="commentSession"
                direction="column"
                height="372px"
              >
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
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
