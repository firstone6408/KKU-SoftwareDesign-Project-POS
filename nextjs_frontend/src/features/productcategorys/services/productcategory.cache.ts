import { getGlobalTag, getIdTag } from "@/utils/cache.utils";
import { revalidateTag } from "next/cache";

// เก็บข้อมูล Array
export function getCustomerGlobalTag() {
  return getGlobalTag("customers");
}

// ข้อมูลเดัียว
export function getCustomerIdTag(customerId: string) {
  return getIdTag("customers", customerId);
}

export function revalidateCustomerCache(customerId: string) {
  revalidateTag(getCustomerGlobalTag());
  revalidateTag(getCustomerIdTag(customerId));
}
