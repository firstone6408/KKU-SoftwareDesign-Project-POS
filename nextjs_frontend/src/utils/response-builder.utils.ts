/** @format */

import { InitialFormState } from "@/interfaces/actions/action";

interface FnError {
  fnName: string;
  error: unknown;
}

export function actionResponse(
  param: InitialFormState,
  fnError?: FnError
) {
  if (fnError) {
    console.group(`❌ Error in ${fnError.fnName}`);
    console.error(fnError.error);
    console.groupEnd();
  }
  return param;
}
