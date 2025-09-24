"use server";

import { InitialFormState } from "@/interfaces/actions/action";
import { actionResponse } from "@/utils/response-builder.utils";
import { createOrder } from "../services/order.service";

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
