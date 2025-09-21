import { getCurrentUser } from "@/features/auth/services/auth.service";
import { CookieUtil } from "./cookie.utils";
import { redirect } from "next/navigation";

export async function getAuthenticatedUser() {
  const token = await CookieUtil.getToken();
  if (!token) {
    redirect("/auth/sign-in");
  }

  const user = await getCurrentUser();
  if (!user) {
    await CookieUtil.deleteToken();
    redirect("/auth/sign-in");
  }

  return { user };
}
