import StoreForm from "@/components/store/store-form";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";

const SetupPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/stores/${store.id}`);
  }

  return (
    <div className="">
      <div className="grid md:grid-cols-2 h-screen">
        <div className="md:flex hidden flex-col items-center justify-center">
          <Image
            src="/setup-banner.png"
            width={500}
            height={1000}
            alt="Setup banner"
            className="object-cover"
          />
        </div>
        <div className="border-l flex flex-col items-center justify-center">
          <div className="w-[400px]">
            <h2 className="font-semibold text-center mb-4">Create new store</h2>
            <StoreForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
