import { emptyApi } from "./emptyApi";

// Interfaces
import { Product } from "@interfaces/product";

export const productApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductsRequest | void>({
      query: (params) => {
        const url = new URL("/products", import.meta.env.VITE_API_BASE_URL);

        if (params) {
          url.searchParams.append("page", params.page.toString());
          url.searchParams.append("limit", params.limit.toString());
        }

        return url.toString();
      },
      providesTags: ["Product"],
      keepUnusedDataFor: 15,
    }),
    getProductsByStorageType: builder.query<Product[], string>({
      query: (storageType) => `/products/storageType/${storageType}`,
      keepUnusedDataFor: 15,
      providesTags: (result, _error, storageType) =>
        result ? [{ type: "Product" as const, id: storageType }] : ["Product"],
    }),
    createProduct: builder.mutation<Product, CreateProductParams>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, _error, params) =>
        result ? [{ type: "Product" as const, id: params.storageType }] : ["Product"],
    }),
    createBulkProductsFromExcel: builder.mutation<any, CreateBulkProductsFromExcelParams>({
      query: (body) => {
        const formData = new FormData();
        formData.append("excel", body.excel);

        return {
          url: "/products/bulk/excel",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
      extraOptions: {
        multipart: true,
      },
    }),
    bulkUpdateProducts: builder.mutation<Product, BulkUpdateProductsRequest>({
      query: (body) => ({
        url: "/products/bulk",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByStorageTypeQuery,
  useCreateProductMutation,
  useCreateBulkProductsFromExcelMutation,
  useBulkUpdateProductsMutation,
} = productApi;

interface GetProductsResponse {
  products: Product[];
  totalPages: number;
  totalCount: number;
}

interface GetProductsRequest {
  page: number;
  limit: number;
}

interface CreateProductParams {
  name: string;
  storageType: string;
  amount: number;
  amountUnit: string;
}

interface CreateBulkProductsFromExcelParams {
  excel: File;
}

interface BulkUpdateProductsRequest {
  products: { id: number; name: string; storageType: string; amount: number; amountUnit: string }[];
}
