"use client";

import { useSidebar } from "@/components/providers/sidebar-provider";

interface MainContentProps {
  children: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  const { isSidebarOpen } = useSidebar();
  // console.log(isSidebarOpen);

  return (
    <main
      className={`flex-1 overflow-y-auto ${
        isSidebarOpen ? "md:ms-64" : "ms-0 md:ms-16"
      } pt-16 md:pt-0 transition-all duration-300`}
    >
      {children}
    </main>
  );
}
