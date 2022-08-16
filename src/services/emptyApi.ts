// RTK Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

// Actions
import { setAuthentication } from "@slices/authSlice";

// Utils
import jwtDecode from "jwt-decode";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, api) => {
    if (api.endpoint !== "createBulkProductsFromExcel") {
      headers.set("Content-Type", "application/json");
    }

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Get the access token from the local storage
  const accessToken = localStorage.getItem("accessToken");

  // Check if access token exists
  if (accessToken) {
    // If there is a access token, try to decode it
    const decoded = jwtDecode(accessToken) as any;

    // Check if the token is expired
    if (decoded.exp * 1000 < Date.now()) {
      // If the token is expired, dispatch logout action
      api.dispatch(setAuthentication({ isAuthenticated: false, user: null }));

      // Remove access token from the local storage
      localStorage.removeItem("accessToken");

      // Reject the request promise
      return Promise.reject("tokenExpired");
    }
  }

  // If the access token is valid, continue with the request
  let result = await baseQuery(args, api, extraOptions);
  return result;
};

export const emptyApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["Supplier", "Delivery", "Product", "Roast", "Customer", "PriceList", "Order"],
});
