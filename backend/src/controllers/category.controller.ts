import { Request, Response } from "express";
import { categoryService } from "../services/category.service";

export const categoryController = {
  getAllCategories: async (req: Request, res: Response) => {
    const categories = await categoryService.getAllCategories();

    res.status(200).json({
      status: "success",
      message: "Get all categories successfull",
      data: categories,
    });
  },
};
