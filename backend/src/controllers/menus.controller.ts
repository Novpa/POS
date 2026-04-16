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

  updateMenu: async (req: Request, res: Response) => {
    const { productId, name, price, categoryId } = req.body;
    let files: Express.Multer.File[] = [];
    if (Array.isArray(req?.files)) {
      files = req?.files;
    } else {
      files = [];
    }

    const updatedProduct = await menusSerivice.updateMenu(
      productId,
      files,
      name,
      price,
      categoryId,
    );

    res.status(201).json({
      status: "success",
      message: "Product has been updated successful",
      data: updatedProduct,
    });
  },
  getAllMenu: (req: Request, res: Response) => {},
  deleteMenu: (req: Request, res: Response) => {},
};
