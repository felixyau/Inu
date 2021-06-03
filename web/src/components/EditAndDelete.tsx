import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Link, Heading, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import {
  Post,
  useDeletePostMutation,
  useMeQuery,
  User,
} from "../generated/graphql";

interface postActionProps {
  post: Pick<
    Post,
    | "title"
    | "id"
    | "createdAt"
    | "updatedAt"
    | "points"
    | "voteStatus"
    | "text"
  >;
  creator: Pick<User, "id" | "username">;
}

export const PostAction: React.FC<postActionProps> = ({ creator, post }) => {
  const { data: meData } = useMeQuery();
  const [deletePost] = useDeletePostMutation();
  return (
    <Box  ml={"auto"}>
      <Box hidden={!(meData?.me?.id === creator.id)}>
        <IconButton
          onClick={() =>
            deletePost({
              variables: { id: post.id },
              update: (cache) => {
                cache.evict({ id: "Post:" + post.id });
              },
            })
          }
          aria-label="delete-post"
          icon={<DeleteIcon />}
        ></IconButton>
        <NextLink href="post/edit/[id]" as={`post/edit/${post.id}`}>
          <IconButton
            as={Link}
            aria-label="edit-post"
            icon={<EditIcon />}
          ></IconButton>
        </NextLink>
      </Box>
    </Box>
  );
};
