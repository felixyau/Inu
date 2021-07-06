import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import router from "next/router";
import React, { useEffect } from "react";
import { CloudWidget } from "../components/CloudWidget";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { createUrqClient } from "../utilities/CreateUqrlClient";
import { errorMaps } from "../utilities/errorMap";
import withApollo from "../utilities/withApollo";

export const CreatePost: React.FC = () => {
  const { data, loading } = useMeQuery();
  const [createPost] = useCreatePostMutation();
  console.log("me:", data?.me?.username);
  return !loading && !data?.me ? (
    <Layout>
      <Box>You need to login before you create a post</Box>
      <NextLink href="./login?next=create-post">
        <Link onClick={() => console.log("click")} className="links">
          login here
        </Link>
      </NextLink>
    </Layout>
  ) : (
    <Layout>
      <Formik
        initialValues={{ title: "", text: "", photo: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { errors, data } = await createPost({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: "posts" });
              cache.gc();
            },
          });
          console.log("create post data:", data);
          if (data?.createPost.errors)
            setErrors(errorMaps(data.createPost.errors));
          else if (!errors) router.push("./");
        }}
      >
        {({ isSubmitting, setValues, values }) => {
          console.log("createpost value:", values);
          return (
            <Flex
              direction="column"
              align="center"
              maxWidth="600px"
              p="16px"
              m="10px auto 0"
            >
              <Box className="card" width="100%" p="16px">
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
                  <Box mt={4}>
                    <InputField
                      name="photo"
                      placeholder="use the 'upload image' button"
                      label="Photo"
                      readOnly={true}
                    />
                  </Box>
                  <CloudWidget values={values} setValues={setValues} />
                  <Button
                    mt={4}
                    type="submit"
                    isLoading={isSubmitting}
                    colorScheme="telegram"
                  >
                    Create
                  </Button>
                </Form>
              </Box>
            </Flex>
          );
        }}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreatePost);
