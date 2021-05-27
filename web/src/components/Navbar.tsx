import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  useColorMode,
  Text,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isTargetLikeServerless } from "next/dist/next-server/server/config";
import { isServer } from "../utilities/isServer";

import InuIcon from "../components/inuIcon";
import { useApolloClient } from "@apollo/client";
import { AddIcon, MoonIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data, loading } = useMeQuery();
  // skip: isServer(),
  const [logout] = useLogoutMutation();
  const { colorMode, toggleColorMode } = useColorMode();
  const apolloClient = useApolloClient();
  const router = useRouter();

  console.log(data);

  let body = null;
  if (loading) {
    body = <div>Loading...</div>;
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
        <Tooltip label="create post" aria-label="create-post">
          <IconButton
            bg="-moz-initial"
            aria-label="create-post"
            icon={<AddIcon />}
            mr={2}
            onClick={() => router.push("/create-post")}
          >
            Create Post
          </IconButton>
        </Tooltip>
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
        <Flex _hover={{ cursor: "pointer" }} align="center" ml={4}>
          <InuIcon />
          Shiba
        </Flex>
      </NextLink>

      <Flex align="center" ml={"auto"}>
        <Tooltip label="change color theme" aria-label="change-color-theme">
          <IconButton
            aria-label="colormode"
            icon={<MoonIcon />}
            onClick={toggleColorMode}
            mr={2}
            bg="-moz-initial"
          >
            {colorMode === "light" ? "Dark" : "Light"}
          </IconButton>
        </Tooltip>
        {body}
      </Flex>
    </Flex>
  );
};
