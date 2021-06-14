import { useRouter } from "next/router";
import { usePostQuery } from "../generated/graphql";

export const getUserFromUrl = () => {
  const router = useRouter();
  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  //when will it be not a string
  return usePostQuery({ skip: id === -1, variables: { id } });
};
