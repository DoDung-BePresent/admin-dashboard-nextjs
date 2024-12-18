import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ storeId: string; colorId: string }> }
) => {
  try {
    const { userId } = await auth();

    const { storeId, colorId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required!", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color Id is required!", { status: 400 });
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

    const color = await prisma.color.findUnique({
      where: {
        id: colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]:", error);
    return new NextResponse("Internal Server Error:", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ storeId: string; colorId: string }> }
) => {
  try {
    const { userId } = await auth();

    const { storeId, colorId } = await params;

    const body = await req.json();

    const { name, code } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required!", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color Id is required!", { status: 400 });
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

    const color = await prisma.color.update({
      where: {
        id: colorId,
      },
      data: {
        name,
        code,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH]:", error);
    return new NextResponse("Internal Server Error:", { status: 500 });
  }
};

export const DELETE = async (
  _req: Request,
  { params }: { params: Promise<{ storeId: string; colorId: string }> }
) => {
  try {
    const { userId } = await auth();

    const { storeId, colorId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required!", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color Id is required!", { status: 400 });
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

    await prisma.color.update({
      where: {
        id: colorId,
      },
      data: {
        isDeleted: true,
      },
    });

    return new NextResponse("Color deleted successfully", { status: 200 });
  } catch (error) {
    console.log("[COLOR_DELETE]:", error);
    return new NextResponse("Internal Server Error:", { status: 500 });
  }
};
