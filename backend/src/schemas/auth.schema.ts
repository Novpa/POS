import * as z from "zod";

const ROLE_ENUM = z.enum(["CASHIER", "SUPER_ADMIN"]);

export const registerUserSchema = z.object({
  body: z.object({
    firstName: z.string().max(25, "Max 25 characters"),
    lastName: z.string().max(25, "Max 25 characters"),
    email: z.email().max(25, "Max 25 characters"),
    password: z
      .string()
      .min(8, "Min 8 characters")
      .max(25, "Max 25 characters"),
    role: ROLE_ENUM,
  }),
});

export type registerUserSchema = z.infer<typeof registerUserSchema>["body"];
