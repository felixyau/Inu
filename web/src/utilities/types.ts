import { CommentorSnippetFragment, Comments, Maybe, User } from "../generated/graphql";

//return type from comments field of Post
export type comments = Pick<Comments, "text"> & {
    commentor?: CommentorSnippetFragment
  };
  