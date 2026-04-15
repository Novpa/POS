import { Product } from "../../generated/prisma/client";
import { prisma } from "../config/config.prisma";

export const menusSerivice = {
  createMenu: async (
    files: Express.Multer.File[],
    { name, price, categoryId }: Pick<Product, "name" | "price" | "categoryId">,
  ) => {
    const createdProduct = await prisma.product.create({
      data: {
        name,
        price,
        categoryId,
      },
    });

    const initCategories = [];

    for (const file of files) {
      const categoryObj = {
        url: file.filename,
        productId: createdProduct.id,
      };
      initCategories.push(categoryObj);
    }

    const createdImagesData = await prisma.productImage.createManyAndReturn({
      data: initCategories,
    });

    return { createdProduct, createdImagesData };
  },
};
