import { ApolloCache, gql } from "@apollo/client";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import {
  Post,
  PostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from "../generated/graphql";

interface UpdootSessionProps {
  post: PostSnippetFragment;
}

const updateAfterVote = (
  cache: ApolloCache<VoteMutation>,
  post: PostSnippetFragment,
  value: number
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: "Post:" + post.id,
    fragment: gql`
      fragment __ on Post {
        id
        points
        voteStatus
      }
    `,
  });
  cache.writeFragment({
    id: "Post:" + post.id,
    fragment: gql`
      fragment __ on Post {
        points
        voteStatus
      }
    `,
    data: {
      points: data?.points! + (!!data?.voteStatus ? 2 : 1) * value,
      voteStatus: value,
    },
  });
};

export const UpdootSession: React.FC<UpdootSessionProps> = ({ post }) => {
  const [vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={2}>
      <IconButton
        colorScheme={post.voteStatus === 1 ? "telegram" : undefined}
        onClick={() =>
          vote({
            variables: { value: 1, postId: post.id },
            update: (cache) => updateAfterVote(cache, post, 1),
          })
        }
        aria-label="updoot post"
        icon={<ChevronUpIcon />}
      />
      {post.points}

      <IconButton
        colorScheme={post.voteStatus === -1 ? "pink" : undefined}
        onClick={() =>
          vote({
            variables: { value: -1, postId: post.id },
            update: (cache) => updateAfterVote(cache, post, -1),
          })
        }
        aria-label="downdoot post"
        icon={<ChevronDownIcon />}
      />
    </Flex>
  );
};
