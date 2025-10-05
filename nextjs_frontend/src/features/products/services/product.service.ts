import { configureCache } from "@/utils/cache.utils";
import {
  getProductGlobalTag,
  revalidateProductCache,
} from "./product.cache";
import {
  templateValidateResponse,
  withApiHandling,
} from "@/utils/api.utils";
import axios from "axios";
import { API_CONFIG } from "@/configs/api.config";
import { buildHeadersUtil } from "@/utils/http-headers.utils";
import z from "zod";
import { productSchema } from "../schemas/product.schema";
import {
  ICreateProduct,
  IUpdateProduct,
  IUpdateStockProduct,
  IUpdateUnitPriceProduct,
} from "./product.interface";
import { ACTION_CONFIG } from "@/configs/action.config";
import { createProductSchema } from "../schemas/create-product.schema";
import { FeatureServiceUtil } from "@/utils/service.utils";
import { updateProductSchema } from "../schemas/update-product.schema";
import { updateUnitPriceProductSchema } from "../schemas/update-unit-price-product.schema";
import { updateStockProductSchema } from "../schemas/update-stock-product";

export async function createProduct(input: ICreateProduct) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // validate
    const { success, error, data } = createProductSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre request body(form-data)
    const requestBody = new FormData();
    requestBody.append("barcode", data.productBarcode);
    requestBody.append("name", data.productName);
    requestBody.append("description", data.productDescription ?? "");
    requestBody.append("unitPrice", String(data.productUnitPrice));
    requestBody.append("stockLevel", String(data.productStockLevel));
    requestBody.append("categoryId", data.categoryId);
    requestBody.append("supplierId", data.supplierId);

    if (data.productImage) {
      requestBody.append("imageFile", data.productImage);
    }

    // api
    const { result, error: responseError } = await withApiHandling(
      axios.post(API_CONFIG.BASE_URL + "/api/products", requestBody, {
        headers: buildHeadersUtil({ token: token, uploadHeaders: true }),
      }),
      {
        option: {
          validateResponse: templateValidateResponse(productSchema),
        },
      }
    );

    if (responseError.status === "error") {
      console.error(responseError.errorMessage);
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.SERVER,
      };
    }

    // clear cache
    revalidateProductCache(result.data.id);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function updateProduct(
  productId: string,
  input: IUpdateProduct
) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // validate
    const { success, error, data } = updateProductSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre request body
    const requestBody = new FormData();
    requestBody.append("name", data.productName);
    requestBody.append("barcode", data.productBarcode);
    requestBody.append("description", data.productDescription ?? "");
    requestBody.append("categoryId", data.categoryId);
    requestBody.append("supplierId", data.supplierId);

    if (data.productImage) {
      requestBody.append("imageFile", data.productImage);
    }

    // console.log("requestBody", requestBody);

    // api
    const { error: responseError } = await withApiHandling(
      axios.put(
        API_CONFIG.BASE_URL + "/api/products/" + productId,
        requestBody,
        {
          headers: buildHeadersUtil({ token: token, uploadHeaders: true }),
        }
      )
    );
    if (responseError.status === "error") {
      console.error(responseError.errorMessage);
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.SERVER,
      };
    }

    // clear cache
    revalidateProductCache(productId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function deleteProduct(productId: string) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // api
    const { error } = await withApiHandling(
      axios.delete(API_CONFIG.BASE_URL + "/api/products/" + productId, {
        headers: buildHeadersUtil({ token: token }),
      })
    );

    if (error.status === "error") {
      console.error(error.errorMessage);
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.SERVER,
      };
    }

    // clear cache
    revalidateProductCache(productId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function updateUnitPriceProduct(
  productId: string,
  input: IUpdateUnitPriceProduct
) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // validate
    const { success, error, data } =
      updateUnitPriceProductSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // request body
    const requestBody = {
      unitPrice: data.productUnitPrice,
    };

    // api
    const { error: responseError } = await withApiHandling(
      axios.put(
        API_CONFIG.BASE_URL +
          "/api/products/" +
          productId +
          "/adjust-unit-price",
        requestBody,
        {
          headers: buildHeadersUtil({ token: token }),
        }
      )
    );

    if (responseError.status === "error") {
      console.error(responseError.errorMessage);
      return {
        message: responseError.errorMessage,
      };
    }

    // clear cache
    revalidateProductCache(productId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function updateStockProduct(
  productId: string,
  input: IUpdateStockProduct
) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // validate
    const { success, error, data } =
      updateStockProductSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // request body
    const requestBody = {
      quantity: data.quantity,
      adjustStockType: data.adjustStockType,
    };

    // api
    const { error: responseError } = await withApiHandling(
      axios.put(
        API_CONFIG.BASE_URL +
          "/api/products/" +
          productId +
          "/adjust-stock",
        requestBody,
        {
          headers: buildHeadersUtil({ token: token }),
        }
      )
    );

    if (responseError.status === "error") {
      console.error(responseError.errorMessage);
      return {
        message: responseError.errorMessage,
      };
    }

    // clear cache
    revalidateProductCache(productId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function getProductList(token: string) {
  "use cache";
  configureCache({
    life: "hours",
    tag: getProductGlobalTag(),
  });

  try {
    const { result, error } = await withApiHandling(
      axios.get(API_CONFIG.BASE_URL + "/api/products", {
        headers: buildHeadersUtil({ token: token }),
      }),
      {
        option: {
          validateResponse: templateValidateResponse(
            z.array(productSchema)
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
