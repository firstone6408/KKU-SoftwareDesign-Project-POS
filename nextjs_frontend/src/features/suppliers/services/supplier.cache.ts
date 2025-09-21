import { getGlobalTag, getIdTag } from "@/utils/cache.utils";
import { revalidateTag } from "next/cache";

export function getSupplierGlobalTag() {
  return getGlobalTag("suppliers");
}

export function getSupplierIdTag(supplierId: string) {
  return getIdTag("suppliers", supplierId);
}

export function revalidateSupplierCache(supplierId: string) {
  revalidateTag(getSupplierGlobalTag());
  revalidateTag(getSupplierIdTag(supplierId));
}
