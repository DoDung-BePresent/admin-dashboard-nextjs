import prisma from "@/lib/prisma";

import { redirect } from "next/navigation";

import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import StoreSwitcher from "./store-switcher";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <StoreSwitcher items={stores} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <div className="mx-auto mb-4 border w-fit p-1 px-5 rounded-md shadow-sm hover:shadow-md transition-shadow ease-in duration-150">
          <UserButton afterSignOutUrl="/" showName />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
