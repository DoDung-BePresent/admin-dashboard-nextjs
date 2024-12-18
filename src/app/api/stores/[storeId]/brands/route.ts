import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) => {
  try {
    const { userId } = await auth();
    const { storeId } = await params;

    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
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

    const newBrand = await prisma.brand.create({
      data: {
        name,
        store: {
          connect: {
            id: storeId,
          },
        },
      },
    });

    return NextResponse.json(newBrand);
  } catch (error) {
    console.log("[BRAND_POST]:", error);
    return new NextResponse("Internal Server Error:", { status: 500 });
  }
};
