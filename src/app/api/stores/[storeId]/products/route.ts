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

    const {
      name,
      brand,
      category,
      description,
      price,
      discount,
      quantity,
      gender,
      sizes,
      colors,
      images,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required!", { status: 400 });
    }

    if (
      !name ||
      !brand ||
      !category ||
      !description ||
      !price ||
      !quantity ||
      !gender ||
      !sizes ||
      !colors ||
      !images
    ) {
      return new NextResponse("Required fields cannot be empty!", {
        status: 400,
      });
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

    await prisma.product.create({
      data: {
        name,
        description,
        storeId,
        brandId: brand,
        categoryId: category,
        price,
        discount,
        quantity,
        gender,
        sizes,
        colorIDs: colors,
        images: {
          create: images,
        },
      },
    });

    return NextResponse.json(
      { message: "Create new product successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.log("[PRODUCT_POST]:", error);
    return new NextResponse("Internal Server Error:", { status: 500 });
  }
};
