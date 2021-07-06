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

import { useApolloClient } from "@apollo/client";
import {
  AddIcon,
  ArrowBackIcon,
  LinkIcon,
  MoonIcon,
  SmallAddIcon,
} from "@chakra-ui/icons";
import { useRouter } from "next/router";
import InuIcon from "../Icons/InuIcon";
import { HomePageIcon } from "../Icons/HomePage";

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
          <NextLink href="/create-post">
            <a>
              <Tooltip label="create post" aria-label="create-post">
                <IconButton
                  padding={0}
                  margin={0}
                  bg="-moz-initial"
                  aria-label="create-post"
                  icon={<AddIcon />}
                ></IconButton>
              </Tooltip>
            </a>
          </NextLink>
        </Box>
        <Box>
          <NextLink href="/register">
            <a>
              <Tooltip label="register" aria-label="register">
                <IconButton
                  padding={0}
                  margin={0}
                  bg="-moz-initial"
                  aria-label="create-post"
                  icon={<LinkIcon />}
                ></IconButton>
              </Tooltip>
            </a>
          </NextLink>
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
          <NextLink href="/create-post">
            <a>
              <Tooltip label="create post" aria-label="create-post">
                <IconButton
                  bg="-moz-initial"
                  aria-label="create-post"
                  icon={<AddIcon />}
                ></IconButton>
              </Tooltip>
            </a>
          </NextLink>
        </Box>
        <Box ml={"auto"}>HI {data.me.username}</Box>
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
    <Flex
      align="center"
      justify="center"
      bg="hsl(210, 100%, 60%)"
      height={54}
      top={0}
      position="sticky"
      zIndex={2}
      width="100%"
    >
      <Flex p={4} align="center" margin={0} padding={0} width={935}>
        <NextLink href="/">
          <a>
            <Flex _hover={{ cursor: "pointer" }} align="center">
              <InuIcon />
              Shiba
            </Flex>
          </a>
        </NextLink>

        <Flex align="center" ml={"auto"} className="navbar-icons">
          <Box>
            <NextLink href="/">
              <a>
                <Tooltip label="back to homepage" aria-label="back to homepage">
                  <IconButton
                    aria-label="homepage"
                    icon={<HomePageIcon />}
                    bg="-moz-initial"
                  ></IconButton>
                </Tooltip>
              </a>
            </NextLink>
          </Box>
          {body}
        </Flex>
      </Flex>
    </Flex>
  );
};
