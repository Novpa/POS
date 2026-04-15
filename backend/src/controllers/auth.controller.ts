import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { LoginSchema, RegisterUserSchema } from "../schemas/auth.schema";
import { authService } from "../services/auth.service";
import { COOKIE_OPTIONS } from "../config/cookie.config";
import { AppError } from "../utils/AppError";
import { verifyToken } from "../utils/jwt.util";

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
          role: user?.role,
          // token: user?.token,
        },
      });
    },
  ),

  refresh: catchAsync(async (req: Request, res: Response) => {
    // const user = res.locals.user;
    const token = req.cookies?.token;

    if (!token) {
      throw new AppError(401, "Your session has finished");
    }

    const user = await authService.refresh(token);

    res.status(200).json({
      status: "success",
      message: "Refresh successfull",
      data: {
        firstName: user?.firstName,
        lastName: user?.lastName,
        role: user?.role,
      },
    });
  }),
};
