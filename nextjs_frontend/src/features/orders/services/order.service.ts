import { ACTION_CONFIG } from "@/configs/action.config";
import {
  ICreateOrder,
  IDeleteItemInOrder,
  IAddItemInOrder,
  ISaveSummaryOrder,
  IPaymentOrder,
} from "./order.interface";
import { FeatureServiceUtil } from "@/utils/service.utils";
import {
  templateValidateResponse,
  withApiHandling,
} from "@/utils/api.utils";
import axios from "axios";
import { API_CONFIG } from "@/configs/api.config";
import { buildHeadersUtil } from "@/utils/http-headers.utils";
import {
  getOrderGlobalTag,
  getOrderIdTag,
  revalidateOrderCache,
} from "./order.cache";
import z from "zod";
import { configureCache } from "@/utils/cache.utils";
import { IOrder, orderSchema } from "../schemas/order.schema";
import { addItemInOrderSchema } from "../schemas/add-item-in-order.schema";
import { deleteItemInOrderSchema } from "../schemas/delete-item-in-order.schema";
import { saveSummaryOrderSchema } from "../schemas/save-summary-order.schema";
import { revalidateProductCache } from "@/features/products/services/product.cache";
import { paymentOrderSchema } from "../schemas/payment-order.schema";
import { getProductList } from "@/features/products/services/product.service";

