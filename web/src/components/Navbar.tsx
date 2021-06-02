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
import { AddIcon, LinkIcon, MoonIcon } from "@chakra-ui/icons";
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
      <>
        <Box>
          <Tooltip label="create post" aria-label="create-post">
            <IconButton
              padding={0}
              margin={0}
              bg="-moz-initial"
              aria-label="create-post"
              icon={<AddIcon />}
              onClick={() => router.push("/create-post")}
            ></IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip label="create post" aria-label="create-post">
            <IconButton
              padding={0}
              margin={0}
              bg="-moz-initial"
              aria-label="create-post"
              icon={<LinkIcon />}
              onClick={() => router.push("/register")}
            ></IconButton>
          </Tooltip>
        </Box>
        <Box>
          <NextLink href="/login">
            <Link>Login</Link>
          </NextLink>
        </Box>
      </>
    );
  } else {
    body = (
      <>
        <Box>
          <Tooltip label="create post" aria-label="create-post">
            <IconButton
              bg="-moz-initial"
              aria-label="create-post"
              icon={<AddIcon />}
              mr={2}
              onClick={() => router.push("/create-post")}
            ></IconButton>
          </Tooltip>
        </Box>
        <Box mr={2} ml={"auto"}>
          HI {data.me.username}
        </Box>
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
      </>
    );
  }
  return (
    <Flex align="center" justify="center" bg="blue.300" height={54} top={0} position="sticky" zIndex={100} width="100%">
      <Flex    
        p={4}
        align="center"
        margin={0}
        padding={0}
        width={935}
      >
        <NextLink href="/">
          <Flex _hover={{ cursor: "pointer" }} align="center">
            <InuIcon />
            Shiba
          </Flex>
        </NextLink>

        <Flex align="center" ml={"auto"} border="2px" className="navbar-icons">
          <Box>
            <Tooltip label="change color theme" aria-label="change-color-theme">
              <IconButton
                aria-label="colormode"
                icon={<MoonIcon />}
                onClick={toggleColorMode}
                bg="-moz-initial"
              >
                {colorMode === "light" ? "Dark" : "Light"}
              </IconButton>
            </Tooltip>
          </Box>
          {body}
        </Flex>
      </Flex>
    </Flex>
  );
};
