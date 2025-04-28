import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from "@slices/authSlice";
import receiverReducer from "@slices/receiverSlice";
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
import { receiverApi } from "@services/receiverApi";
import { priceListApi } from "@services/priceListApi";
import { priceListProductApi } from "@services/priceListProductApi";
import { orderApi } from "@services/orderApi";
import { ingredientApi } from "@services/ingredientApi";
import { roastIngredientApi } from "@services/roastIngredientApi";
import { shopifyProductApi } from "@services/shopifyProductApi";
import { tagApi } from "@services/tagApi";
import { parasutApi } from "@services/parasutApi";
import { productionApi } from "@services/productionApi";
import { stockApi } from "@services/stockApi";
import { financeApi } from "@services/financeApi";
import { deciApi } from "@services/deciApi";
import { loggingApi } from "@services/loggingApi";
import { shopparApi } from "@services/shopparApi";
import { eventsApi } from "@services/eventsApi";

// Middlewares
import { rtkQueryErrorLogger } from "./middlewares/rtkQueryErrorLogger";

const store = configureStore({
  reducer: {
    auth: authReducer,
    receiver: receiverReducer,
    layout: layoutReducer,
    error: errorReducer,
    [emptyApi.reducerPath]: emptyApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
    [deliveryApi.reducerPath]: deliveryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [roastApi.reducerPath]: roastApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [receiverApi.reducerPath]: receiverApi.reducer,
    [priceListApi.reducerPath]: priceListApi.reducer,
    [priceListProductApi.reducerPath]: priceListProductApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [ingredientApi.reducerPath]: ingredientApi.reducer,
    [roastIngredientApi.reducerPath]: roastIngredientApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [parasutApi.reducerPath]: parasutApi.reducer,
    [shopifyProductApi.reducerPath]: shopifyProductApi.reducer,
    [productionApi.reducerPath]: productionApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [financeApi.reducerPath]: financeApi.reducer,
    [deciApi.reducerPath]: deciApi.reducer,
    [loggingApi.reducerPath]: loggingApi.reducer,
    [shopparApi.reducerPath]: shopparApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      emptyApi.middleware,
      shopparApi.middleware,
      eventsApi.middleware,
      rtkQueryErrorLogger
    ),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;

export default store;
