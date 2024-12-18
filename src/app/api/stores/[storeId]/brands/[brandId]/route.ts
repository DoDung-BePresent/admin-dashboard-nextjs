import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ storeId: string; brandId: string }> }
) => {
  try {
    const { userId } = await auth();
    const { storeId, brandId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required!", { status: 400 });
    }

    if (!brandId) {
      return new NextResponse("Brand Id is required!", { status: 400 });
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

    const brand = await prisma.brand.findUnique({
      where: {
        id: brandId,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRAND_GET]:", error);
    return new NextResponse("Internal Server Error:", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ storeId: string; brandId: string }> }
) => {
  try {
    const { userId } = await auth();
    const { storeId, brandId } = await params;

    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required!", { status: 400 });
    }

    if (!brandId) {
      return new NextResponse("Brand Id is required!", { status: 400 });
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

    const brand = await prisma.brand.update({
      where: {
        id: brandId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRAND_PATCH]:", error);
    return new NextResponse("Internal Server Error:", { status: 500 });
  }
};

export const DELETE = async (
  _req: Request,
  { params }: { params: Promise<{ storeId: string; brandId: string }> }
) => {
  try {
    const { userId } = await auth();

    const { storeId, brandId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required!", { status: 400 });
    }

    if (!brandId) {
      return new NextResponse("Brand Id is required!", { status: 400 });
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

    await prisma.brand.update({
      where: {
        id: brandId,
      },
      data: {
        isDeleted: true,
      },
    });

    return new NextResponse("Brand deleted successfully", { status: 200 });
  } catch (error) {
    console.log("[BRAND_DELETE]:", error);
    return new NextResponse("Internal Server Error:", { status: 500 });
  }
};
