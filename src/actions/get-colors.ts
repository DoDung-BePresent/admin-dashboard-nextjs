"use server";

import prisma from "@/lib/prisma";

export const getColors = async (storeId: string) => {
  const colors = await prisma.color.findMany({
    where: {
      storeId,
      NOT: {
        isDeleted: true,
      },
    },
  });

  return colors;
};
