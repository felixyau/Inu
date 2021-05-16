import { withUrqlClient } from "next-urql";
import React from "react";
import { Navbar } from "../components/Navbar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqClient } from "../utilities/CreateUqrlClient";

const Index = () => {
  const [{data}] = usePostsQuery();
  return (
  <>
    <Navbar />
    {!data ? <div>Loading...</div> : data.posts.map((post)=><div key={post.id}>{post.title}</div>)}
    <div>hello</div>
  </>)
};

export default withUrqlClient(createUrqClient, {ssr:true})(Index);
