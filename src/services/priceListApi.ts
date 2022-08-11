import { emptyApi } from "./emptyApi";

// Interfaces
import { PriceList } from "@interfaces/priceList";

export const priceListApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getPriceLists: builder.query<GetPriceListsResponse, void>({
      query: () => "/price_lists",
      providesTags: ["PriceList"],
    }),
  }),
});

export const { useGetPriceListsQuery } = priceListApi;

interface GetPriceListsResponse {
  priceLists: PriceList[];
}
