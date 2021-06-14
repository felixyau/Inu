import { DeleteIcon, EditIcon, Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { PostAction } from "../components/post/PostAction";
import { PostContent } from "../components/post/postContent";
import { UpdootSession } from "../components/UpdootSession";
import { PostQuery, usePostsQuery } from "../generated/graphql";
import { withApollo } from "../utilities/withApollo";
import { HiOutlineAnnotation } from "react-icons/hi";
import { useRouter } from "next/router";
import { UserAndChangeAcc } from "../components/userAndChangeAcc";
import { SuggestedUser } from "../components/SuggestedUser";
import { Header } from "../components/post/Header";
import { UserInteraction } from "../components/post/UserInteraction";
import Modal from "react-modal";
import { Layout } from "../components/Layout";
import {CloudWidget} from "../components/CloudWidget";

Modal.setAppElement("#__next");
const customStyles = {
  content: {
    width: "60%",
    position: "relative",
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgba(0,0,0,.5)",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center"
  },
};

const Index = () => {
  
  const { data, error, loading, fetchMore, variables, updateQuery } =
    usePostsQuery({
      variables: {
        limit: 10,
        cursor: "",
      },
      notifyOnNetworkStatusChange: true,
      skip: typeof window === "undefined",
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
    <Layout>
      <Modal
        isOpen={!!router.query.id}
        onRequestClose={() => router.back()}
        className=""
      >
        <Flex>Hi</Flex>
      </Modal>
      <Flex>
        <Flex maxWidth="935px" width="95%" pt="30px" m="0 auto">
          <Box className="container" width="68%" mr="28px">
            {!data && loading ? (
              <Box>Loading...</Box>
            ) : (
              <>
                <Stack spacing="60px" padding={0}>
                  {data!.posts.posts.map((post) => (
                    <Box key={post.id}>
                      <Flex
                        
                        shadow="md"
                        borderWidth="1px"
                        borderRadius="md"
                        direction="column"
                      >
                        <Box padding="0 16px">
                        <Header post={post}/>
                        </Box>
                        <PostContent post={post} />
                        <Flex direction="column" p="0 16px">
                        <PostAction post={post}/>
                        <UserInteraction post={post} />
                        </Flex>
                      </Flex>
                    </Box>
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
            <SuggestedUser />
          </Box>
        </Flex>
      </Flex>
      </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
