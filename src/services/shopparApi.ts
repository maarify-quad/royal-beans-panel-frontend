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
  tagTypes: ["Shoppar"],
  endpoints: (builder) => ({
    getSummary: builder.query<GetSummaryResponse, void>({
      query: () => "/sales_invoice/summary",
      providesTags: [{ type: "Shoppar" as const, id: "Summary" }],
    }),
    generateCargoExcels: builder.mutation<any, void>({
      query: () => ({
        url: "/cargo",
        method: "GET",
      }),
      invalidatesTags: [{ type: "Shoppar" as const, id: "Summary" }],
    }),
  }),
});

interface GetSummaryResponse {
  lastShopifyOrderNumber: number;
  lastExcelExportDate: string | null;
  orderCount: number;
}

export const { useGetSummaryQuery, useGenerateCargoExcelsMutation } = shopparApi;
