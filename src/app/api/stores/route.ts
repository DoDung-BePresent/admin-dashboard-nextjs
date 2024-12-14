import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export const POST = async (req: Request) => {
  try {
    const { userId } = await auth();

    const body = await req.json();

    const { name, email } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    const store = await prisma.store.create({
      data: {
        name,
        userId,
        email,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
