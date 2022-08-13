import { emptyApi } from "./emptyApi";

// Interfaces
import { PriceListProduct } from "@interfaces/priceListProduct";

export const priceListProductApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    createPriceListProduct: builder.mutation<PriceListProduct, CreatePriceListProductParams>({
      query: (body) => ({
        url: "/price_list_products",
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, params) => [
        { type: "PriceList" as const, id: params.priceListId },
      ],
    }),
  }),
});

export const { useCreatePriceListProductMutation } = priceListProductApi;

interface CreatePriceListProductParams {
  productId: number;
  priceListId: number;
  unitPrice: number;
  taxRate: number;
}
