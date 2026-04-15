import { Request, Response } from "express";
import { menusSerivice } from "../services/menus.service";

export const menuController = {
  createMenu: async (req: Request, res: Response) => {
    let files: Express.Multer.File[] = [];
    const { name, price, categoryId } = req.body;

    if (Array.isArray(req?.files)) {
      files = req?.files;
    } else {
      files = [];
    }

    const { createdProduct, createdImagesData } =
      await menusSerivice.createMenu(files, { name, price, categoryId });

    res.status(201).json({
      status: "success",
      message: "Product has been created successful",
      data: { product: createdProduct, images: createdImagesData },
    });
  },

  getAllMenu: (req: Request, res: Response) => {},
  updateMenu: (req: Request, res: Response) => {},
  deleteMenu: (req: Request, res: Response) => {},
};
