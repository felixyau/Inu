import { withUrqlClient } from "next-urql";
import Index from "../pages";
import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange, ssrExchange } from "urql";
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { filter, pipe, tap } from 'wonka';
import { Exchange } from 'urql';
import Router from "next/router";

export const errorExchange: Exchange = ({ forward }) => ops$ => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes("not logged in")) Router.replace("./login")
    })
  );
}; //Error exchange from urql and Idk what's happenning 
export const createUrqClient = ((ssrExchange:any) => ({
  // ...add your Client options here
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
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
}))
