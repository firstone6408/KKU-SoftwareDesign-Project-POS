/** @format */
"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/providers/sidebar-provider";
import {
  Clipboard,
  FolderTree,
  LayoutDashboard,
  LogOut,
  ShoppingCart,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import SidebarLink from "./sidebar-link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/features/auth/components/logout-button";
import { IUser } from "@/features/users/schemas/user.schema";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SidebarLinkType {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const SIDE_BAR_LINKS: SidebarLinkType[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: "ลูกค้า",
    href: "/customers",
    icon: <Users size={20} />,
  },
  {
    label: "ประเภทสินค้า",
    href: "/categories",
    icon: <FolderTree size={20} />,
  },
  {
    label: "สินค้า",
    href: "/products",
    icon: <ShoppingCart size={20} />,
  },
  {
    label: "รายการสั่งซื้อ",
    href: "/orders",
    icon: <Clipboard size={20} />,
  },
  {
    label: "ผู้จัดจำหน่าย",
    href: "/suppliers",
    icon: <User size={20} />,
  },
];

interface MainSidebarProps {
  user: IUser;
}

export default function MainSidebar({ user }: MainSidebarProps) {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  // ใช้เพื่อทำ Link Active
  const pathname = usePathname();

  return (
    <div>
      {/* Moblie Overlay */}
      {/* ให้กดตรงไหนก็ได้ แล้วให้ปิด sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => toggleSidebar()}
        />
      )}

      {/* Sidebar */}
      <aside
        // การกำหนดการ หุบของ sidebar ถ้ามือถือให้หุบ ถ้าจอใหญ่ไม่ต้องหุบ
        className={cn(
          "fixed top-0 start-0 z-40 h-svh w-64 bg-card border-r rounded-r-xl md:rounded-none flex flex-col transition-all duration-300",
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b bg-log">
          {/* Logo */}
          <Link href={"/"} className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded-md">
              <span className="text-secondary font-bold">KKU</span>
            </div>
            <span className="text-xl font-bold">Point of sale</span>
          </Link>

          {/* Toggle Sidebar Button */}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="md:hidden"
            onClick={() => toggleSidebar()}
          >
            <X size={20} />
          </Button>
        </div>

        {/* Main Content Area */}
        {/* h-[calc(100wv-128px)] คือ ถ้าจอสูงแค่ไหนจะถูกลบไป 128px */}
        <div className="flex-1 h-[calc(100wv-128px)] overflow-hidden">
          <ScrollArea className=" ">
            <div className="p-4">
              {/* Profile box */}
              <div className="flex items-center gap-3 bg-muted p-3 rounded-lg mb-6">
                <Avatar className="size-10 border-2 border-primary shadow">
                  {/* <AvatarImage
                    src={user.picture || undefined}
                    alt={`${user.email}-image-profile`}
                  /> */}
                  <AvatarFallback className="text-lg">
                    {user.name
                      ? user.name.slice(0, 2).toUpperCase()
                      : user.email.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold leading-none">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Menu */}
              <nav className="space-y-1.5">
                {SIDE_BAR_LINKS.map((sidebarLink, index) => (
                  <SidebarLink
                    key={index}
                    label={sidebarLink.label}
                    href={sidebarLink.href}
                    icon={sidebarLink.icon}
                    isActive={pathname === sidebarLink.href}
                    onClose={() => toggleSidebar()}
                  />
                ))}
              </nav>
            </div>
          </ScrollArea>
        </div>
        {/* Sign Out Button */}
        <div className="border-t p-4 space-y-2">
          <LogoutButton
            variant={"destructive"}
            size={"lg"}
            className="w-full justify-start gap-3 hover:cursor-pointer font-semibold"
            icon={LogOut}
          >
            <span>ออกจากระบบ</span>
          </LogoutButton>
        </div>
      </aside>
    </div>
  );
}
