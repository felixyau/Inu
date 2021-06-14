import { PostAction } from "../components/post/PostAction";
import { usePostQuery, usePostsQuery } from "../generated/graphql";
import { withApollo } from "../utilities/withApollo";

const Test: React.FC = () => {
  const { data } = usePostQuery({ variables: { id: 5 } });
  if (!data?.post) return <div>post query failed</div>;
  return (
    <>
      <div>Hi</div>
      <PostAction post={data.post} />
    </>
  );
};

export default withApollo({ssr:false})(Test);
