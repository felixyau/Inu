import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { PostsDocument, usePostsQuery } from "../generated/graphql";
import { createUrqClient } from "../utilities/CreateUqrlClient";

const Index = () => {
  const [variables, setVariables] = useState({ limit: 2, cursor: "" }); //limit = 1 doesn't work
  const [{ data, fetching }] = usePostsQuery({ variables });
  console.log("data:", data)
  return (
    <>
      <Navbar />
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <>
          <Stack spacing={8}>
            {data!.posts.posts.map((post) => (
              <Box
                key={post.id}
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
              >
                <Heading fontSize="xl">{post.title}</Heading>
                <Text>{post.TextSnippet}</Text>
              </Box>
            ))}
          </Stack>
          <Button hidden={!data?.posts.hasMore}
            onClick={() => {
              console.log("worked");
              console.log("data", data!.posts);
              setVariables({
                limit: 2,
                cursor: data!.posts.posts[data!.posts.posts.length - 1].createdAt,
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

export default withUrqlClient(createUrqClient, { ssr: true })(Index);
