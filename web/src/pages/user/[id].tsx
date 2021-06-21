import { useRouter } from "next/router";
import React from "react";
import { CloudWidget } from "../../components/CloudWidget";
import { UserIcon } from "../../components/UserIcon";
import {
  useEditUserProfileMutation,
  usePostQuery,
} from "../../generated/graphql";
import { getUserFromUrl } from "../../utilities/getUserFromUrl";
import withApollo from "../../utilities/withApollo";
import { ProfileWidget } from "../../components/ProfileWidget";
import { Layout } from "../../components/Layout";

const UserProfile: React.FC = ({}) => {
  const { data, loading, error } = getUserFromUrl();
  const [editProfile] = useEditUserProfileMutation();
  

  if (error) return <div>Query failed. Reason: {error}</div>;
  if (loading) return <div>loading...</div>;
  if (!data) return <div>User doesn't exist or Page no longer exists</div>;

  const profile = data.userProfile;

  return (
    <Layout>
      <UserIcon size="60px" src={profile.icon} userId={profile.id}/>
      <ProfileWidget editProfile={editProfile} userId={profile.id}/>
    </Layout>
  );
};

export default withApollo({ ssr: false })(UserProfile);
