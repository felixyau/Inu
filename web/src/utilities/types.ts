import { Comments, Maybe, UsernameAndId } from "../generated/graphql";

//return type from comments field of Post
export type comments = Pick<Comments, "text"> & {
    commentor?: Maybe<
      { __typename?: "usernameAndId" } & Pick<
        UsernameAndId,
        "username" | "userId"
      >
    >;
  };