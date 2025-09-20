import { getGlobalTag, getIdTag } from "@/utils/cache.utils";
import { revalidateTag } from "next/cache";

export function getCustomerGlobalTag() {
  return getGlobalTag("customers");
}

export function getCustomerIdTag(customerId: string) {
  return getIdTag("customers", customerId);
}

export function revalidateCustomerCache(customerId: string) {
  revalidateTag(getCustomerGlobalTag());
  revalidateTag(getCustomerIdTag(customerId));
}
