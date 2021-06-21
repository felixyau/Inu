import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useLoginMutation } from "../generated/graphql";
import { errorMaps } from "../utilities/errorMap";
import { InputField } from "./InputField";
import { Wrapper } from "./Wrapper";
import NextLink from "next/link";

export const Login: React.FC = () => {
  const [login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            update: (cache) => cache.evict({ fieldName: "me" }),
          });
          if (response.data?.login.errors) {
            setErrors(errorMaps(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (typeof router.query.next === "string")
              router.replace(router.query.next);
            else {
              router.replace("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="Username or Email"
              label="Username or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex>
              <Box>
                <NextLink href="/forgot-password">
                  <Link>forgot password?</Link>
                </NextLink>
              </Box>
              <Box ml="auto">
                <NextLink href="/register">
                  <Link>sign up</Link>
                </NextLink>
              </Box>
            </Flex>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="telegram"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
