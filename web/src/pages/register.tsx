import { Button, Box } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { errorMaps } from "../utilities/errorMap";
import {useRouter} from "next/router"
import { withUrqlClient } from "next-urql";
import { createUrqClient } from "../utilities/CreateUqrlClient";
import withApollo from "../utilities/withApollo";
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "",email:"" }}
        onSubmit={async (values, {setErrors}) => {
          const response = await register({variables:{options: values}}); //expose password 
          if (response.data?.register.errors) {
            setErrors(
                errorMaps(response.data.register.errors))
          } else if (response.data?.register.user) {
              router.replace("./");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="telegram"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withApollo({ssr : false})(Register);