import { configureCache } from "@/utils/cache.utils";
import { getCustomerGlobalTag } from "./customer.cache";
import { withApiHandling } from "@/utils/api.utils";
import axios from "axios";
import { API_CONFIG } from "@/configs/api.config";
import z from "zod";

export async function getCustomerList() {
  //   "use cache";
  //   configureCache({
  //     life: "hours",
  //     tag: getCustomerGlobalTag(),
  //   });

  const { result, error } = await withApiHandling(
    axios.get(API_CONFIG.BASE_URL + "/api/customers"),
    {
      option: {
        validateResponse: z.object({
          id: z.number(),
          name: z.string(),
          contactInfo: z.string(),
        }),
      },
    }
  );

  return result.data;
}
