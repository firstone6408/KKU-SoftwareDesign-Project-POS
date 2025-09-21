"use client";

interface MainContentProps {
  children: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  // const { isSidebarOpen } = useSidebar();
  // console.log(isSidebarOpen);

  return (
    <main
      className={`flex-1 overflow-y-auto  pt-16 ml-0 md:ml-64 transition-all duration-300`}
    >
      {children}
    </main>
  );
}
