import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { registerUserSchema } from "../schemas/auth.schema";
import { authService } from "../services/auth.service";

export const authController = {
  signup: catchAsync(
    async (req: Request<{}, {}, registerUserSchema>, res: Response) => {
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
};
