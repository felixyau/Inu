import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";

interface UserInteractionProps {}

export const UserInteraction: React.FC<UserInteractionProps> = ({}) => {
  return (
    <Flex p="0 16px" direction="column">
      <Box mb="8px">x people liked</Box>
      <Flex direction="column">
        <Flex maxWidth="50%" align="strech">
          <Link as="samp" mr="8px">Doge</Link>
          <Text isTruncated>
            To to Moon To to MoonTo to MoonTo to MoonTo to Moon
          </Text>
        </Flex>
        <Box>name1 reponse</Box>
        <Box>name2 reponse</Box>
      </Flex>
    </Flex>
  );
};
