import { emptyApi } from "./emptyApi";

// Interfaces
import { PriceListProduct } from "@interfaces/priceListProduct";

export const priceListProductApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getPriceListProducts: builder.query<PriceListProduct[], number>({
      query: (priceListId) => `/price_list_products/${priceListId}`,
    }),
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

export const { useGetPriceListProductsQuery, useCreatePriceListProductMutation } =
  priceListProductApi;

interface CreatePriceListProductParams {
  productId: number;
  newProductName: string;
  priceListId: number;
  unitPrice: number;
  taxRate: number;
  unit: string;
}
