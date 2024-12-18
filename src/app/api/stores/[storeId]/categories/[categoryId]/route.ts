import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ storeId: string; categoryId: string }> }
) => {
  try {
    const { userId } = await auth();
    const { storeId, categoryId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required!", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category Id is required!", { status: 400 });
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

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]:", error);
    return new NextResponse("Internal Server Error:", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ storeId: string; categoryId: string }> }
) => {
  try {
    const { userId } = await auth();
    const { storeId, categoryId } = await params;

    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required!", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category Id is required!", { status: 400 });
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

    const category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]:", error);
    return new NextResponse("Internal Server Error:", { status: 500 });
  }
};

export const DELETE = async (
  _req: Request,
  { params }: { params: Promise<{ storeId: string; categoryId: string }> }
) => {
  try {
    const { userId } = await auth();

    const { storeId, categoryId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required!", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category Id is required!", { status: 400 });
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

    await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        isDeleted: true,
      },
    });

    return new NextResponse("Category deleted successfully", { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_DELETE]:", error);
    return new NextResponse("Internal Server Error:", { status: 500 });
  }
};
