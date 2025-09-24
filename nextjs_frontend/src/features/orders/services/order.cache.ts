import { getGlobalTag, getIdTag } from "@/utils/cache.utils";
import { revalidateTag } from "next/cache";

export function getOrderGlobalTag() {
  return getGlobalTag("orders");
}

export function getOrderIdTag(orderId: string) {
  return getIdTag("orders", orderId);
}

export function revalidateOrderCache(orderId: string) {
  revalidateTag(getOrderGlobalTag());
  revalidateTag(getOrderIdTag(orderId));
}
