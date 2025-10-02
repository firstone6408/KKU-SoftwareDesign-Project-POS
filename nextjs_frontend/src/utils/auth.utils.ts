import { getCurrentUser } from "@/features/auth/services/auth.service";
import { CookieUtil } from "./cookie.utils";
import { redirect } from "next/navigation";
import { IUser } from "@/features/users/schemas/user.schema";

interface IAuthenticatedUser {
  user: IUser;
  token: string;
}

export class AuthClient {
  private static instance: AuthClient;
  private cachedUser: IUser | null = null;
  private cachedToken: string | null = null;

  private constructor() {}

  public static getInstance(): AuthClient {
    if (!AuthClient.instance) {
      AuthClient.instance = new AuthClient();
    }
    return AuthClient.instance;
  }

  public async getAuthenticatedUser(
    from: "layout" | "page" = "page"
  ): Promise<IAuthenticatedUser> {
    const token = await CookieUtil.getToken();
    if (!token) redirect("/auth/sign-in");

    // ถ้า token เปลี่ยน ก็ล้าง cache
    if (token !== this.cachedToken) {
      this.cachedUser = null;
      this.cachedToken = null;
    }

    // ใช้ cache ถ้ามี
    if (this.cachedUser && this.cachedToken && from === "page") {
      return { user: this.cachedUser, token: this.cachedToken };
    }

    const user = await getCurrentUser(token);
    if (!user) {
      await CookieUtil.deleteToken();
      redirect("/auth/sign-in");
    }

    // เก็บ cache
    this.cachedUser = user;
    this.cachedToken = token;

    return { user, token };
  }

  public clearCache() {
    this.cachedUser = null;
    this.cachedToken = null;
  }
}
