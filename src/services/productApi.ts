import { emptyApi } from "./emptyApi";
import pickBy from "lodash/pickBy";

// Interfaces
import {
  Product,
  ProductRelation,
  ProductStorageType,
  ProductWithIngredients,
  ProductWithRoastIngredients,
} from "@interfaces/product";

export const productApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get products
    getProducts: builder.query<GetProductsResponse, GetProductsRequest | void>({
      query: (params) => ({
        url: "/products",
        ...(Object.keys(params?.query || {}).length && {
          params: params?.query,
        }),
      }),
      providesTags: ["Product"],
    }),

    // Get products with ingredients
    getProductsWithIngredients: builder.query<
      GetProductsWithIngredientsResponse,
      GetProductsRequest | void
    >({
      query: (params) => ({
        url: "/products/ingredients",
        ...(Object.keys(params?.query || {}).length && {
          params: pickBy(params?.query, (value) => value !== "" && value !== undefined),
        }),
      }),
      providesTags: [{ type: "Product" as const, id: "ingredients" }],
    }),

    // Get products with roast ingredients
    getProductsWithRoastIngredients: builder.query<
      GetProductsWithRoastIngredientsResponse,
      GetProductsRequest | void
    >({
      query: (params) => ({
        url: "/products/roast_ingredients",
        ...(Object.keys(params?.query || {}).length && {
          params: params?.query,
        }),
      }),
      providesTags: [{ type: "Product" as const, id: "roast_ingredients" }],
    }),

    // Get products by storage type
    getProductsByStorageType: builder.query<
      GetProductsByStorageTypeResponse,
      GetProductsByStorageTypeRequest
    >({
      query: (params) => ({
        url: `/products/storageType/${params.storageType}`,
        ...(Object.keys(params.query || {}).length && {
          params: pickBy(params?.query, (value) => value !== "" && value !== undefined),
        }),
      }),
      providesTags: (result, _error, params) =>
        result ? [{ type: "Product" as const, id: params.storageType }] : ["Product"],
    }),

    // Get product by stock code
    getProductByStockCode: builder.query<Product, string>({
      query: (stockCode) => `/products/${stockCode}`,
      providesTags: (result, _error, stockCode) =>
        result ? [{ type: "Product" as const, id: stockCode }] : ["Product"],
    }),

    // Get product with ingredients
    getProductWithIngredients: builder.query<ProductWithIngredients, string>({
      query: (stockCode) => `/products/${stockCode}/ingredients`,
      providesTags: (result, _error, stockCode) =>
        result ? [{ type: "Ingredient" as const, id: stockCode }] : ["Product"],
    }),

    // Create product
    createProduct: builder.mutation<Product, CreateProductRequest>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, _error, params) =>
        result ? [{ type: "Product" as const, id: params.storageType }] : ["Product"],
    }),

    // Create bulk products from excel
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

    // Update product
    updateProduct: builder.mutation<Product, UpdateProductRequest>({
      query: (body) => ({
        url: `/products/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, _error, params) =>
        result ? [{ type: "Product" as const, id: params.stockCode }] : ["Product"],
    }),

    // Bulk update products
    bulkUpdateProducts: builder.mutation<Product, BulkUpdateProductsRequest>({
      query: (body) => ({
        url: "/products/bulk",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    // Delete product by stock code
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
  useGetProductsWithIngredientsQuery,
  useGetProductsWithRoastIngredientsQuery,
  useGetProductsByStorageTypeQuery,
  useGetProductWithIngredientsQuery,
  useGetProductByStockCodeQuery,
  useCreateProductMutation,
  useCreateBulkProductsFromExcelMutation,
  useUpdateProductMutation,
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
  relations?: ProductRelation[];
  query: RequestQuery;
}

interface GetProductsByStorageTypeRequest {
  storageType: ProductStorageType;
  query?: RequestQuery;
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

interface UpdateProductRequest {
  id: number;
  stockCode: string;
  name: string;
  amount: number;
  amountUnit: string;
  tag: string | null;
}

interface BulkUpdateProductsRequest {
  products: {
    id: number;
    name: string;
    storageType: ProductStorageType;
    amount: number;
    amountUnit: string;
  }[];
}

export interface RequestQuery {
  page?: number;
  limit?: number;
  sortBy?: keyof Product;
  sortOrder?: "ASC" | "DESC";
  search?: string;
}
