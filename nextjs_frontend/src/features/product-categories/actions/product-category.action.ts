"use server";

import { InitialFormState } from "@/interfaces/actions/action";
import { actionResponse } from "@/utils/response-builder.utils";
import {
  createProductCategory,
  deleteProductCategory,
  updateProductCategory,
} from "../services/product-category.service";
import { ACTION_CONFIG } from "@/configs/action.config";

export async function createProductCategoryAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    productCategoryName: formData.get("product-category-name") as string,
  };

  const result = await createProductCategory(rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
      error: result.error,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.CREATED,
    });
  }
}

export async function deleteProductCategoryAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    productCategoryId: formData.get("product-category-id") as string,
  };

  const result = await deleteProductCategory(rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.DELETED,
    });
  }
}

export async function updateProductCategoryAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    productCategoryId: formData.get("product-category-id") as string,
    productCategoryName: formData.get("product-category-name") as string,
  };

  const { productCategoryId, ...data } = rawData;

  const result = await updateProductCategory(productCategoryId, data);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
      error: result.error,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.UPDATED,
    });
  }
}
