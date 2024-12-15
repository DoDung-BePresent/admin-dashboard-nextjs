"use server";

import prisma from "@/lib/prisma";

export const getBrands = async (storeId: string) => {
  const brands = await prisma.brand.findMany({
    where: {
      storeBrands: {
        some: { storeId },
      },
    },
  });

  return brands;
};
