import { Router } from "express";
import { categoryController } from "../controllers/category.controller";

const route = Router();

route.get("/", categoryController.getAllCategories);
export default route;
