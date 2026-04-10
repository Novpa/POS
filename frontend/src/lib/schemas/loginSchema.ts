import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password at least hast 6 characters")
    .required("Password is required"),
});

export default loginSchema;
