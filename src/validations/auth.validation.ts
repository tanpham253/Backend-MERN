import * as yup from "yup";

const login = yup
  .object({
    body: yup
      .object({
        email: yup
          .string()
          .email("Email is invalid")
          .required("Email is required"),
        password: yup
          .string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })
      .required(),
  })
  .required();

const refreshToken = yup
  .object({
    body: yup
      .object({
        refreshToken: yup
          .string()
          .required("Refresh token is required"),
      })
      .required(),
  })
  .required();

export default {
  login,
  refreshToken,
};
