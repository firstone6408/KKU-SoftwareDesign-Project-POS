"use server";

import { InitialFormState } from "@/interfaces/actions/action";
import { actionResponse } from "@/utils/response-builder.utils";
import { createProductCategory } from "../services/productcategory.service";

export async function createProductCategoryAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    name: formData.get("productcategory-name") as string,
  };

  await createProductCategory(rawData);

  return actionResponse({
    message: "",
    status: "success",
  });
}
