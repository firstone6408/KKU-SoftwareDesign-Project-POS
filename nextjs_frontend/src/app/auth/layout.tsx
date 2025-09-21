import { CookieUtil } from "@/utils/cookie.utils";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const token = await CookieUtil.getToken();

  if (token) {
    redirect("/");
  }

  return (
    <div className="min-h-svh flex flex-col justify-center bg-muted">
      <main>{children}</main>
    </div>
  );
}
