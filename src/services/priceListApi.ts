import { emptyApi } from "./emptyApi";

// Interfaces
import { PriceList } from "@interfaces/priceList";

export const priceListApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getPriceLists: builder.query<GetPriceListsResponse, GetPriceListsRequest | void>({
      query: (params) => {
        const url = new URL("/price_lists", import.meta.env.VITE_API_BASE_URL);
        if (params) {
          const { page, limit } = params;
          url.searchParams.append("page", page.toString());
          url.searchParams.append("limit", limit.toString());
        }
        return url.toString();
      },
      providesTags: ["PriceList"],
    }),
    getPriceListById: builder.query<PriceList, string>({
      query: (id) => `/price_lists/${id}`,
      providesTags: (_result, _error, id) => [{ type: "PriceList" as const, id }],
    }),
    createPriceList: builder.mutation<PriceList, CreatePriceListParams>({
      query: (body) => ({
        url: "/price_lists",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PriceList"],
    }),
  }),
});

export const { useGetPriceListsQuery, useGetPriceListByIdQuery, useCreatePriceListMutation } =
  priceListApi;

interface GetPriceListsRequest {
  page: number;
  limit: number;
}

interface GetPriceListsResponse {
  priceLists: PriceList[];
  totalPages: number;
  totalCount: number;
}

interface CreatePriceListParams {
  name: string;
  description?: string;
  cloneDefaultPriceList?: boolean;
}
