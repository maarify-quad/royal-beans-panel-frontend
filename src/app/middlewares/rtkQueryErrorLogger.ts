import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";

// Actions
import { getErrors } from "@slices/errorSlice";

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const endpoint = action.meta.arg.endpointName;
    let message = action.payload?.data?.message;

    if (endpoint === "getProfile" && action.payload?.data?.code !== "EXPIRED_REFRESH_TOKEN") {
      return next(action);
    }

    if (!message) {
      message = `Beklenmedik bir hata oluştu (${action.meta.arg.endpointName})`;
    }

    api.dispatch(getErrors({ id: "", message }));
  }

  return next(action);
};
