import { Box, Link, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import router from 'next/router';
import React from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { errorMaps } from '../utilities/errorMap';
import login from './login';
import NextLink from "next/link";
import { withUrqlClient } from 'next-urql';
import { createUrqClient } from '../utilities/CreateUqrlClient';
import { useCreatePostMutation, useMeQuery } from '../generated/graphql';
import { Layout } from '../components/Layout';

export const CreatePost: React.FC = () => {
    const [{data, fetching}] = useMeQuery();
    const [, createPost] = useCreatePostMutation();
        return (
            (!fetching && !data?.me) ? (
                <Layout variant="small">
                <Box>You need to login before you create a post</Box>
                <NextLink href="./login?next=create-post">login</NextLink>
                </Layout>      
            ) :
            <Layout variant="small">
            <Formik
              initialValues={{ title: "", text: "" }}
              onSubmit={async (values, { setErrors }) => {
                const { error } = await createPost({input:values});
                if (!error) router.push("./");   
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    name="title"
                    placeholder="title"
                    label="Title"
                  />
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
}

export default withUrqlClient(createUrqClient)(CreatePost);