import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";

// Actions
import { getErrors } from "@slices/errorSlice";

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    let message = "Beklenmedik bir hata oluştu";
    if (action.payload?.data?.message) {
      message = action.payload.data.message;
    }
    api.dispatch(getErrors({ id: "", message }));
  }

  return next(action);
};
