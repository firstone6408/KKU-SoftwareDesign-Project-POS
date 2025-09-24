import { getGlobalTag, getIdTag } from "@/utils/cache.utils";
import { revalidateTag } from "next/cache";

export function getProductGlobalTag() {
  return getGlobalTag("products");
}

export function getProductIdTag(productId: string) {
  return getIdTag("products", productId);
}

export function revalidateProductCache(productId: string) {
  revalidateTag(getProductGlobalTag());
  revalidateTag(getProductIdTag(productId));
}
