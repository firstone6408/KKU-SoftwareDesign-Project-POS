import axios from "axios";
import { upsertCustomerSchema } from "../schemas/upsert-user.schema";
import { IDeleteCustomer, IUpsertCustomer } from "./customer.interface";
import { API_CONFIG } from "@/configs/api.config";
import {
  templateValidateResponse,
  withApiHandling,
} from "@/utils/api.utils";
import { configureCache } from "@/utils/cache.utils";
import {
  getCustomerGlobalTag,
  revalidateCustomerCache,
} from "./customer.cache";
import z from "zod";
import { customerSchema } from "../schemas/customer.schema";
import { ACTION_CONFIG } from "@/configs/action.config";
import { FeatureServiceUtil } from "@/utils/service.utils";
import { buildHeadersUtil } from "@/utils/http-headers.utils";

export async function createCustomer(input: IUpsertCustomer) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    const { success, error, data } = upsertCustomerSchema.safeParse(input);
    console.log(error);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    const requsetBody = {
      name: data.customerName,
      contactInfo: data.customerContactInfo,
    };

    const { result, error: resErr } = await withApiHandling(
      axios.post(API_CONFIG.BASE_URL + "/api/customers", requsetBody, {
        headers: buildHeadersUtil({ token: token }),
      }),
      {
        option: {
          validateResponse: templateValidateResponse(customerSchema),
        },
      }
    );

    // check server error
    if (resErr.status === "error") {
      // console.log("Response Error: " + resErr.errorMessage);
      return {
        message: resErr.errorMessage,
      };
    }

    // clear cache
    revalidateCustomerCache(result.data.id);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function deleteCustomer(input: IDeleteCustomer) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    const { error } = await withApiHandling(
      axios.delete(
        API_CONFIG.BASE_URL + "/api/customers/" + input.customerId,
        { headers: buildHeadersUtil({ token: token }) }
      )
    );

    if (error.status === "error") {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.SERVER,
      };
    }

    revalidateCustomerCache(input.customerId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function updateCustomer(
  customerId: string,
  input: IUpsertCustomer
) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // validate
    const { success, error, data } = upsertCustomerSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre requsetBody
    const requsetBody = {
      name: data.customerName,
      contactInfo: data.customerContactInfo,
    };

    // api
    const { error: resErr } = await withApiHandling(
      axios.put(
        API_CONFIG.BASE_URL + "/api/customers/" + customerId,
        requsetBody,
        { headers: buildHeadersUtil({ token: token }) }
      )
    );

    if (resErr.status === "error") {
      return {
        message: resErr.errorMessage,
      };
    }

    // clear cache
    revalidateCustomerCache(customerId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function getCustomerList(token: string) {
  "use cache";
  configureCache({
    life: "hours",
    tag: getCustomerGlobalTag(),
  });
  try {
    const { result, error } = await withApiHandling(
      axios.get(API_CONFIG.BASE_URL + "/api/customers", {
        headers: buildHeadersUtil({ token: token }),
      }),
      {
        option: {
          validateResponse: templateValidateResponse(
            z.array(customerSchema)
          ),
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
