import React from "react";
import { FieldHookConfig, useField } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Input,
} from "@chakra-ui/react";

type InputFieldProps =
  | FieldHookConfig<any> & {
      //name: string;  y doesnt' need
      label: string;
      //placeholder: string; y doesnt' need
      textarea?: boolean;
    };

export const InputField: React.FC<InputFieldProps> = ({
  textarea,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      {textarea ? (
        <Textarea
          {...field}
          type={props.type}
          placeholder={props.placeholder}
        ></Textarea>
      ) : (
        <Input
          {...field}
          type={props.type}
          placeholder={props.placeholder}
        ></Input>
      )}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
