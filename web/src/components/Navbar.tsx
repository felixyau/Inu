import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isTargetLikeServerless } from "next/dist/next-server/server/config";
import { isServer } from "../utilities/isServer";

import InuIcon from "../components/inuIcon";
import { useApolloClient } from "@apollo/client";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data, loading } = useMeQuery(
    // skip: isServer(),
  );
  const [logout] = useLogoutMutation();
  const { colorMode, toggleColorMode } = useColorMode();
  const apolloClient = useApolloClient();

  console.log(data)

  let body = null;
  if (loading) {
    body=<div>Loading...</div>
  } else if (!data?.me) {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Link mr={2}>Create Post</Link>
        </NextLink>
        <NextLink href="/register">
          <Link mr={2}>Register</Link>
        </NextLink>
        <NextLink href="/login">
          <Link>Login</Link>
        </NextLink>
      </Flex>
    );
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Link mr={2}>Create Post</Link>
        </NextLink>
        <Text mr={2} ml={"auto"}>
          HI {data.me.username}
        </Text>
        <NextLink href="/">
          <Link
            onClick={async () => {
              await logout();
              await apolloClient.resetStore();
            }}
          >
            Logout
          </Link>
        </NextLink>
      </Flex>
    );
  }
  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      bg="blue.300"
      p={4}
      align="center"
      padding={0}
      margin={0}
      height={70}
    >
      <NextLink href="/">
        <Flex>
          <Link>
            <InuIcon />
          </Link>
          Shiba
        </Flex>
      </NextLink>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
