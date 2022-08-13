import { emptyApi } from "./emptyApi";

// Interfaces
import { PriceList } from "@interfaces/priceList";

export const priceListApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getPriceLists: builder.query<GetPriceListsResponse, void>({
      query: () => "/price_lists",
      providesTags: ["PriceList"],
    }),
    getPriceListById: builder.query<PriceList, string>({
      query: (id) => `/price_lists/${id}`,
      providesTags: (_result, _error, id) => [{ type: "PriceList" as const, id }],
    }),
  }),
});

export const { useGetPriceListsQuery, useGetPriceListByIdQuery } = priceListApi;

interface GetPriceListsResponse {
  priceLists: PriceList[];
}
