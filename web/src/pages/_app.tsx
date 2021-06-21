import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { PaginatedPost, PostQuery } from "../generated/graphql";
import "../style.css";
import { Head } from "next/document";
import { UserWrapper } from "../components/UserWrapper";
import { client } from "../utilities/withApollo";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ApolloProvider client={client}>
        <UserWrapper>
          <Component {...pageProps} />
        </UserWrapper>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
