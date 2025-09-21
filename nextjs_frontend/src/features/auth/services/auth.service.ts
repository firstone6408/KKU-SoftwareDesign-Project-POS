import { ACTION_CONFIG } from "@/configs/action.config";
import { ILogin } from "./auth.interface";
import { loginSchema } from "../schemas/login.schema";
import {
  templateValidateResponse,
  withApiHandling,
} from "@/utils/api.utils";
import axios from "axios";
import { API_CONFIG } from "@/configs/api.config";
import z from "zod";
import { CookieUtil } from "@/utils/cookie.utils";
import { buildHeadersUtil } from "@/utils/http-headers.utils";
import { IUser, userSchema } from "@/features/users/schemas/user.schema";

export async function login(input: ILogin) {
  try {
    // validate
    const { success, error, data } = loginSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre body
    const requestBody = {
      email: data.email,
      password: data.password,
    };

    // api
    const { result, error: responseError } = await withApiHandling(
      axios.post(API_CONFIG.BASE_URL + "/api/auth/login", requestBody),
      {
        option: {
          validateResponse: templateValidateResponse(
            z.object({
              token: z.string(),
            })
          ),
        },
      }
    );

    if (responseError.status === "error") {
      console.error(responseError.errorMessage);
      return {
        message: responseError.errorMessage,
      };
    }

    // save token
    await CookieUtil.setToken(result.data.token);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function logout() {
  try {
    await CookieUtil.deleteToken();
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function getCurrentUser(
  token: string
): Promise<IUser | null> {
  try {
    // api
    const { result, error } = await withApiHandling(
      axios.get(API_CONFIG.BASE_URL + "/api/auth/current-user", {
        headers: buildHeadersUtil({ token: token }),
      }),
      {
        option: { validateResponse: templateValidateResponse(userSchema) },
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
