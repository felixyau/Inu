import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { PostAction } from "../components/postAction";
import { PostContent } from "../components/postContent";
import { UpdootSession } from "../components/UpdootSession";
import {

  PostQuery,
  usePostsQuery,
} from "../generated/graphql";
import { withApollo } from "../utilities/withApollo";

const Index = () => {
  const { data, error, loading, fetchMore, variables, updateQuery } = usePostsQuery({
    variables: {
      limit: 2,
      cursor: "",
    },
    notifyOnNetworkStatusChange : true,
  });
  

  console.log("data:",data);
  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      {!data && loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Stack spacing={5} m={"auto"} mt={5} padding={0} width="450pt">
            {data!.posts.posts.map((post) => (
              <Flex
                key={post.id}
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
              >
                <UpdootSession post={post} />
                <PostContent creator={post.creator} post={post} />
                <PostAction creator={post.creator} post={post} />
              </Flex>
            ))}
          </Stack>
          <Button
          isLoading = {loading}
            hidden={!data?.posts.hasMore}
            onClick={() => {
              fetchMore({variables:{
                limit: variables?.limit,
                cursor:
                  data!.posts.posts[data!.posts.posts.length - 1].createdAt,
              }
              });
            }}
          >
            Load more
          </Button>
        </>
      )}
    </>
  );
};

export default withApollo({ ssr : true })(Index);
