import { getGlobalTag, getIdTag } from "@/utils/cache.utils";
import { revalidateTag } from "next/cache";

// เก็บข้อมูล Array
export function getSupplierGlobalTag() {
  return getGlobalTag("suppliers");
}

// ข้อมูลเดียว
export function getSupplierIdTag(supplierId: string) {
  return getIdTag("suppliers", supplierId);
}

export function revalidateSupplierCache(supplierId: string) {
  revalidateTag(getSupplierGlobalTag());
  revalidateTag(getSupplierIdTag(supplierId));
}
