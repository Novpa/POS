import { Product } from "../../generated/prisma/client";
import { prisma } from "../config/config.prisma";
import { cloudinaryUpload } from "../utils/cloudinary.utils";

export const menusSerivice = {
  createMenu: async (
    files: Express.Multer.File[],
    { name, price, categoryId }: Pick<Product, "name" | "price" | "categoryId">,
  ) => {
    // using cloudinary
    const res = files?.map(async (file: any) => {
      const cloudData = await cloudinaryUpload(file.buffer);

      return {
        url: cloudData.secureUrl,
        // productId: createdProduct.id,
      };
    });

    const imageUrls = await Promise.all(res);

    const { createdProduct, createdImagesData } = await prisma.$transaction(
      async (tx) => {
        const createdProduct = await tx.product.create({
          data: {
            name,
            price,
            categoryId,
          },
        });

        const imagesInsertData = imageUrls?.map((image) => {
          return {
            url: image.url,
            productId: createdProduct.id,
          };
        });

        // using diskMemorry
        // const initCategories = [];
        // console.log(files);
        // for (const file of files) {
        //   const categoryObj = {
        //     url: file.filename,
        //     productId: createdProduct.id,
        //   };
        //   initCategories.push(categoryObj);
        // }

        const createdImagesData = await tx.productImage.createManyAndReturn({
          data: imagesInsertData,
        });

        return { createdProduct, createdImagesData };
      },
    );

    return { createdProduct, createdImagesData };
  },
};
