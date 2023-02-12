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
    getPriceListById: builder.query<PriceList, GetPriceListByIdRequest>({
      query: (params) => {
        const url = new URL(`/price_lists/${params.id}`, import.meta.env.VITE_API_BASE_URL);
        if (params.withDeleted) {
          url.searchParams.append("withDeleted", "true");
        }
        return url.toString();
      },
      providesTags: (result, _error, params) =>
        result ? [{ type: "PriceList" as const, id: params.id }] : [],
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

interface GetPriceListByIdRequest {
  id: string;
  withDeleted?: boolean;
}

interface CreatePriceListParams {
  name: string;
  description?: string;
  cloneDefaultPriceList?: boolean;
}
