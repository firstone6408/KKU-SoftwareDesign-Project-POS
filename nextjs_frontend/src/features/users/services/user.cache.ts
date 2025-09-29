import { getGlobalTag, getIdTag } from "@/utils/cache.utils";
import { revalidateTag } from "next/cache";

export function getUserGlobalTag() {
  return getGlobalTag("users");
}

export function getUserIdTag(userId: string) {
  return getIdTag("users", userId);
}

export function revalidateUserCache(userId: string) {
  revalidateTag(getUserGlobalTag());
  revalidateTag(getUserIdTag(userId));
}
