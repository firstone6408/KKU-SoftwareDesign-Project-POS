import axios from "axios";
import { createCustomerSchema } from "../schemas/create-productcategory.schema";
import { ICreateCustomer, ICustomer } from "./productcategory.interface";
import { API_CONFIG } from "@/configs/api.config";
import { withApiHandling } from "@/utils/api.utils";
import { configureCache } from "@/utils/cache.utils";
import { getCustomerGlobalTag } from "./productcategory.cache";

export async function createCustomer(input: ICreateCustomer) {
  try {
    const { success, error, data } = createCustomerSchema.safeParse(input);
    if (success === false) {
      return {
        message: "กรุณากรอกข้อมูลให้ถูกต้อง",
        error: error.flatten().fieldErrors,
      };
    }

    const requsetBody = {
      name: data.name,
      contactInfo: data.contract,
    };

    const { error: resErr } = await withApiHandling(
      axios.post(API_CONFIG.BASE_URL + "/api/customers", requsetBody)
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

export async function getCustomerList() {
  "use cache";
  configureCache({
    life: "hours",
    tag: getCustomerGlobalTag(),
  });
  try {
    const { result, error } = await withApiHandling(
      axios.get(API_CONFIG.BASE_URL + "/api/customers")
    );

    if (error.status === "error") {
      console.error(error.errorMessage);
      return [];
    }

    return result.data.data as ICustomer[];
  } catch (error) {
    console.error(error);
    return [];
  }
}
