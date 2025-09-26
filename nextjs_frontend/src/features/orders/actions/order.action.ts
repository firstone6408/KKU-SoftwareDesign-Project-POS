"use server";

import { InitialFormState } from "@/interfaces/actions/action";
import { actionResponse } from "@/utils/response-builder.utils";
import {
  createOrder,
  deleteItemInOrder,
  addItemInOrder,
  saveSummaryOrder,
  paymentOrder,
  closeOrder,
  deleteOrder,
  deletePaymentOrder,
  cancelOrder,
} from "../services/order.service";
import { ACTION_CONFIG } from "@/configs/action.config";
import { OrderPaymentMethodEnum } from "../services/order.enum";

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
    productId: formData.get("product-id") as string,
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

export async function paymentOrderAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    orderId: formData.get("order-id") as string,
    orderPaidAmount: Number.parseFloat(
      formData.get("order-paid-amount") as string
    ),
    orderDiscount: Number.parseFloat(
      formData.get("order-discount") as string
    ),
    orderPaymentMethod: formData.get(
      "order-payment-method"
    ) as OrderPaymentMethodEnum,
    orderSlipImage: formData.get("order-slip-image") as File,
    orderInoviceDate: formData.get("order-inovice-date") as string,
  };

  const { orderId, ...data } = rawData;
  const result = await paymentOrder(orderId, data);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
      error: result.error,
    });
  } else {
    return actionResponse({
      status: "success",
      message: "ชำระเงินสำเร็จ",
    });
  }
}

export async function deletePaymentOrderAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    orderId: formData.get("order-id") as string,
  };

  const result = await deletePaymentOrder(rawData.orderId);

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

export async function closeOrderAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    orderId: formData.get("order-id") as string,
  };

  const result = await closeOrder(rawData.orderId);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
    });
  } else {
    return actionResponse({
      status: "success",
      message: "ปิดรายการสำเร็จ",
    });
  }
}

export async function cancelOrderAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    orderId: formData.get("order-id") as string,
  };

  const result = await cancelOrder(rawData.orderId);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
    });
  } else {
    return actionResponse({
      status: "success",
      message: "ยกเลิกการขายสำเร็จ",
    });
  }
}

export async function deleteOrderAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    orderId: formData.get("order-id") as string,
  };

  const result = await deleteOrder(rawData.orderId);

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
