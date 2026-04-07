import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { validate } from "../middleware/validation.middleware";
import { registerUserSchema } from "../schemas/auth.schema";

const route = Router();

route.post("/", validate(registerUserSchema), authController.signup);

export default route;
