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
      providesTags: ["PriceList"],
    }),
  }),
});

export const { useGetPriceListsQuery, useGetPriceListByIdQuery } = priceListApi;

interface GetPriceListsResponse {
  priceLists: PriceList[];
}
