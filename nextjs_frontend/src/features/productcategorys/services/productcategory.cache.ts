import { getGlobalTag, getIdTag } from "@/utils/cache.utils";
import { revalidateTag } from "next/cache";

// เก็บข้อมูล Array
export function getProductCategoryGlobalTag() {
  return getGlobalTag("product-types");
}

// ข้อมูลเดัียว
export function getProductCategoryIdTag(productcategoryId: string) {
  return getIdTag("product-types", productcategoryId);
}

export function revalidateProductCategoryCache(productcategoryId: string) {
  revalidateTag(getProductCategoryGlobalTag());
  revalidateTag(getProductCategoryIdTag(productcategoryId));
}
