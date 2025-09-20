"use server";

import { InitialFormState } from "@/interfaces/actions/action";
import { actionResponse } from "@/utils/response-builder.utils";
import { createCustomer } from "../services/productcategory.service";

export async function createCustomerAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    name: formData.get("customer-name") as string,
    contract: formData.get("customer-contract") as string,
  };

  await createCustomer(rawData);

  return actionResponse({
    message: "",
    status: "success",
  });
}
