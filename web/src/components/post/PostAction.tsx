import { Box, Flex, Spacer } from "@chakra-ui/react";
import React from "react";
import { HeartIcon } from "../../Icons/HeartIcon";
import { ResponseIcon } from "../../Icons/ResponseIcon";
import { SaveIcon } from "../../Icons/SaveIcon";
import { ShareIcon } from "../../Icons/ShareIcon";

interface PostActionProps {}

export const PostAction: React.FC<PostActionProps> = ({}) => {
  return (
    <Flex p="0 8px" align="center">
      <span>
        <Box p="8px">
          <button type="button">
            <HeartIcon />
          </button>
        </Box>
      </span>

      <span>
        <Box p="8px">
          <button type="button">
            <ResponseIcon />
          </button>
        </Box>
      </span>

      <span>
        <Box p="8px">
          <button type="button">
            <ShareIcon />
          </button>
        </Box>
      </span>
      <Box ml="auto" p="8px">
        <span>
          <button type="button">
            <SaveIcon />
          </button>
        </span>
      </Box>
    </Flex>
  );
};
