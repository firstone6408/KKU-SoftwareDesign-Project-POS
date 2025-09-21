import { getGlobalTag, getIdTag } from "@/utils/cache.utils";
import { revalidateTag } from "next/cache";

// เก็บข้อมูล Array
export function getProductCategoryGlobalTag() {
  return getGlobalTag("product-categories");
}

// ข้อมูลเดัียว
export function getProductCategoryIdTag(productCategoryId: string) {
  return getIdTag("product-categories", productCategoryId);
}

export function revalidateProductCategoryCache(productCategoryId: string) {
  revalidateTag(getProductCategoryGlobalTag());
  revalidateTag(getProductCategoryIdTag(productCategoryId));
}
