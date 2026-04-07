import { prisma } from "../config/config.prisma";
import { CreateUserDto } from "../types/authType";

import { handlePrismaError } from "../utils/prismaErrorHandle";
import bcrypt from "bcrypt";
import { userResponseFormat } from "../utils/userResponseFormat";

const SALT = 12;

export const authService = {
  registerUser: async (data: any) => {
    try {
      const hashedPassword = await bcrypt.hash(data.password, SALT);
      const user = await prisma.user.create({
        data: { ...data, password: hashedPassword },
      });

      return userResponseFormat(user);
    } catch (error) {
      handlePrismaError(error);
    }
  },
};
