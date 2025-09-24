import { ACTION_CONFIG } from "@/configs/action.config";
import { IDeleteSupplier, IUpsertSupplier } from "./supplier.interface";
import { upsertSupplierSchema } from "../schemas/upsert-supplier.schema";
import {
  templateValidateResponse,
  withApiHandling,
} from "@/utils/api.utils";
import axios from "axios";
import { API_CONFIG } from "@/configs/api.config";
import { configureCache } from "@/utils/cache.utils";
import {
  getSupplierGlobalTag,
  revalidateSupplierCache,
} from "./supplier.cache";
import { supplierSchema } from "../schemas/supplier.schema";
import z from "zod";
import { FeatureServiceUtil } from "@/utils/service.utils";
import { buildHeadersUtil } from "@/utils/http-headers.utils";

export async function createSupplier(input: IUpsertSupplier) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // validate
    const { success, error, data } = upsertSupplierSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre body
    const requestBody = {
      name: data.supplierName,
      contactInfo: data.supplierContactInfo,
    };

    // api
    const { result, error: responseError } = await withApiHandling(
      axios.post(API_CONFIG.BASE_URL + "/api/suppliers", requestBody, {
        headers: buildHeadersUtil({ token: token }),
      }),
      {
        option: {
          validateResponse: templateValidateResponse(supplierSchema),
        },
      }
    );
    if (responseError.status === "error") {
      return {
        message: responseError.errorMessage,
      };
    }

    // clear cache
    revalidateSupplierCache(result.data.id);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function deleteSupplier(input: IDeleteSupplier) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    const { error } = await withApiHandling(
      axios.delete(
        API_CONFIG.BASE_URL + "/api/suppliers/" + input.supplierId,
        { headers: buildHeadersUtil({ token: token }) }
      )
    );

    if (error.status === "error") {
      console.error(error.errorMessage);
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.SERVER,
      };
    }

    // clear cache
    revalidateSupplierCache(input.supplierId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function updateSupplier(
  supplierId: string,
  input: IUpsertSupplier
) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // validate
    const { success, error, data } = upsertSupplierSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre body
    const requestBody = {
      name: data.supplierName,
      contactInfo: data.supplierContactInfo,
    };

    const { error: responseError } = await withApiHandling(
      axios.put(
        API_CONFIG.BASE_URL + "/api/suppliers/" + supplierId,
        requestBody,
        { headers: buildHeadersUtil({ token: token }) }
      )
    );

    if (responseError.status === "error") {
      console.error(responseError.errorMessage);
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.SERVER,
      };
    }

    // clear cache
    revalidateSupplierCache(supplierId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function getSupplierList(token: string) {
  "use cache";
  configureCache({
    life: "hours",
    tag: getSupplierGlobalTag(),
  });

  try {
    const { result, error } = await withApiHandling(
      axios.get(API_CONFIG.BASE_URL + "/api/suppliers", {
        headers: buildHeadersUtil({ token: token }),
      }),
      {
        option: {
          validateResponse: templateValidateResponse(
            z.array(supplierSchema)
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
