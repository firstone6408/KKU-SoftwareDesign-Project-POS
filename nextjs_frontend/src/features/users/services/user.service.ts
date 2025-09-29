import { configureCache } from "@/utils/cache.utils";
import { getUserGlobalTag, revalidateUserCache } from "./user.cache";
import { IUser, userSchema } from "../schemas/user.schema";
import {
  templateValidateResponse,
  withApiHandling,
} from "@/utils/api.utils";
import axios from "axios";
import { API_CONFIG } from "@/configs/api.config";
import { buildHeadersUtil } from "@/utils/http-headers.utils";
import z from "zod";
import { IUpsertUser } from "./user.interface";
import { ACTION_CONFIG } from "@/configs/action.config";
import { FeatureServiceUtil } from "@/utils/service.utils";
import { upsertUserSchema } from "../schemas/upsert-user.schema";

export async function createUser(input: IUpsertUser) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // validate
    const { success, error, data } = upsertUserSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre request body
    const requestBody = {
      email: data.userEmail,
      name: data.userName,
      password: data.userPassword,
      role: data.userRole,
    };

    // api
    const { result, error: responseError } = await withApiHandling(
      axios.post(API_CONFIG.BASE_URL + "/api/auth/register", requestBody, {
        headers: buildHeadersUtil({ token: token }),
      }),
      {
        option: {
          validateResponse: templateValidateResponse(userSchema),
        },
      }
    );

    if (responseError.status === "error") {
      console.error(responseError.errorMessage);
      return {
        message: responseError.errorMessage,
      };
    }

    // clear cache
    revalidateUserCache(result.data.id);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function updateUser(userId: string, input: IUpsertUser) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // validate
    const { success, error, data } = upsertUserSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre request body
    const requestBody = {
      email: data.userEmail,
      name: data.userName,
      password: data.userPassword,
      role: data.userRole,
    };

    // api
    const { error: responseError } = await withApiHandling(
      axios.put(
        API_CONFIG.BASE_URL + "/api/users/" + userId,
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
    revalidateUserCache(userId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function deleteUser(userId: string) {
  try {
    // get token
    const token = await FeatureServiceUtil.getToken();

    // api
    const { error } = await withApiHandling(
      axios.delete(API_CONFIG.BASE_URL + "/api/users/" + userId, {
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
    revalidateUserCache(userId);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function getUserList(token: string): Promise<IUser[]> {
  "use cache";
  configureCache({
    life: "hours",
    tag: getUserGlobalTag(),
  });

  try {
    const { result, error } = await withApiHandling(
      axios.get(API_CONFIG.BASE_URL + "/api/users", {
        headers: buildHeadersUtil({ token: token }),
      }),
      {
        option: {
          validateResponse: templateValidateResponse(z.array(userSchema)),
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
