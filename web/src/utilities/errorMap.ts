import { FormikErrors } from "formik";
import { FieldError, Maybe } from "../generated/graphql";

export const errorMaps = (
  errors:
    Pick<FieldError, "field" | "msg">[]

) : Record<string, string> => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, msg }) => {
    errorMap[field] = msg;
  });
  return errorMap;
};
