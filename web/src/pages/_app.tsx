import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { PaginatedPost, PostQuery } from "../generated/graphql";

function MyApp({ Component, pageProps }: any) {
  return (
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
  );
}

export default MyApp;