export async function createOrder(input: ICreateOrder) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // request body
    const requestBody = {
      customerId: input.customerId,
    };

    // api
    const { result, error } = await withApiHandling(
      axios.post(API_CONFIG.BASE_URL + "/api/orders", requestBody, {
        headers: buildHeadersUtil({ token: token }),
      }),
      {
        option: {
          validateResponse: templateValidateResponse(
            z.object({
              orderId: z.string(),
            })
          ),
        },
      }
    );

    if (error.status === "error") {
      console.error(error.errorMessage);
      return {
        message: error.errorMessage,
      };
    }

    // clear cache
    revalidateOrderCache(result.data.orderId);

    return result.data;
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function addItemInOrder(
  orderId: string,
  input: IAddItemInOrder
) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // validate
    const { success, error, data } = addItemInOrderSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre requset body
    const requestBody = {
      productId: data.productId,
      quantity: data.quantity,
      unitPrice: data.productUnitPrice,
    };

    // api
    const { error: responseError } = await withApiHandling(
      axios.put(
        API_CONFIG.BASE_URL + "/api/orders/" + orderId + "/add-item",
        requestBody,
        { headers: buildHeadersUtil({ token: token }) }
      )
    );

    if (responseError.status === "error") {
      console.error(responseError.errorMessage);
      return {
        message: responseError.errorMessage,
      };
    }

    // clear cache
    revalidateOrderCache(orderId);
    revalidateProductCache(data.productId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function deleteItemInOrder(
  orderId: string,
  orderItemId: string,
  input: IDeleteItemInOrder
) {
  try {
    // token
    const token = await FeatureServiceUtil.getToken();

    // validate
    const { success, error, data } =
      deleteItemInOrderSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre request body
    const requestBody = {
      quantity: data.quantity,
    };

    // api
    const { error: responseError } = await withApiHandling(
      axios.put(
        API_CONFIG.BASE_URL +
          "/api/orders/" +
          orderId +
          "/remove-item/" +
          orderItemId,
        requestBody,
        { headers: buildHeadersUtil({ token: token }) }
      )
    );

    if (responseError.status === "error") {
      console.error(error);
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.SERVER,
      };
    }

    // clear cache
    revalidateOrderCache(orderId);
    revalidateProductCache(input.productId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function saveSummaryOrder(
  orderId: string,
  input: ISaveSummaryOrder
) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // validate
    const { success, error, data } =
      saveSummaryOrderSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre request body
    const requestBody = {
      discount: data.orderDiscount,
      deliveryDate: data.orderDeliveryDate,
      note: data.orderNote,
    };

    // api
    const { error: responseError } = await withApiHandling(
      axios.put(
        API_CONFIG.BASE_URL + "/api/orders/" + orderId + "/save",
        requestBody,
        { headers: buildHeadersUtil({ token: token }) }
      )
    );
    if (responseError.status === "error") {
      console.error(responseError.errorMessage);
      return {
        message: responseError.errorMessage,
      };
    }

    // clear cache
    revalidateOrderCache(orderId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function paymentOrder(orderId: string, input: IPaymentOrder) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // validate
    const { success, error, data } = paymentOrderSchema.safeParse(input);

    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre request body
    const requestBody = new FormData();
    requestBody.append("discount", data.orderDiscount.toString());
    requestBody.append("slipImage", data.orderSlipImage);
    requestBody.append("paidAmount", data.orderPaidAmount.toString());
    requestBody.append("paymentMethod", data.orderPaymentMethod);
    requestBody.append("inoviceDate", data.orderInoviceDate);

    // api
    const { error: responseError } = await withApiHandling(
      axios.post(
        API_CONFIG.BASE_URL + "/api/orders/" + orderId + "/payment",
        requestBody,
        { headers: buildHeadersUtil({ token: token }) }
      )
    );

    if (responseError.status === "error") {
      console.error(responseError.errorMessage);
      return {
        message: responseError.errorMessage,
      };
    }

    // clear cache
    revalidateOrderCache(orderId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function deletePaymentOrder(orderId: string) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // api
    const { error } = await withApiHandling(
      axios.delete(
        API_CONFIG.BASE_URL + "/api/orders/" + orderId + "/payment",
        {
          headers: buildHeadersUtil({ token: token }),
        }
      )
    );

    if (error.status === "error") {
      return {
        message: error.errorMessage,
      };
    }

    // clear cache
    revalidateOrderCache(orderId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function closeOrder(orderId: string) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // api
    const { error } = await withApiHandling(
      axios.put(
        API_CONFIG.BASE_URL + "/api/orders/" + orderId + "/close",
        undefined,
        {
          headers: buildHeadersUtil({ token: token }),
        }
      )
    );

    if (error.status === "error") {
      return {
        message: error.errorMessage,
      };
    }

    // clear cache
    revalidateOrderCache(orderId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function cancelOrder(orderId: string) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // api
    const { error } = await withApiHandling(
      axios.put(
        API_CONFIG.BASE_URL + "/api/orders/" + orderId + "/cancel",
        undefined,
        {
          headers: buildHeadersUtil({ token: token }),
        }
      )
    );

    if (error.status === "error") {
      return {
        message: error.errorMessage,
      };
    }

    // clear cache
    revalidateOrderCache(orderId);
    const products = await getProductList(token);
    for (const p of products) {
      revalidateProductCache(p.id);
    }
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function deleteOrder(orderId: string) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // api
    const { error } = await withApiHandling(
      axios.delete(API_CONFIG.BASE_URL + "/api/orders/" + orderId, {
        headers: buildHeadersUtil({ token: token }),
      })
    );

    if (error.status === "error") {
      return {
        message: error.errorMessage,
      };
    }

    // clear cache
    revalidateOrderCache(orderId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function getOrderList(token: string): Promise<IOrder[]> {
  "use cache";
  configureCache({
    life: "hours",
    tag: getOrderGlobalTag(),
  });

  try {
    const { result, error } = await withApiHandling(
      axios.get(API_CONFIG.BASE_URL + "/api/orders", {
        headers: buildHeadersUtil({ token: token }),
      }),
      {
        option: {
          validateResponse: templateValidateResponse(z.array(orderSchema)),
        },
      }
    );

    if (error.status === "error") {
      console.error(error.errorMessage);
      return [];
    }

    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getOrderById(
  token: string,
  orderId: string
): Promise<IOrder | null> {
  "use cache";
  configureCache({
    life: "hours",
    tag: getOrderIdTag(orderId),
  });

  try {
    // api
    const { result, error } = await withApiHandling(
      axios.get(API_CONFIG.BASE_URL + `/api/orders/${orderId}`, {
        headers: buildHeadersUtil({ token: token }),
      }),
      {
        option: {
          validateResponse: templateValidateResponse(orderSchema),
        },
      }
    );

    if (error.status === "error") {
      console.error(error.errorMessage);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
