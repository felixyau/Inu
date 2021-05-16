import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import Nextlink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isTargetLikeServerless } from "next/dist/next-server/server/config";
import { isServer } from "../utilities/isServer";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [,logout] = useLogoutMutation();

    let body = null;
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <Nextlink href="/create-post">
          <Link mr={2}>Create Post</Link>
        </Nextlink>
        <Nextlink href="/register">
          <Link mr={2}>Register</Link>
        </Nextlink>
        <Nextlink href="/login">
          <Link>Login</Link>
        </Nextlink>
      </>
    );
  } else {
    body = (
      <Flex >
        <Box mr={2} ml={"auto"}>HI {data.me.username}</Box>
        <Nextlink href="/">
          <Link onClick={()=>logout()}>Logout</Link>
        </Nextlink>
      </Flex>
    );
  }
  return (
    <Flex zIndex={1} position="sticky" top={0} bg="blue.300" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
