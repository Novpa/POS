import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { validate } from "../middleware/validation.middleware";
import { registerUserSchema } from "../schemas/auth.schema";
import { jwtVerifyToken } from "../middleware/jwtVerify.middleware";
import { verifyToken } from "../utils/jwt.util";
import { roleVerify } from "../middleware/roleVerify.middleware";

const route = Router();

route.post(
  "/signup",
  jwtVerifyToken(verifyToken),
  roleVerify("SUPER_ADMIN"),
  validate(registerUserSchema),
  authController.signup,
);
route.post("/login", authController.login);

export default route;
