import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@app/store";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SHOPPAR_BASE_URL,
  prepareHeaders: (headers, api) => {
    const accessToken = (api.getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const shopparApi = createApi({
  baseQuery,
  reducerPath: "shopparApi",
  endpoints: (builder) => ({
    getSummary: builder.query<GetSummaryResponse, void>({
      query: () => "/invoice/summary",
    }),
    generateCargoExcels: builder.mutation<any, void>({
      query: () => ({
        url: "/cargo",
        method: "GET",
        responseHandler: "text",
      }),
    }),
  }),
});

interface GetSummaryResponse {
  shopifyLastOrderNumber: number;
  lastExportedCreatedAt?: string;
  orderCount: number;
}

export const { useGetSummaryQuery, useGenerateCargoExcelsMutation } = shopparApi;
