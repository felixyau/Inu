import { registerUserInput } from "../resolvers/registerUserInput";
import { FieldError } from "../resolvers/Error"

export const validateUserName = (options: registerUserInput) : FieldError[] | null => {
  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        msg: "cannot include '@' in username",
      },
    ];
  }

  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        msg: "invalid email format",
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        msg: "username must be longer than 2 characters",
      },
    ];
  }
  if (options.password.length <= 6) {
    return [
      {
        field: "password",
        msg: "password must be longer than 6 characters",
      },
    ];
  }
  return null;
};
