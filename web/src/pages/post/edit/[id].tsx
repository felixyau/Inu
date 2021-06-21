import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import router from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  useMeQuery,
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqClient } from "../../../utilities/CreateUqrlClient";
import { errorMaps } from "../../../utilities/errorMap";
import { getIntId } from "../../../utilities/getIntId";
import withApollo from "../../../utilities/withApollo";

const EditPost: React.FC = ({}) => {
  const intId = getIntId();
  const { data: meData, loading: meLoading } = useMeQuery();

  const { data, error, loading } = usePostQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });

  const [editPost] = useUpdatePostMutation();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (!data?.post) return <div>couldn't find the post</div>;

  return !meLoading && !meData?.me ? (
    <Layout>
      <Box>You need to login before you create a post</Box>
      <NextLink href="./login?next=create-post">login</NextLink>
    </Layout>
  ) : (
    <Layout>
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values, { setErrors }) => {
          const { data, errors } = await editPost({
            variables: { id: intId, title: values.title, text: values.text },
          });
          if (data?.updatePost.errors)
            setErrors(errorMaps(data.updatePost.errors));
          else if (!errors) router.back();
          else console.log(errors);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField
                textarea={true}
                name="text"
                placeholder="text"
                label="Text"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="telegram"
            >
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ssr : false})(EditPost);
