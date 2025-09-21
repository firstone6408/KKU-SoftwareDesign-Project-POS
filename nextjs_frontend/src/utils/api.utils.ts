/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

export function templateValidateResponse<T>(zodSchema: z.ZodSchema<T>) {
  return z.object({
    ok: z.boolean(),
    status: z.number(),
    message: z.string(),
    data: zodSchema,
    timestamp: z.string(),
  });
}

function validateResponseFromServer<T>(
  axiosResponse: AxiosResponse<any>,
  responseSchema: z.ZodSchema<T>
) {
  //  console.log(axiosResponse.data);

  const validatedResult = responseSchema.safeParse(axiosResponse.data);
  if (!validatedResult.success) {
    const errorMessage = validatedResult.error.message;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }

  return validatedResult.data;
}

// --------------------------------------------------------------------------------------------

type WithApiHandlingResType<T> = {
  error: {
    status: "success" | "error";
    errorMessage: string;
  };
  result: T;
};

export async function withApiHandling<T>(
  request: Promise<any> | (() => Promise<any>),
  config?: {
    option?: {
      validateResponse?: z.ZodSchema<T>;
    };
  }
): Promise<WithApiHandlingResType<T>> {
  let status: WithApiHandlingResType<T>["error"]["status"] = "success";
  let errorMessage = "No error";
  let result;
  try {
    // รองรับทั้งสองแบบ: function หรือ promise
    if (typeof request === "function") {
      result = await request();
    } else {
      result = await request;
    }
    if (config) {
      const { option } = config;
      if (option?.validateResponse) {
        result = validateResponseFromServer(
          result,
          option.validateResponse
        );
      }
    }
  } catch (error: any) {
    status = "error";
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.message || "Unknown Axios error";
    } else {
      errorMessage = String(error);
    }
  }

  return { result, error: { status, errorMessage } };
}
