import { Product } from "../../generated/prisma/client";
import { prisma } from "../config/config.prisma";
import { cloudinaryUpload } from "../utils/cloudinary.utils";
import { handlePrismaError } from "../utils/prismaErrorHandle";

export const menusSerivice = {
  // CREATE PRODUCT
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

  // UPDATE PRODUCTS
  updateMenu: async (
    productId: string,
    files: Express.Multer.File[],
    name: string,
    price: number,
    categoryId: string,
  ) => {
    try {
      let res;
      let imageUrls: any;
      if (files) {
        res = files?.map(async (file: any) => {
          const cloudData = await cloudinaryUpload(file.buffer);

          return {
            url: cloudData.secureUrl,
            // productId: createdProduct.id,
          };
        });
      }

      if (res) {
        imageUrls = await Promise.all(res);
      }

      const updatedProduct = await prisma.$transaction(async (tx) => {
        // update product
        const product = await tx.product.update({
          where: {
            id: productId,
          },
          data: {
            name: name || undefined,
            price: price || undefined,
            categoryId: categoryId || undefined,
          },
        });

        if (imageUrls.length) {
          await tx.productImage.deleteMany({
            where: {
              productId,
            },
          });

          const imagesInsertData = imageUrls?.map((image: any) => {
            return {
              url: image.url,
              productId: product.id,
            };
          });

          const image = await tx.productImage.createMany({
            data: imagesInsertData,
          });
        }

        return {
          product,
        };
      });

      return updatedProduct;
    } catch (error) {
      handlePrismaError(error);
    }
  },
};
