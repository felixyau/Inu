import { Box, Button, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import router from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { createUrqClient } from "../utilities/CreateUqrlClient";
import { errorMaps } from "../utilities/errorMap";
import { withApollo } from "../utilities/withApollo";

export const CreatePost: React.FC = () => {
  const { data, loading } = useMeQuery();
  const [createPost] = useCreatePostMutation();
  return !loading && !data?.me ? (
    <Layout variant="small">
      <Box >You need to login before you create a post</Box>
      <NextLink href="./login?next=create-post"><Link onClick={()=>console.log("click")}style={{ color: "#0088cc" }}>login here</Link></NextLink>
    </Layout>
  ) : (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { errors, data } = await createPost({
            variables: { input: values },
            update: (cache) => cache.evict({fieldName:"posts"})
          });
          if (data?.createPost.errors)
            setErrors(errorMaps(data.createPost.errors));
          else if (!errors) router.push("./");
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
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ssr : false})(CreatePost);
