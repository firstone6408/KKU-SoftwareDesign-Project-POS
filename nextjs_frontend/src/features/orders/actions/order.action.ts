"use server";

import { InitialFormState } from "@/interfaces/actions/action";
import { actionResponse } from "@/utils/response-builder.utils";
import {
  createOrder,
  deleteItemInOrder,
  addItemInOrder,
  saveSummaryOrder,
} from "../services/order.service";
import { ACTION_CONFIG } from "@/configs/action.config";

export async function createOrderAction(
  _prevState: InitialFormState,
  fromData: FormData
) {
  const rawData = {
    customerId: fromData.get("customer-id") as string,
  };

  const result = await createOrder(rawData);

  if (result && "message" in result) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
    });
  } else {
    return actionResponse({
      status: "success",
      message: "สร้างคำสั่งซื้อสำเร็จ",
      data: result,
    });
  }
}

export async function addItemInOrderAction(
  _prevState: InitialFormState,
  fromData: FormData
) {
  const rawData = {
    orderId: fromData.get("order-id") as string,
    productId: fromData.get("product-id") as string,
    productUnitPrice: Number(fromData.get("product-unit-price")),
    quantity: Number(fromData.get("quantity")),
  };

  const { orderId, ...data } = rawData;

  const result = await addItemInOrder(orderId, data);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
      error: result.error,
    });
  } else {
    return actionResponse({
      status: "success",
    });
  }
}

export async function deleteItemInOrderAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    orderId: formData.get("order-id") as string,
    orderItemId: formData.get("order-item-id") as string,
    quantity: Number(formData.get("quantity")),
  };

  const { orderId, orderItemId, ...data } = rawData;

  const result = await deleteItemInOrder(orderId, orderItemId, data);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
      error: result.error,
    });
  } else {
    return actionResponse({
      status: "success",
    });
  }
}

export async function saveSummaryOrderAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    orderId: formData.get("order-id") as string,
    orderDiscount: (() => {
      const value = Number(formData.get("order-discount") as string);
      return isNaN(value) ? 0 : value;
    })(),
    orderDeliveryDate: formData.get("order-delivery-date") as string,
    orderNote: (() => {
      const value = formData.get("order-note") as string;
      return value.trim() !== "" ? value : null;
    })(),
  };

  const { orderId, ...data } = rawData;

  const result = await saveSummaryOrder(orderId, data);

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
