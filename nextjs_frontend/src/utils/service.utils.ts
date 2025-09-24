import { redirect } from "next/navigation";
import { CookieUtil } from "./cookie.utils";

export const FeatureServiceUtil = {
  async getToken() {
    const token = await CookieUtil.getToken();
    if (!token) {
      redirect("/auth/sign-in");
    }
    return token;
  },
};
