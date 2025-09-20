import axios from "axios";
import { createProductCategorySchema } from "../schemas/create-productcategory.schema";
import { ICreateProductCategory, IProductCategory } from "./productcategory.interface";
import { API_CONFIG } from "@/configs/api.config";
import { withApiHandling } from "@/utils/api.utils";
import { configureCache } from "@/utils/cache.utils";
import { getProductCategoryGlobalTag } from "./productcategory.cache";

export async function createProductCategory(input: ICreateProductCategory) {
  try {
    const { success, error, data } = createProductCategorySchema.safeParse(input);
    if (success === false) {
      return {
        message: "กรุณากรอกข้อมูลให้ถูกต้อง",
        error: error.flatten().fieldErrors,
      };
    }

    const requsetBody = {
      name: data.name,
    };

    const { error: resErr } = await withApiHandling(
      axios.post(API_CONFIG.BASE_URL + "/api/product-categories", requsetBody)
    );

    if (resErr.status === "error") {
      // console.log("Response Error: " + resErr.errorMessage);
      return {
        message: resErr.errorMessage,
      };
    }

    // console.log(result.data);
  } catch (error) {
    console.error(error);
    return {
      message: "Error",
    };
  }
}

export async function getProductCategoryList() {
  "use cache";
  configureCache({
    life: "hours",
    tag: getProductCategoryGlobalTag(),
  });
  try {
    const { result, error } = await withApiHandling(
      axios.get(API_CONFIG.BASE_URL + "/api/product-categories")
    );

    if (error.status === "error") {
      console.error(error.errorMessage);
      return [];
    }

    return result.data.data as IProductCategory[];
  } catch (error) {
    console.error(error);
    return [];
  }
  
}
