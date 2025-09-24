import { ACTION_CONFIG } from "@/configs/action.config";
import { ICreateOrder } from "./order.interface";
import { FeatureServiceUtil } from "@/utils/service.utils";
import {
  templateValidateResponse,
  withApiHandling,
} from "@/utils/api.utils";
import axios from "axios";
import { API_CONFIG } from "@/configs/api.config";
import { buildHeadersUtil } from "@/utils/http-headers.utils";
import { revalidateOrderCache } from "./order.cache";
import z from "zod";

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
