import { useRouter } from 'next/router';
import React from 'react'
import { CloudWidget } from '../../components/CloudWidget';
import { UserIcon } from '../../components/UserIcon';
import { usePostQuery } from '../../generated/graphql';
import { getUserFromUrl } from '../../utilities/getUserFromUrl';
import { withApollo } from '../../utilities/withApollo';

const UserProfile: React.FC = ({}) => {
  const {data, loading, error} = getUserFromUrl();

  if (error) return (<div>Query failed. Reason: {error}</div>);
  if (loading) return (<div>loading...</div>);
  if (!data) return <div>User doesn't exist or Page no longer exists</div>

  return (
    <>
  <UserIcon size="60px"/>
  <CloudWidget/>
  </>
  );
}

export default withApollo({ssr:false})(UserProfile);