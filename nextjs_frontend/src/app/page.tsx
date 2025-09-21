// export default function Home() {
//   return (
//   <div className="main-container">Hello World</div>;
// }
import { MainContent } from "@/components/layouts/main/content";
import { MainHeader } from "@/components/layouts/main/header/header";
import MainSidebar from "@/components/layouts/main/sidebar/sidebar";
import { SidebarProvider } from "@/components/providers/sidebar-provider";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-svh flex">
        <MainSidebar />
        <div className="flex-1 flex flex-col overflow-hidden ">
          <MainHeader />
          <div className="main-container">Hello World</div>
          <MainContent>{children}</MainContent>
        </div>
      </div>
    </SidebarProvider>
  );
}
