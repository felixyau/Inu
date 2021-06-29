import { ApolloClient, InMemoryCache } from "@apollo/client";
import { withApollo } from "next-apollo"
import { PaginatedPost } from "../generated/graphql";
import { NextPageContext } from "next";

export const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL, //next_public prefix to expose the env var to browser
    credentials: "include",
    // headers: {
    //     cookie:
    //       (typeof window === "undefined"
    //         ? ctx?.req?.headers.cookie
    //         : undefined) || "",
    //   },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: false,
              merge(
                existing: PaginatedPost,
                incoming: PaginatedPost
              ): PaginatedPost {
                if (!existing) return incoming;
                return {
                  ...incoming,
                  posts: [...existing.posts, ...incoming.posts],
                };
              },
            },
          },
        },
      },
    }),
  });

export default withApollo(client);


// export const client = (ctx: NextPageContext) => new ApolloClient({
//   uri: "http://localhost:4000/graphql",
//   credentials: "include",
//   headers: {
//       cookie:
//         (typeof window === "undefined"
//           ? ctx?.req?.headers.cookie
//           : undefined) || "",
//     },
//   cache: new InMemoryCache({
//     typePolicies: {
//       Query: {
//         fields: {
//           posts: {
//             keyArgs: false,
//             merge(
//               existing: PaginatedPost,
//               incoming: PaginatedPost
//             ): PaginatedPost {
//               if (!existing) return incoming;
//               return {
//                 ...incoming,
//                 posts: [...existing.posts, ...incoming.posts],
//               };
//             },
//           },
//         },
//       },
//     },
//   }),
// });

// export default withApollo(client);