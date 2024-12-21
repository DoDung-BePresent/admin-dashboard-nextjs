import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ storeId: string; productId: string }> }
) => {
  try {
    const { userId } = await auth();

    const { storeId, productId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required!", { status: 400 });
    }

    if (!productId) {
      return new NextResponse("Product Id is required!", { status: 400 });
    }

    const storeByUserId = await prisma.store.findUnique({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        brand: true,
        category: true,
        colors: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]:", error);
    return new NextResponse("Internal Server Error:", { status: 500 });
  }
};
