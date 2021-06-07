import { DeleteIcon, EditIcon, Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { PostAction } from "../components/EditAndDelete";
import { PostContent } from "../components/post/postContent";
import { UpdootSession } from "../components/UpdootSession";
import { PostQuery, usePostsQuery } from "../generated/graphql";
import { withApollo } from "../utilities/withApollo";
import { HiOutlineAnnotation } from "react-icons/hi";
import { useRouter } from "next/router";
import { UserAndChangeAcc } from "../components/userAndChangeAcc";
import { SuggestedUser } from "../components/SuggestedUser";
import { UsernameAndPicture } from "../components/post/Header";
import { UserInteraction } from "../components/post/UserInteraction";

const Index = () => {
  const { data, error, loading, fetchMore, variables, updateQuery } =
    usePostsQuery({
      variables: {
        limit: 2,
        cursor: "",
      },
      notifyOnNetworkStatusChange: true,
    });
  const router = useRouter();

  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }
  return (
    <Flex className="container">
      <Navbar />
      <Flex justify="center">
      <Flex width="935px" pt="30px">
        <Box className="container" width="68%" mr="28px">
          {!data && loading ? (
            <Box>Loading...</Box>
          ) : (
            <>
              <Stack spacing="60px" padding={0}>
                {data!.posts.posts.map((post) => (
                  <>
                    <Flex
                      key={post.id}
                      shadow="md"
                      borderWidth="1px"
                      borderRadius="md"
                      direction="column"
                    >
                      <UsernameAndPicture/>
                      <PostContent post={post} />
                      <UserInteraction post={post} />
                      {/* <NextLink href="/post/[id]" as={`/post/${post.id}`}>
                        <Flex
                          _hover={{ cursor: "pointer" }}
                          align="center"
                          p={0}
                          m={0}
                          direction="column"
                        >
                          <HiOutlineAnnotation size={22} />
                          <Text fontSize={12} ml={1.5} m={0} p={0}>
                            {post.comments?.length} Comments
                          </Text>
                        </Flex>
                      </NextLink> */}
                    </Flex>
                  </>
                ))}
              </Stack>
              <Button
                m={"auto"}
                isLoading={loading}
                hidden={!data?.posts.hasMore}
                onClick={() => {
                  fetchMore({
                    variables: {
                      limit: variables?.limit,
                      cursor:
                        data!.posts.posts[data!.posts.posts.length - 1]
                          .createdAt,
                    },
                  });
                }}
              >
                Load more
              </Button>
            </>
          )}
        </Box>
        <Box width="35%">
          <UserAndChangeAcc />
          <SuggestedUser/>
        </Box>
      </Flex>
      </Flex>
    </Flex>
  );
};

export default withApollo({ ssr: true })(Index);
