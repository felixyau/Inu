import { Box, Circle, Flex, Link, Image, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { UserIcon } from "./UserIcon";
import { NameAndDescription } from "./NameAndDescription";
import { useMeQuery, useUserProfileQuery } from "../generated/graphql";

interface UserAndChangeAccProps {}

export const UserAndChangeAcc: React.FC<UserAndChangeAccProps> = () => {
  const {data:meData,loading} = useMeQuery();
  if(loading) return <div>...loading</div>
  if(!meData) return <div>please log in</div>
  // if(!meData.me) return <div>please log in</div>
  const {data} = useUserProfileQuery({variables:{id:meData.me.id}, skip:!meData});
  
  return (
    <Flex width="100%" m="18px 0 12px">
      <Box mr="12px">
        {
          data ?
          <UserIcon size="60px" src={data.userProfile.icon} userId={data.userProfile.id}/>
          : 
          <div>Pleas Login</div>
        }
      
      </Box>
      <NameAndDescription />
      <Flex align="center">

          <Link fontSize=".5rem">Change</Link>

      </Flex>
    </Flex>
  );
};
