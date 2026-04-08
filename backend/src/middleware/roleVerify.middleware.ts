import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const roleVerify = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res?.locals.user;

    if (!allowedRoles.includes(user.role)) {
      throw new AppError(401, "Unauthorized access");
    }

    next();
  };
};
