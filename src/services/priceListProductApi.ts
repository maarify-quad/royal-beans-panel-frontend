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
    createBulkPriceListProductsFromExcel: builder.mutation<
      any,
      CreateBulkPriceListProductsFromExcelParams
    >({
      query: (body) => {
        const formData = new FormData();
        formData.append("excel", body.excel);
        formData.append("priceListId", body.priceListId.toString());
        return {
          url: "/price_list_products/bulk/excel",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, params) => [
        { type: "PriceList" as const, id: params.priceListId },
      ],
      extraOptions: {
        multipart: true,
      },
    }),
    updatePriceListProduct: builder.mutation<PriceListProduct, UpdatePriceListProductParams>({
      query: (body) => ({
        url: `/price_list_products`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, params) => [
        { type: "PriceList" as const, id: params.priceListId },
      ],
    }),
  }),
});

export const {
  useGetPriceListProductsQuery,
  useCreatePriceListProductMutation,
  useCreateBulkPriceListProductsFromExcelMutation,
  useUpdatePriceListProductMutation,
} = priceListProductApi;

interface CreatePriceListProductParams {
  productId: number;
  newProductName: string;
  priceListId: number;
  unitPrice: number;
  taxRate: number;
  unit: string;
}

interface CreateBulkPriceListProductsFromExcelParams {
  priceListId: number;
  excel: File;
}

interface UpdatePriceListProductParams extends Partial<PriceListProduct> {}
