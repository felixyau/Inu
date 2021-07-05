import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { PaginatedPost, PostQuery } from "../generated/graphql";
import "../style.css";
import { Head } from "next/document";
import { UserWrapper } from "../components/UserWrapper";
import withApollo, { client } from "../utilities/withApollo";
import { NextPageContext } from "next";

function MyApp({ Component, pageProps, cookie }: any) {
  const Client = client(cookie);
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ApolloProvider client={Client}>
        <UserWrapper>
          <Component {...pageProps} />
        </UserWrapper>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
