import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from "@slices/authSlice";
import layoutReducer from "@slices/layoutSlice";

// APIs
import { emptyApi } from "@services/emptyApi";
import { authApi } from "@services/authApi";
import { supplierApi } from "@services/supplierApi";
import { deliveryApi } from "@services/deliveryApi";
import { productApi } from "@services/productApi";
import { roastApi } from "@services/roastApi";
import { customerApi } from "@services/customerApi";
import { priceListApi } from "@services/priceListApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    [emptyApi.reducerPath]: emptyApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
    [deliveryApi.reducerPath]: deliveryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [roastApi.reducerPath]: roastApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [priceListApi.reducerPath]: priceListApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(emptyApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;

export default store;
