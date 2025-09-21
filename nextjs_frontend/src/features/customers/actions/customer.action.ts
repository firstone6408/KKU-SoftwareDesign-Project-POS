"use server";

import { InitialFormState } from "@/interfaces/actions/action";
import { actionResponse } from "@/utils/response-builder.utils";
import {
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from "../services/customer.service";
import { ACTION_CONFIG } from "@/configs/action.config";

export async function createCustomerAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    customerName: formData.get("customer-name") as string,
    customerContactInfo: formData.get("customer-contact-info") as string,
  };

  const result = await createCustomer(rawData);

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

export async function deleteCustomerAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    customerId: formData.get("customer-id") as string,
  };

  const result = await deleteCustomer(rawData);

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

export async function updateCustomerAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    customerId: formData.get("customer-id") as string,
    customerName: formData.get("customer-name") as string,
    customerContactInfo: (() => {
      const value = formData.get("customer-contact-info") as string;
      return value && value.trim() !== "" ? value : null;
    })(),
  };

  const { customerId, ...data } = rawData;
  const result = await updateCustomer(customerId, data);

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
