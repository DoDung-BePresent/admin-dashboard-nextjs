"use server";

import prisma from "@/lib/prisma";

export const getCategories = async (storeId: string) => {
  const categories = await prisma.category.findMany({
    where: {
      storeCategories: {
        some: { storeId },
      },
    },
  });

  return categories;
};
