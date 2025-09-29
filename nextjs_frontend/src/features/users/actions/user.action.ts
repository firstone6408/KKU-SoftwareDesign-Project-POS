"use server";

import { InitialFormState } from "@/interfaces/actions/action";
import { actionResponse } from "@/utils/response-builder.utils";
import { UserRoleEnum } from "../services/user.enum";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../services/user.service";
import { ACTION_CONFIG } from "@/configs/action.config";

export async function createUserAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    userName: formData.get("user-name") as string,
    userEmail: formData.get("user-email") as string,
    userPassword: formData.get("user-password") as string,
    userRole: formData.get("user-role") as UserRoleEnum,
  };

  const result = await createUser(rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
      error: result.error,
    });
  } else {
    return actionResponse({
      status: "success",
      message: "เพิ่มพนักงานในระบบสำเร็จ",
    });
  }
}

export async function updateUserAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    userId: formData.get("user-id") as string,
    userName: formData.get("user-name") as string,
    userEmail: formData.get("user-email") as string,
    userPassword: (() => {
      const value = formData.get("user-password") as string;
      return value.trim() !== "" ? value : null;
    })(),
    userRole: formData.get("user-role") as UserRoleEnum,
  };

  const { userId, ...data } = rawData;

  const result = await updateUser(userId, data);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
      error: result.error,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.UPDATED,
    });
  }
}

export async function deleteUserAction(
  _prevState: InitialFormState,
  formData: FormData
) {
  const rawData = {
    userId: formData.get("user-id") as string,
  };

  const result = await deleteUser(rawData.userId);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.DELETED,
    });
  }
}
