import axios from "axios";
import { upsertProductCategorySchema } from "../schemas/upsert-productcategory.schema";
import {
  IDeleteProductCategory,
  IUpsertProductCategory,
} from "./product-category.interface";
import { API_CONFIG } from "@/configs/api.config";
import {
  templateValidateResponse,
  withApiHandling,
} from "@/utils/api.utils";
import { configureCache } from "@/utils/cache.utils";
import {
  getProductCategoryGlobalTag,
  revalidateProductCategoryCache,
} from "./product-category.cache";
import { ACTION_CONFIG } from "@/configs/action.config";
import { productCategorySchema } from "../schemas/product-category.schema";
import z from "zod";
import { FeatureServiceUtil } from "@/utils/service.utils";
import { buildHeadersUtil } from "@/utils/http-headers.utils";

export async function createProductCategory(
  input: IUpsertProductCategory
) {
  try {
    //get token
    const token = await FeatureServiceUtil.getToken();

    const { success, error, data } =
      upsertProductCategorySchema.safeParse(input);
    if (success === false) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    const requsetBody = {
      name: data.productCategoryName,
    };

    const { result, error: resErr } = await withApiHandling(
      axios.post(
        API_CONFIG.BASE_URL + "/api/product-categories",
        requsetBody,
        { headers: buildHeadersUtil({ token: token }) }
      ),
      {
        option: {
          validateResponse: templateValidateResponse(
            productCategorySchema
          ),
        },
      }
    );

    if (resErr.status === "error") {
      console.log("Response Error: " + resErr.errorMessage);
      return {
        message: resErr.errorMessage,
      };
    }

    // clear cache
    revalidateProductCategoryCache(result.data.id);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function deleteProductCategory(
  input: IDeleteProductCategory
) {
  try {
    //get token
    const token = await FeatureServiceUtil.getToken();

    const { error } = await withApiHandling(
      axios.delete(
        API_CONFIG.BASE_URL +
          "/api/product-categories/" +
          input.productCategoryId,
        {
          headers: buildHeadersUtil({ token: token }),
        }
      )
    );

    if (error.status === "error") {
      console.error(error.errorMessage);
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.SERVER,
      };
    }

    // clear cache;
    revalidateProductCategoryCache(input.productCategoryId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function updateProductCategory(
  productCategoryId: string,
  input: IUpsertProductCategory
) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // validate
    const { success, error, data } =
      upsertProductCategorySchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre body
    const requsetBody = {
      name: data.productCategoryName,
    };

    // api
    const { error: responseError } = await withApiHandling(
      axios.put(
        API_CONFIG.BASE_URL +
          "/api/product-categories/" +
          productCategoryId,
        requsetBody,
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
    revalidateProductCategoryCache(productCategoryId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function getProductCategoryList(token: string) {
  "use cache";
  configureCache({
    life: "hours",
    tag: getProductCategoryGlobalTag(),
  });
  try {
    const { result, error } = await withApiHandling(
      axios.get(API_CONFIG.BASE_URL + "/api/product-categories", {
        headers: buildHeadersUtil({ token: token }),
      }),
      {
        option: {
          validateResponse: templateValidateResponse(
            z.array(productCategorySchema)
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
