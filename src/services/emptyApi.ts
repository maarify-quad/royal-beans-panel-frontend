// RTK Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

// Actions
import { setAuthentication } from "@slices/authSlice";

// Utils
import jwtDecode from "jwt-decode";

// Types
import type { RootState } from "@app/store";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, api) => {
    if (!(api.extra as any)?.multipart) {
      headers.set("Content-Type", "application/json");
    }

    const accessToken = (api.getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // Get the access token from the local storage
  const accessToken = (api.getState() as RootState).auth.accessToken;

  // Check if access token exists
  if (accessToken) {
    // If there is a access token, try to decode it
    const decoded = jwtDecode(accessToken) as any;

    // Check if the token is expired
    if (decoded.exp * 1000 < Date.now()) {
      // If the JWT is expired get a new one with the refresh token
      const refreshTokenResponse = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/refresh_token`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the refresh token was successful
      if (!refreshTokenResponse.ok || refreshTokenResponse.status !== 200) {
        api.dispatch(setAuthentication({ isAuthenticated: false, user: null, accessToken: null }));
        return Promise.reject("tokenExpired");
      }

      // Get the new access token from the response
      const refreshTokenData = await refreshTokenResponse.json();

      console.log(refreshTokenData.accessToken);

      // Set the new access token in store
      api.dispatch(
        setAuthentication({
          isAuthenticated: true,
          accessToken: refreshTokenData.accessToken,
          user: refreshTokenData.user,
        })
      );
    }
  }

  // If the access token is valid, continue with the request
  let result = await baseQuery(args, { ...api, extra: extraOptions }, extraOptions);
  return result;
};

export const emptyApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["Supplier", "Delivery", "Product", "Roast", "Customer", "PriceList", "Order"],
});
