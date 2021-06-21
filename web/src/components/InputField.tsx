import React from "react";
import { FieldHookConfig, useField } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Input,
} from "@chakra-ui/react";

interface InputFieldProps {
  label: string;
  textarea?: boolean;
  name:string;
  placeholder?:string;
  type?:string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {!!textarea ? (
        <Textarea
          {...field}
          {...props}
          id={props.name}
        ></Textarea>
      ) : (
        <Input
          {...field}
          {...props}
          id={props.name}
        ></Input>
      )}
      {meta.error? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};
