"use client";

import { ChevronRight, Tags, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { LayoutDashboard, Shirt, SquareTerminal } from "lucide-react";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";

export function NavMain() {
  const pathname = usePathname();
  const { storeId } = useParams<{ storeId: string }>();

  const items = [
    {
      title: "Products",
      url: "#",
      icon: Shirt,
      items: [
        {
          title: "List",
          url: "#",
          isActive: false,
        },
        {
          title: "Add new product",
          url: `/stores/${storeId}/products/add`,
          isActive: pathname === `/stores/${storeId}/products/add`,
        },
      ],
    },
    {
      title: "Categories",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "List",
          url: "/stores/dfgd/categories",
          isActive: false,
        },
        {
          title: "Add new category",
          url: `/stores/${storeId}/categories/add`,
          isActive: pathname === `/stores/${storeId}/categories/add`,
        },
      ],
    },
    {
      title: "Brands",
      url: "#",
      icon: Tags,
      items: [
        {
          title: "List",
          url: `/stores/${storeId}/brands`,
          isActive: false,
        },
        {
          title: "Add new brand",
          url: `/stores/${storeId}/brands/add`,
          isActive: pathname === `/stores/${storeId}/brands/add`,
        },
      ],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Management</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.items.some((subItem) => subItem.isActive)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link
                          href={subItem.url}
                          className={cn({
                            "bg-sidebar-accent": subItem.isActive === true,
                          })}
                        >
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
