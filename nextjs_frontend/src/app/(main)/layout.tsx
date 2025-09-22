import { MainContent } from "@/components/layouts/main/content";
import { MainHeader } from "@/components/layouts/main/header/header";
import MainSidebar from "@/components/layouts/main/sidebar/sidebar";
import { SidebarProvider } from "@/components/providers/sidebar-provider";
import { AuthClient } from "@/utils/auth.utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const { user } = await AuthClient.getInstance().getAuthenticatedUser(
    "layout"
  );
  return (
    <SidebarProvider>
      <div className="min-h-svh flex">
        <MainSidebar user={user} />
        <div className="flex-1 flex flex-col overflow-hidden ">
          <MainHeader />
          <MainContent>{children}</MainContent>
        </div>
      </div>
    </SidebarProvider>
  );
}
