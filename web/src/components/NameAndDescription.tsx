import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { User } from "../generated/graphql";

interface NameAndDescriptionProps {
  user: Pick<User, "id" | "username" | "icon">
}

export const NameAndDescription: React.FC<NameAndDescriptionProps> = ({user}) => {
  return ( 
    <Flex direction="column" minWidth="68%">
      <Box>
        <NextLink href="/user/[id]" as={`/user/${user?.id}`}>
          <Link fontSize="12px">{user?.username}</Link>
        </NextLink>
      </Box>
      <Box fontSize="12px">lvl 1 doggie</Box>
    </Flex>
  );
};
