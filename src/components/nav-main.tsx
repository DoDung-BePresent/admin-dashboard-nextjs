"use client";

import { ChevronRight, Palette, Tags } from "lucide-react";

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

import { LayoutDashboard, Shirt } from "lucide-react";

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
          url: `/stores/${storeId}/products`,
          isActive: pathname === `/stores/${storeId}/products`,
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
          url: `/stores/${storeId}/categories`,
          isActive: pathname === `/stores/${storeId}/categories`,
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
          isActive: pathname === `/stores/${storeId}/brands`,
        },
        {
          title: "Add new brand",
          url: `/stores/${storeId}/brands/add`,
          isActive: pathname === `/stores/${storeId}/brands/add`,
        },
      ],
    },
    {
      title: "Colors",
      url: "#",
      icon: Palette,
      items: [
        {
          title: "List",
          url: `/stores/${storeId}/colors`,
          isActive: pathname === `/stores/${storeId}/colors`,
        },
        {
          title: "Add new color",
          url: `/stores/${storeId}/colors/add`,
          isActive: pathname === `/stores/${storeId}/colors/add`,
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
