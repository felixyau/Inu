import { Divider } from "@chakra-ui/layout";
import { Box, Link, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import {
  useForgotPasswordMutation,
  useLoginMutation,
} from "../generated/graphql";
import { createUrqClient } from "../utilities/CreateUqrlClient";
import { errorMaps } from "../utilities/errorMap";
import NextLink from "next/link";
import withApollo from "../utilities/withApollo";

const ForgotPassword: React.FC = ({}) => {
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();
  const [complete, setComplete] = useState(false);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await forgotPassword({
            variables: { email: values.email },
          });
          if (response.data?.forgotPassword) {
            setComplete(true);
          }
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <>
              <Box>We have sent a email to that address</Box>
              <NextLink href="/login">
                <Link style={{ color: "#0088cc" }}>Login here</Link>
              </NextLink>
            </>
          ) : (
            <Form>
              <Box mt={4}>
                <InputField name="email" placeholder="email" label="Email" />
              </Box>
              <Box>
                <NextLink href="/login">
                  <Link>Reset Password</Link>
                </NextLink>
              </Box>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="telegram"
              >
                Reset
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ssr : false})(ForgotPassword);
