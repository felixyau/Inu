import { Button, Box, Flex, Link, Text, Image } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";

import NextLink from "next/link";

import { useRouter } from "next/router";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useRegisterMutation } from "../../generated/graphql";
import { errorMaps } from "../../utilities/errorMap";
import withApollo from "../../utilities/withApollo";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { options: values },
            update: (cache) => cache.evict({ fieldName: "me" }),
          }); //expose password
          if (response.data?.register.errors) {
            setErrors(errorMaps(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.replace("/register/icon");
          }
        }}
      >
        {({ isSubmitting }) => (
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
                    name="username"
                    placeholder="username"
                    label="Username"
                  />
                </Box>
                <Box m="4px auto" width="80%">
                  <InputField name="email" placeholder="email" label="Email" />
                </Box>
                <Box m="4px auto" width="80%">
                  <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                  />
                </Box>
                <Box width="80%" m="24px auto 0">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    colorScheme="telegram"
                    width="100%"
                    maxHeight="30px"
                  >
                    Register
                  </Button>
                </Box>
                <Flex>
                  <Box m="8px auto 0" width="80%" p="24px 0">
                    <Flex>
                      <Flex justify="center">
                        <Text textAlign="center">
                          Notes: Do not enter a valid email and real password or
                          I will sell your data
                        </Text>
                      </Flex>
                      <Box width="60%">
                        <Image
                          width="100%"
                          src="https://i.chzbgr.com/full/8367984640/h63BC7257/look-at-my-fluffy-butt"
                          alt="dog's butt"
                        />
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              </Form>
            </Box>
            <Box className="card" width="100%" mt="10px" p="10px 0">
              <Flex justify="center" p="15px">
                <NextLink href="/login">
                  <Link>
                    Already have an account?{" "}
                    <span className="links">Log in</span>
                  </Link>
                </NextLink>
              </Flex>
            </Box>
          </Flex>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withApollo({ ssr: false })(Register);
