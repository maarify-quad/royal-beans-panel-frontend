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
    getSystemInfo: builder.query<GetSystemInfoResponse, void>({
      query: () => "/system-info",
      providesTags: [{ type: "Shoppar" as const, id: "Summary" }],
    }),
    exportExcel: builder.mutation<{ url: string }[], ExportExcelParams>({
      query: ({ sinceOrderId }) => {
        let url = "/export/excel";
        if (sinceOrderId) {
          url += `?sinceOrderId=${sinceOrderId}`;
        }
        return {
          url,
          method: "GET",
        };
      },
      invalidatesTags: [{ type: "Shoppar" as const, id: "Summary" }],
    }),
  }),
});

type GetSystemInfoResponse = {
  lastShopifyOrderNumber: number;
  lastExcelExportDate: string | null;
  orderCount: number;
};

type ExportExcelParams = {
  sinceOrderId?: string;
};

export const { useGetSystemInfoQuery, useExportExcelMutation } = shopparApi;
