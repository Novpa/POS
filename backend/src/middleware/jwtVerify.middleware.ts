import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const jwtVerifyToken = (verifyFunction: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      throw new AppError(401, "Your session has finished");
    }

    const payload = verifyFunction(token);

    res.locals.user = payload;

    next();
  };
};
