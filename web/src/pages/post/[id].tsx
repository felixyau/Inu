import { Box, Divider, Flex, Stack, Image, calc } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { Router, useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { createUrqClient } from "../../utilities/CreateUqrlClient";
import { getPostFromUrl } from "../../utilities/getPostFromUrl";
import { withApollo } from "../../utilities/withApollo";
import { Header } from "../../components/post/Header";
import { TopComments } from "../../components/post/TopComments";
import { AllComments } from "../../components/post/AllComments";

interface PostProps {}

const Post: NextPage = ({}) => {
  //what is next page
  const { data, error, loading } = getPostFromUrl();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data?.post) return <div>couldn't find the post</div>;

  return (
    <Layout>
      <Flex maxWidth="935px" width="95%" pt="30px" m="0 auto">
        <Flex shadow="md" borderWidth="1px" borderRadius="md">
          <Box width="600px">
            <Image
              src="data:image/jpeg;base64,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"
              alt="a dog"
              width="100%"
            ></Image>
          </Box>
          <Flex width="335px" direction="column">
            <Header/>
            <Flex direction="column" overflow="hidden" height="calc(100% - 32px)">
            {data.post.comments
              ? data.post.comments.map((comment) => {
                  return <AllComments comment={comment} />;
                })
              : null}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
