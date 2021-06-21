import { Box, Divider, Flex, Stack, Image, calc,Text } from "@chakra-ui/react";
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;
  if (!data?.post) return <div>couldn't find the post</div>;

  return (
    <Layout>
      <PostFullPage post={data.post}/>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
