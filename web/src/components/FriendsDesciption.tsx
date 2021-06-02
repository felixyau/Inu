import { Flex, Box, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { UserIcon } from "./UserIcon";
import { NameAndDescription } from "./NameAndDescription";

interface FriendsDesciption {
    
}

export const FriendsDesciption: React.FC = ({}) => {
    let user = {
        id:1
    }
  return (
    <Flex m="8px 0">
    <Flex width="100%" height="32px" border="2px">
      <Box mr="12px"><UserIcon  size="35px"/></Box>
      <NameAndDescription/>
      <Flex align="center" ml="auto">
            <NextLink href="/user/[id]" as={`/user/${user.id}`}>
              <Link fontSize=".5rem">Follow</Link>
            </NextLink>
          </Flex>
    </Flex>
    </Flex>
  );
};
