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
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { PostAction } from "../components/post/PostAction";
import { PostContent } from "../components/post/postContent";
import { UpdootSession } from "../components/UpdootSession";
import { PostQuery, useMeQuery, usePostsQuery, useUserProfileQuery } from "../generated/graphql";
import withApollo from "../utilities/withApollo"; //withApollo alias with function in next-apollo
import { HiOutlineAnnotation } from "react-icons/hi";
import { useRouter } from "next/router";
import { UserAndChangeAcc } from "../components/userAndChangeAcc";
import { SuggestedUser } from "../components/SuggestedUser";
import { Header } from "../components/post/Header";
import { UserInteraction } from "../components/post/UserInteraction";
import { Layout } from "../components/Layout";
import { CloudWidget } from "../components/CloudWidget";
import { Login } from "./login";
import { IndexModal } from "../components/IndexModal";
import login from "./login";

// const userContext = React.createContext(userData.userProfile);
const Index = () => {
  const {data:meData, error:meError, loading:meLoading} = useMeQuery();
  const router = useRouter();
  const { data, error, loading, fetchMore, variables, updateQuery } =
    usePostsQuery({
      variables: {
        limit: 10,
        cursor: "",
      },
      notifyOnNetworkStatusChange: true,
      // skip: typeof window === "undefined", ??
    });
  
  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{JSON.stringify(error, null, 2)}</div>
      </div>
    );
  }

  if (!meLoading && !meData) {
    return (
      <div>
        <div>error</div>
        <div>{error?.message}</div>
      </div>
    );
  }
  return (
    !meData?.me ? <Login/> :
    (
    <Layout>
      {/* <Modal
        isOpen={!!router.query.id}
        onRequestClose={() => router.back()}
        className=""
      >
        <Flex>Hi</Flex>
      </Modal> */}
      <Flex>
        <Flex className="container">
          <Flex className="postSession">
            {(!data && loading)? (
              <Box>Loading...</Box>
            ) : (
              <>
                <Stack className="postStack" spacing={{base:"10px", lg:"60px"}} padding={0}>
                  {data!.posts.posts.map((post) => (
                    <Box key={post.id}>
                      <Flex
                        className="card"
                        direction="column"
                      >
                        <Box padding="0 16px">
                          <Header post={post} />
                        </Box>
                        <PostContent post={post} />
                        <Flex direction="column" p="0 16px">
                          <PostAction post={post} />
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
          </Flex>
          <Box className="socialSession">
            <UserAndChangeAcc user={meData.me}/>
            <SuggestedUser user={meData.me}/>
          </Box>
        </Flex>
      </Flex>
    </Layout>)
  );
};

export default withApollo({ ssr: true })(Index);
