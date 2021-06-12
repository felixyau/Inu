import { Box, Flex, Spacer } from "@chakra-ui/react";
import React from "react";
import { Post, PostSnippetFragment } from "../../generated/graphql";
import { HeartIcon } from "../../Icons/HeartIcon";
import { CommentIcon } from "../../Icons/CommentIcon";
import { SaveIcon } from "../../Icons/SaveIcon";
import { ShareIcon } from "../../Icons/ShareIcon";
import { useRouter } from "next/router";

interface PostActionProps {
  post: PostSnippetFragment;
}
export const PostAction: React.FC<PostActionProps> = ({ post }) => {
  const router = useRouter();
  return (
    <Flex p="0" align="stretch" m="0">
      <span>
        <Box ml="-8px">
          <HeartIcon post={post} />
        </Box>
      </span>

      <span>
        <div >
          <button type="button" className="iconBox" onClick={() => router.push(`/post/${post.id}`)}>
            <CommentIcon />
          </button>
        </div>
      </span>

      <span>
        <div>
          <button type="button" className="iconBox">
            <ShareIcon />
          </button>
        </div>
      </span>
      <Spacer />

      <span>
        <Box mr="-8px">
          <button type="button" className="iconBox">
            <SaveIcon />
          </button>
        </Box>
      </span>
    </Flex>
  );
};
