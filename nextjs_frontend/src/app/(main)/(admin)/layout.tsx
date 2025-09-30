import { UserRoleEnum } from "@/features/users/services/user.enum";
import { AuthClient } from "@/utils/auth.utils";
import { redirect } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const { user } = await AuthClient.getInstance().getAuthenticatedUser();

  if (user.role !== UserRoleEnum.ADMIN) {
    redirect("/");
  }

  return children;
}
