import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation, useMeQuery } from "../generated/graphql";
import { createUrqClient } from "../utilities/CreateUqrlClient";
import { errorMaps } from "../utilities/errorMap";
import NextLink from "next/link";
import withApollo from "../utilities/withApollo";
import { tryCatchHell } from "../utilities/tryCatchHell";

const Login: React.FC = ({}) => {
  const [login] = useLoginMutation();
  const router = useRouter();

  return (
    <Formik
      initialValues={{ usernameOrEmail: "", password: "" }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        const [response, error] = await tryCatchHell(
          login({
            variables: values,
            update: (cache) => cache.evict({ fieldName: "me" }),
          })
        );
        const data = response.data?.login;
        if (error) alert("server not responding");
        if (data.errors) {
          setErrors(errorMaps(data.errors));
        } else if (response.data?.login.user) {
          if (typeof router.query.next === "string")
            router.replace(router.query.next);
          else {
            router.replace("/");
          }
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleSubmit, isValidating }) => (
        <Flex
          direction="column"
          align="center"
          maxWidth="400px"
          p="16px"
          m="10px auto 0"
        >
          <Box className="card" width="100%" p="16px">
            <Form>
              <Box m="4px auto" width="80%">
                <InputField
                  name="usernameOrEmail"
                  placeholder="Username or Email"
                  label="Username or Email"
                  type="usernameOrEmail"
                />
              </Box>
              <Box m="4px auto" width="75%">
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Box width="75%" m="24px auto 0">
              <Button
                type="submit"
                isLoading={isSubmitting}
                colorScheme="telegram"
                width="100%"
                maxHeight="30px" 
              >
                
                Login
              </Button>
              </Box>
              <Flex>
                <Box
                  borderTop="1px solid rgba(238,238,238,1)"
                  m="16px auto 0"
                  width="75%"
                  p="24px"
                >
                  <Flex justify="center">
                    <NextLink href="/forgot-password">
                      <Link>forgot password?</Link>
                    </NextLink>
                  </Flex>
                </Box>
              </Flex>
            </Form>
          </Box>
          <Box className="card" width="100%" mt="10px" p="10px 0">
            <Flex justify="center" p="15px">
            <NextLink href="/register">
              <Link>No accout? <span className="links">sign up</span></Link>
            </NextLink>
            </Flex>
          </Box>
        </Flex>
      )}
    </Formik>
  );
};
export default withApollo({ ssr: false })(Login);
