import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";

// Actions
import { getErrors } from "@slices/errorSlice";

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    let message = action.payload?.data?.message;
    const code = action.payload?.data?.code;

    if (code === "SESSION_EXPIRED") {
      api.dispatch(
        getErrors({ id: "", message: "Oturum süresi doldu. Lütfen tekrar giriş yapın." })
      );
      return next(action);
    }

    if (action.meta.arg.endpointName === "getProfile") {
      return next(action);
    }

    if (!message) {
      message = `Beklenmedik bir hata oluştu (${action.meta.arg.endpointName})`;
    }

    api.dispatch(getErrors({ id: "", message }));
  }

  return next(action);
};
