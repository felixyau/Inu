import {
  Box, Flex, Text
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, {
  useState
} from "react";
import {
  PostSnippetFragment, useMeQuery
} from "../../generated/graphql";
import { IndexModal } from "../IndexModal";
import { CommentBox } from "./CommentBox";
import { PostText } from "./PostText";
import { TopComments } from "./TopComments";



interface UserInteractionProps {
  post: PostSnippetFragment;
}

export const UserInteraction: React.FC<UserInteractionProps> = ({ post }) => {
  const { data: meData } = useMeQuery();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const onClose = () => {
    setOpen(false);
    router.push("/")
  }

  return (
    <>
      <IndexModal onClose={onClose} open={open} post={post}/>
      <Flex p="0" direction="column">
        <Box mb="8px">{post.points} likes</Box>
        <Flex direction="column">
          <PostText post={post} />
          <NextLink href={`/?id=${post.id}`} as={`/post/${post.id}`}>
            <Box as="a" style={{ cursor: "pointer" }} className="grayFont">
              <button onClick={() => setOpen(true)}> 
              View all {post.comments ? post.comments.length : 0} comments
              </button>
            </Box>
          </NextLink>
          <>
            {post.comments
              ? post.comments
                  .filter((comments) => comments.commentor.id !== meData?.me?.id)
                  .slice(0, 2)
                  .map((comment) => {
                    return <TopComments key={comment.id} comment={comment} />;
                  })
              : null}

            {post.comments && !!meData
              ? post.comments
                  .filter((comment) => comment.commentor?.id === meData?.me?.id)
                  .map((comment) => (
                    <TopComments key={comment.id.toString()} comment={comment} />
                  ))
              : null}
          </>
          <Text className="smallFont grayFont">{post.createdAt}</Text>
        </Flex>
      </Flex>
      <CommentBox post={post} />
    </>
  );
};
