import jwt from "jsonwebtoken";

export interface Payload {
  userId: string;
  role: "CASHIER" | "SUPER_ADMIN";
}

export const createToken = (payload: Payload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: "15m" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY!) as Payload;
};
