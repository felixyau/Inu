import { ApolloCache } from "@apollo/client";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import { gql } from "urql";
import {
  PostSnippetFragment,
  VoteMutation,
  useVoteMutation,
  useMeQuery,
} from "../generated/graphql";

interface HeartIconProps {
  post: PostSnippetFragment;
}

const updateAfterVote = (
  cache: ApolloCache<VoteMutation>,
  post: PostSnippetFragment
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: boolean | null;
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
  let realData: {
    points: number;
    voteStatus: boolean | null;
  };

  if (data?.voteStatus) {
    realData = {
      points: data.points - 1,
      voteStatus: false,
    };
  } else {
    realData = {
      points: data?.points! + 1,
      voteStatus: true,
    };
  }
  cache.writeFragment({
    id: "Post:" + post.id,
    fragment: gql`
      fragment __ on Post {
        points
        voteStatus
      }
    `,
    data: realData,
  });
};

export const HeartIcon: React.FC<HeartIconProps> = ({ post }) => {
  const [vote] = useVoteMutation();
  const router = useRouter();
  const { data: meData } = useMeQuery();

  const handleClick = () => {
  const voting = async ():Promise<void> => {
        const { errors } = await vote({
          variables: { postId: post.id },
          update: (cache) => updateAfterVote(cache, post),
        });
    if (errors) console.log("heart errors");}
    if (!!meData?.me) {console.log("how"); return voting();}
    return router.push("/login")
  };
  return (
    <button type="button" onClick={() => handleClick()}>
      {post.voteStatus ? (
        <svg
          aria-label="unlike"
          fill="#ed4956"
          height="24"
          viewBox="0 0 48 48"
          width="24"
        >
          <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
        </svg>
      ) : (
        <svg
          aria-label="like"
          fill="#262626"
          height="24"
          viewBox="0 0 48 48"
          width="24"
        >
          <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
        </svg>
      )}
    </button>
  );
};
