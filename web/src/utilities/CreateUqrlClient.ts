import { withUrqlClient } from "next-urql";
import Index from "../pages";
import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange, gql, ssrExchange } from "urql";
import {
  DeletePostMutationVariables,
  LoginMutation,
  MeDocument,
  MeQuery,
  PaginatedPost,
  RegisterMutation,
  VoteMutationVariables,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { filter, pipe, tap } from "wonka";
import { Exchange } from "urql";
import Router from "next/router";
import { isServer } from "./isServer";

export const cursorPagination = (): Resolver => {
  //overwrite the posts resolver , but cant really understand what's happening
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    console.log("working");
    const fieldKey = `${fieldName}(${fieldArgs})`;
    const ifinCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "posts"
    );
    let hasMore = true;
    const result: string[] = [];
    info.partial = !ifinCache;
    fieldInfos.forEach((fi) => {
      console.log("xdd")
      console.log("fi:", fi.arguments);
      const key = cache.resolve(entityKey, fi.fieldKey) as string;

      const data = cache.resolve(key, "posts") as string[];

      const _hasMore = cache.resolve(key, "hasMore");
      //if (!_hasMore) hasMore = false;
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      result.push(...data);
    });

    return {
      __typename: "PaginatedPost",
      post: result,
      hasMore,
    };

    // const visited = new Set();
    // let result: NullArray<string> = [];
    // let prevOffset: number | null = null;

    // for (let i = 0; i < size; i++) {
    //   const { fieldKey, arguments: args } = fieldInfos[i];
    //   if (args === null || !compareArgs(fieldArgs, args)) {
    //     continue;
    //   }

    //   const links = cache.resolve(entityKey, fieldKey) as string[];
    //   const currentOffset = args[cursorArgument];

    //   if (
    //     links === null ||
    //     links.length === 0 ||
    //     typeof currentOffset !== 'number'
    //   ) {
    //     continue;
    //   }

    //   const tempResult: NullArray<string> = [];

    //   for (let j = 0; j < links.length; j++) {
    //     const link = links[j];
    //     if (visited.has(link)) continue;
    //     tempResult.push(link);
    //     visited.add(link);
    //   }

    //   if (
    //     (!prevOffset || currentOffset > prevOffset) ===
    //     (mergeMode === 'after')
    //   ) {
    //     result = [...result, ...tempResult];
    //   } else {
    //     result = [...tempResult, ...result];
    //   }

    //   prevOffset = currentOffset;
    // }

    // const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs);
    // if (hasCurrentPage) {
    //   return result;
    // } else if (!(info as any).store.schema) {
    //   return undefined;
    // } else {
    //   info.partial = true;
    //   return result;
    // }
  };
};

export const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not logged in")) Router.replace("./login");
      })
    );
  }; //Error exchange from urql and Idk what's happenning
export const createUrqClient = (ssrExchange: any, ctx:any) => {
  let cookie = '';
  if (isServer()) ctx? cookie = ctx.req.headers.cookie : '';
  return {
  // ...add your Client options here
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
    headers: cookie ? { cookie, } : undefined,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        PaginatedPost: () => null,
      },
      resolvers: {
        Query: {
          posts: cursorPagination(),
        },
      },
      updates: {
        Mutation: {
          deletePost: (_result, args, cache, info) => {
            console.log("hello")
            cache.invalidate({
              __typename: "Post",
              id: (args as DeletePostMutationVariables).id,
            });
          },
          vote: (_result, args, cache, info) => {
            const { postId } = args as VoteMutationVariables;
            const data = cache.readFragment(
              gql`
                fragment __ on Post {
                  id
                  points
                  
                }
              `,
              { id: postId } as any
            );

            if (data) {
              if (data.voteStatus === 1) {
                return;
              }
            }
          },
          CreatePost: (_result, args, cache, info) => {
            
            const allFields = cache.inspectFields("Query");
            const fieldInfos = allFields.filter(
              (info) => info.fieldName === "posts"
            );
            fieldInfos.forEach((fi) => {
              console.log("fi args:", fi.arguments)
              cache.invalidate("Query", "posts", fi.arguments);
            });
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) return query;
                else return { me: result.register.user };
              }
            );
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) return query;
                else return { me: result.login.user };
              }
            );
          },
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<MeQuery, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => {
                return { me: null };
              }
            );
          },
        },
      },
    }),
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
}};
