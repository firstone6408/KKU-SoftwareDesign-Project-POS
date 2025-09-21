"use server";

import { InitialFormState } from "@/interfaces/actions/action";
import { actionResponse } from "@/utils/response-builder.utils";
import {
  createSupplier,
  deleteSupplier,
  updateSupplier,
} from "../services/supplier.service";
import { ACTION_CONFIG } from "@/configs/action.config";

export async function createSupplierAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    supplierName: formData.get("supplier-name") as string,
    supplierContactInfo: (() => {
      const value = formData.get("supplier-contact-info") as string;
      return value.trim() !== "" ? value : null;
    })(),
  };

  const result = await createSupplier(rawData);

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

export async function deleteSupplierAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    supplierId: formData.get("supplier-id") as string,
  };

  const result = await deleteSupplier(rawData);

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

export async function updateSupplierAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    supplierId: formData.get("supplier-id") as string,
    supplierName: formData.get("supplier-name") as string,
    supplierContactInfo: (() => {
      const value = formData.get("supplier-contact-info") as string;
      return value.trim() !== "" ? value : null;
    })(),
  };

  const { supplierId, ...data } = rawData;

  const reuslt = await updateSupplier(supplierId, data);

  if (reuslt && reuslt.message) {
    return actionResponse({
      status: "expected-error",
      message: reuslt.message,
      error: reuslt.error,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.UPDATED,
    });
  }
}
