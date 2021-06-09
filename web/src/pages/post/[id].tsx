import { Box, Divider, Flex, Stack, Image, calc } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { Router, useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { PostSnippetFragment, usePostQuery } from "../../generated/graphql";
import { createUrqClient } from "../../utilities/CreateUqrlClient";
import { getPostFromUrl } from "../../utilities/getPostFromUrl";
import { withApollo } from "../../utilities/withApollo";
import { Header } from "../../components/post/Header";
import { TopComments } from "../../components/post/TopComments";
import { AllComments } from "../../components/post/AllComments";
import { PostAction } from "../../components/post/PostAction";

const Post: NextPage = ({}) => {
  //what is next page
  const { data, error, loading } = getPostFromUrl();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data?.post) return <div>couldn't find the post</div>;

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
              src="https://wallpaperaccess.com/full/3446908.jpg"
              alt="a dog"
              width="100%"
              objectFit="cover"
              maxHeight="100%"
            ></Image>
          </Box>
          <Flex width="335px" direction="column">
            <Header />
            <Flex direction="column" maxHeight="372px">
                <Flex
                  className="commentSession"
                  direction="column"
                  
                >
                  {data.post.comments
                    ? data.post.comments.map((comment) => {
                        return <AllComments comment={comment} />;
                      })
                    : null}
                </Flex>
              <PostAction post={data.post}/>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
