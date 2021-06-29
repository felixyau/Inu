import { Box, Flex } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AllComments } from "../../../components/post/AllComments";
import { CommentBox } from "../../../components/post/CommentBox";
import { UserIcon } from "../../../components/UserIcon";
import { useUserContext } from "../../../components/UserWrapper";
import { useMeQuery, useUserProfileQuery } from "../../../generated/graphql";
import { HeartIcon } from "../../../Icons/HeartIcon";
import { getPostFromUrl } from "../../../utilities/getPostFromUrl";
import withApollo from "../../../utilities/withApollo";

const Comments: React.FC = () => {
  const { data, loading, error } = getPostFromUrl();
  const user = useUserContext();
  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (!user?.me) return <div>nouser</div>;
  return !data?.post ? (
    <div>nodata</div>
  ) : (
    <Flex direction="column">
      <Flex>
        <Box>Go back</Box>
        <Box className="boldFont">Comments</Box>
        <HeartIcon post={data.post} />
      </Flex>
      <Flex>
        {/* <UserIcon size="40px" src={`${user.me.icon}`} userId={user.me.id}/> */}
        <CommentBox post={data.post}/>
      </Flex>
      <Flex p="0 16px">
      <Flex className="commentSession" direction="column">
        {data.post.comments
          ? data.post.comments.map((comment) => {
              console.log("commentid:", comment.id);
              return <AllComments key={comment.id} comment={comment} />;
            })
          : null}
      </Flex>
      </Flex>
    </Flex>
  );
};

export default withApollo({ssr:true})(Comments);
