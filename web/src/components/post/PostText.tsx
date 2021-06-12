import { Box, Link, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import NextLink from "next/link";
import { PostSnippetFragment } from "../../generated/graphql";

interface PostTextProps {
  post: PostSnippetFragment;
}
export const PostText: React.FC<PostTextProps> = ({ post }) => {
  const [open, setOpen] = useState(false);
  const line1 = getFirstLine(post);

  const actualText = post.text.split("\n").map((sentence) => {
    return (
      <>
        {sentence}
        <br />
      </>
    );
  });
  return (
    <Box as="span">
      <NextLink href="/user/[id]" as={`/user/${post.creator.id}`}>
        <Link float="left"><Text className="boldFont">{post.creator.username}</Text></Link>
      </NextLink>
      {!open ? (
        <>
          &nbsp;
          <span>{line1}</span>
          <button
            style={{ height: "1em", display: "inline-block", color: "rgba(142,142,142,1)"}}
            hidden={line1 === post.text}
            onClick={() => setOpen(true)}
          >
            ...more
          </button>
        </>
      ) : (
        <Box>
          &nbsp;
          {actualText}
        </Box>
      )}
    </Box>
  );
};

const getFirstLine = (post: PostSnippetFragment): string => {
  const maxText = post.text.slice(0, 50);
  const text = maxText.match(/([.\n!?~]+|[^.\n!?~]+)/g); //display the first line when collapsed
  return text && text[1] ? text[0] + text[1] : maxText;
};
