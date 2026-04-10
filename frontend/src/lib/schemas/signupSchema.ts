import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .max(25, "First name must be at most 25 characters long")
    .min(2, "First name must be at least 2 characters long")
    .required("First name is required"),

  lastName: yup
    .string()
    .trim()
    .max(25, "Last name must be at most 25 characters long")
    .min(2, "Last name must be at least 2 characters long")
    .required("Last name is required"),

  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .max(150, "Email must be at most 150 characters long")
    .required("Email is required"),

  password: yup.string().trim().required("Password is required"),

  role: yup
    .mixed()
    .oneOf(["SUPER_ADMIN", "CASHIER"], "Invalid role")
    .required("Role is required"),
});
