import { emptyApi } from "./emptyApi";

// Interfaces
import { Roast } from "@interfaces/roast";
import { Product } from "@interfaces/product";

export const roastApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoasts: builder.query<GetRoastsResponse, GetRoastsRequest | void>({
      query: (params) => {
        const url = new URL("/roasts", import.meta.env.VITE_API_BASE_URL);
        if (params) {
          const { page, limit } = params;
          url.searchParams.append("page", page.toString());
          url.searchParams.append("limit", limit.toString());
        }
        return url.toString();
      },
      providesTags: ["Roast"],
    }),
    getRoastById: builder.query<GetRoastResponse, string>({
      query: (id) => `/roasts/${id}`,
    }),
    createRoast: builder.mutation<Roast, CreateRoastParams>({
      query: (body) => ({
        url: "/roasts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Roast", "Product"],
    }),
    getRoastsExcelExport: builder.mutation<
      { success: true; url: string },
      GetRoastsExcelExportParams
    >({
      query: (body) => ({
        url: `/roasts/excel-export`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetRoastsQuery,
  useGetRoastByIdQuery,
  useCreateRoastMutation,
  useGetRoastsExcelExportMutation,
} = roastApi;

export interface GetRoastsResponse {
  roasts: Roast[];
  totalPages: number;
  totalCount: number;
}

export interface GetRoastsRequest {
  page: number;
  limit: number;
}

export interface GetRoastResponse {
  roast: Roast;
}

export interface CreateRoastParams {
  roastDetails: {
    productId: number;
    inputAmount: number;
    outputAmount: number;
    product: Product;
  }[];
}

interface GetRoastsExcelExportParams {
  startDate: string | null;
  endDate: string | null;
}
