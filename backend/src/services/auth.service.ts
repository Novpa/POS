import { prisma } from "../config/config.prisma";
import { CreateUserDto, loginDto } from "../types/authType";
import { handlePrismaError } from "../utils/prismaErrorHandle";
import bcrypt from "bcrypt";
import { userResponseFormat } from "../utils/userResponseFormat";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import { createToken } from "../utils/jwt.util";

import { mailService } from "./mail.service";

const SALT = 12;

export const authService = {
  registerUser: async (data: CreateUserDto) => {
    try {
      const hashedPassword = await bcrypt.hash(data.password, SALT);
      const user = await prisma.user.create({
        data: { ...data, password: hashedPassword },
      });

      await mailService.sendMail(
        {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        user.email,
        "resetPassword.html",
        "Welcome - new employee",
      );

      return userResponseFormat(user);
    } catch (error) {
      handlePrismaError(error);
    }
  },

  login: async ({ email, password }: loginDto) => {
    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new AppError(401, "Invalid credentials");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new AppError(401, "Invalid credentials");
      }

      const payload = {
        userId: user.id,
        role: user.role,
      };
      const token = createToken(payload);
      return {
        token,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  },
};
