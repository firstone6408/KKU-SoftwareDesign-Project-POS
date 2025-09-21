/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { InitialFormState } from "@/interfaces/actions/action";
import { actionResponse } from "@/utils/response-builder.utils";
import { login, logout } from "../services/auth.service";

export async function loginAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = await login(rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
      error: result.error,
    });
  } else {
    return actionResponse({
      status: "success",
      message: "เข้าสู่ระบบสำเร็จ",
    });
  }
}

export async function logoutAction(
  _prevState: InitialFormState,
  _formData: FormData
) {
  await logout();
  return actionResponse({
    status: "success",
    message: "ออกจากระบบสำเร็จ",
  });
}
