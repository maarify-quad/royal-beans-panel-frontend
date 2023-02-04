import { emptyApi } from "./emptyApi";

// Interfaces
import { PriceListProduct } from "@interfaces/priceListProduct";

export const priceListProductApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getPriceListProducts: builder.query<GetPriceListProductsResponse, GetPriceListProductsRequest>({
      query: (params) => {
        const url = new URL(
          `/price_list_products/${params.priceListId}`,
          import.meta.env.VITE_API_BASE_URL
        );
        if (params.query) {
          const { page, limit } = params.query;
          url.searchParams.append("page", page.toString());
          url.searchParams.append("limit", limit.toString());
        }
        return url.toString();
      },
      providesTags: (_result, _error, params) => [
        { type: "PriceListProduct" as const, id: params.priceListId },
      ],
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
    updatePriceListProduct: builder.mutation<any, UpdatePriceListProductParams>({
      query: (body) => ({
        url: `/price_list_products`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, params) => [
        { type: "PriceList" as const, id: params.priceListId },
        { type: "PriceListProduct" as const, id: params.priceListId },
      ],
    }),
    deletePriceListProduct: builder.mutation<any, DeletePriceListProductParams>({
      query: (params) => ({
        url: `/price_list_products/${params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, params) => [
        { type: "PriceList" as const, id: params.priceListId },
        { type: "PriceListProduct" as const, id: params.priceListId },
      ],
    }),
  }),
});

export const {
  useGetPriceListProductsQuery,
  useCreatePriceListProductMutation,
  useCreateBulkPriceListProductsFromExcelMutation,
  useUpdatePriceListProductMutation,
  useDeletePriceListProductMutation,
} = priceListProductApi;

interface GetPriceListProductsResponse {
  priceListProducts: PriceListProduct[];
  totalPages: number;
  totalCount: number;
}

interface GetPriceListProductsRequest {
  priceListId: number;
  query?: {
    page: number;
    limit: number;
  };
}

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

interface UpdatePriceListProductParams extends Partial<Omit<PriceListProduct, "id">> {
  id: number;
}

interface DeletePriceListProductParams {
  id: number;
  priceListId: number;
}
