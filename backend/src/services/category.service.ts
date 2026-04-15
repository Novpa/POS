import { prisma } from "../config/config.prisma";

export const categoryService = {
  getAllCategories: async () => {
    const categories = await prisma.category.findMany();

    return categories;
  },
};
