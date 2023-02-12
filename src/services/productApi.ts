import { emptyApi } from "./emptyApi";

// Utils
import { getPaginatedURL } from "@utils/service";

// Interfaces
import {
  Product,
  ProductRelation,
  ProductWithIngredients,
  ProductWithRoastIngredients,
} from "@interfaces/product";

export const productApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductsRequest | void>({
      query: (params) => getPaginatedURL("/products", params?.pagination),
      providesTags: ["Product"],
      keepUnusedDataFor: 15,
    }),
    getProductByStockCode: builder.query<Product, string>({
      query: (stockCode) => `/products/${stockCode}`,
      providesTags: (result, _error, stockCode) =>
        result ? [{ type: "Product" as const, id: stockCode }] : ["Product"],
    }),
    getProductsWithIngredients: builder.query<
      GetProductsWithIngredientsResponse,
      GetProductsRequest | void
    >({
      query: (params) => getPaginatedURL("/products/ingredients", params?.pagination),
      providesTags: ["Product"],
      keepUnusedDataFor: 15,
    }),
    getProductsWithRoastIngredients: builder.query<
      GetProductsWithRoastIngredientsResponse,
      GetProductsRequest | void
    >({
      query: (params) => getPaginatedURL("/products/roast_ingredients", params?.pagination),
      providesTags: [{ type: "Product" as const, id: "roast_ingredients" }],
      keepUnusedDataFor: 15,
    }),
    getProductsByStorageType: builder.query<
      GetProductsByStorageTypeResponse,
      GetProductsByStorageTypeRequest
    >({
      query: (params) =>
        getPaginatedURL(`/products/storageType/${params.storageType}`, params?.pagination),
      keepUnusedDataFor: 15,
      providesTags: (result, _error, params) =>
        result ? [{ type: "Product" as const, id: params.storageType }] : ["Product"],
    }),
    getProductWithIngredients: builder.query<ProductWithIngredients, string>({
      query: (stockCode) => `/products/${stockCode}/ingredients`,
      providesTags: (result, _error, stockCode) =>
        result ? [{ type: "Ingredient" as const, id: stockCode }] : ["Product"],
    }),
    createProduct: builder.mutation<Product, CreateProductRequest>({
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
    deleteProductByStockCode: builder.mutation<any, string>({
      query: (stockCode) => ({
        url: `/products/${stockCode}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, _error, stockCode) =>
        result ? [{ type: "Product" as const, id: stockCode }] : ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByStockCodeQuery,
  useGetProductsWithIngredientsQuery,
  useGetProductsByStorageTypeQuery,
  useGetProductWithIngredientsQuery,
  useGetProductsWithRoastIngredientsQuery,
  useCreateProductMutation,
  useCreateBulkProductsFromExcelMutation,
  useBulkUpdateProductsMutation,
  useDeleteProductByStockCodeMutation,
} = productApi;

interface GetProductsResponse {
  products: Product[];
  totalPages: number;
  totalCount: number;
}

interface GetProductsWithIngredientsResponse {
  products: ProductWithIngredients[];
  totalPages: number;
  totalCount: number;
}

interface GetProductsWithRoastIngredientsResponse {
  products: ProductWithRoastIngredients[];
  totalPages: number;
  totalCount: number;
}

interface GetProductsByStorageTypeResponse {
  products: Product[];
  totalPages: number;
  totalCount: number;
}

interface GetProductsRequest {
  pagination?: { page: number; limit: number };
  relations?: ProductRelation[];
}

interface GetProductsByStorageTypeRequest {
  storageType: string;
  pagination?: { page: number; limit: number };
}

interface CreateProductRequest {
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
