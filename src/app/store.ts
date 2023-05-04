import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from "@slices/authSlice";
import layoutReducer from "@slices/layoutSlice";
import errorReducer from "@slices/errorSlice";

// APIs
import { emptyApi } from "@services/emptyApi";
import { authApi } from "@services/authApi";
import { supplierApi } from "@services/supplierApi";
import { deliveryApi } from "@services/deliveryApi";
import { productApi } from "@services/productApi";
import { roastApi } from "@services/roastApi";
import { customerApi } from "@services/customerApi";
import { priceListApi } from "@services/priceListApi";
import { priceListProductApi } from "@services/priceListProductApi";
import { orderApi } from "@services/orderApi";
import { ingredientApi } from "@services/ingredientApi";
import { roastIngredientApi } from "@services/roastIngredientApi";
import { shopifyProductApi } from "@services/shopifyProductApi";
import { tagApi } from "@services/tagApi";
import { parasutApi } from "@services/parasutApi";
import { productionApi } from "@services/productionApi";
import { loggingApi } from "@services/loggingApi";
import { shopparApi } from "@services/shopparApi";

// Middlewares
import { rtkQueryErrorLogger } from "./middlewares/rtkQueryErrorLogger";

const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    error: errorReducer,
    [emptyApi.reducerPath]: emptyApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
    [deliveryApi.reducerPath]: deliveryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [roastApi.reducerPath]: roastApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [priceListApi.reducerPath]: priceListApi.reducer,
    [priceListProductApi.reducerPath]: priceListProductApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [ingredientApi.reducerPath]: ingredientApi.reducer,
    [roastIngredientApi.reducerPath]: roastIngredientApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [parasutApi.reducerPath]: parasutApi.reducer,
    [shopifyProductApi.reducerPath]: shopifyProductApi.reducer,
    [productionApi.reducerPath]: productionApi.reducer,
    [loggingApi.reducerPath]: loggingApi.reducer,
    [shopparApi.reducerPath]: shopparApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptyApi.middleware, shopparApi.middleware, rtkQueryErrorLogger),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;

export default store;
