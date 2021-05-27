import { Box, Divider, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { Router, useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { createUrqClient } from "../../utilities/CreateUqrlClient";
import { getPostFromUrl } from "../../utilities/getPostFromUrl";
import { withApollo } from "../../utilities/withApollo";

interface PostProps {}

const Post: NextPage = ({}) => {
  //what is next page
  const { data, error, loading } = getPostFromUrl();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (!data?.post) return <div>couldn't find the post</div>;

  return (
    <Layout>
      <Stack spacing={5} m={"auto"} mt={5} padding={0} width="450pt">
        
      </Stack>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
