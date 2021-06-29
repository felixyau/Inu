import { Box, Circle, Flex, Link, Image, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { UserIcon } from "./UserIcon";
import { NameAndDescription } from "./NameAndDescription";
import { User } from "../generated/graphql";

interface UserAndChangeAccProps {
  user: Pick<User, "id" | "username" | "icon">

}

export const UserAndChangeAcc: React.FC<UserAndChangeAccProps> = ({user}) => {
  return (
    <Flex width="100%" m="18px 0 12px">
      <Box mr="12px">

          <UserIcon
            size="60px"
            src={user?.icon}
            userId={user?.id}
          />
      </Box>
      <NameAndDescription user={user}/>
      <Flex align="center">
        <Link fontSize=".5rem">Change</Link>
      </Flex>
    </Flex>
  );
};
