import { cookies } from "next/headers";

export class CookieUtil {
  public static async setToken(token: string) {
    const cookie = await cookies();
    cookie.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  public static async deleteToken() {
    const cookie = await cookies();
    cookie.delete("token");
  }

  public static async getToken() {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    return token;
  }
}
