"use server";

import { ACTION_CONFIG } from "@/configs/action.config";
import { InitialFormState } from "@/interfaces/actions/action";
import { actionResponse } from "@/utils/response-builder.utils";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  updateStockProduct,
  updateUnitPriceProduct,
} from "../services/product.service";
import { AdjustStockProductEnum } from "../services/product.enum";

export async function createProductAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    productName: formData.get("product-name") as string,
    productDescription: (() => {
      const value = formData.get("product-description") as string;
      return value.trim() !== "" ? value : null;
    })(),
    productStockLevel: (() => {
      const value = formData.get("product-stock-level") as string;
      return Number.parseInt(value);
    })(),
    productUnitPrice: (() => {
      const value = formData.get("product-unit-price") as string;
      return Number.parseFloat(value);
    })(),
    categoryId: formData.get("product-category-id") as string,
    supplierId: formData.get("supplier-id") as string,
    productImage: formData.get("product-image") as File | null,
  };

  const result = await createProduct(rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
      error: result.error,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.SAVED,
    });
  }
}

export async function updateProductAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    productId: formData.get("product-id") as string,
    productName: formData.get("product-name") as string,
    productDescription: (() => {
      const value = formData.get("product-description") as string;
      return value.trim() !== "" ? value : null;
    })(),
    categoryId: formData.get("product-category-id") as string,
    supplierId: formData.get("supplier-id") as string,
    productImage: formData.get("product-image") as File | null,
  };

  const { productId, ...data } = rawData;

  const result = await updateProduct(productId, data);

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

export async function deleteProductAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    productId: formData.get("product-id") as string,
  };

  const result = await deleteProduct(rawData.productId);

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

export async function updateStockProductAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    productId: formData.get("product-id") as string,
    quantity: (() => {
      const value = formData.get("quantity") as string;
      return Number.parseInt(value);
    })(),
    adjustStockType: formData.get(
      "adjust-stock-type"
    ) as AdjustStockProductEnum,
  };

  const { productId, ...data } = rawData;

  const result = await updateStockProduct(productId, data);

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

export async function updateUnitPriceProductAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    productId: formData.get("product-id") as string,
    productUnitPrice: (() => {
      const value = formData.get("product-unit-price") as string;
      return Number.parseFloat(value);
    })(),
  };

  const { productId, ...data } = rawData;

  const result = await updateUnitPriceProduct(productId, data);

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
