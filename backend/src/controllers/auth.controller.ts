import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { LoginSchema, RegisterUserSchema } from "../schemas/auth.schema";
import { authService } from "../services/auth.service";
import { COOKIE_OPTIONS } from "../config/cookie.config";

export const authController = {
  signup: catchAsync(
    async (req: Request<{}, {}, RegisterUserSchema>, res: Response) => {
      const { firstName, lastName, email, password, role } = req.body;

      const user = await authService.registerUser({
        firstName,
        lastName,
        email,
        password,
        role,
      });

      res.status(201).json({
        status: "message",
        message: "Create user successful",
        data: user,
      });
    },
  ),

  login: catchAsync(
    async (req: Request<{}, {}, LoginSchema>, res: Response) => {
      console.log(req.body);
      const { email, password } = req.body;

      const user = await authService.login({
        email,
        password,
      });

      res.cookie("token", user?.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      res.status(200).json({
        status: "success",
        message: "User authentication successful",
        data: {
          firstName: user?.firstName,
          lastName: user?.lastName,
        },
      });
    },
  ),
};
