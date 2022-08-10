import { emptyApi } from "./emptyApi";

// Interfaces
import { Product } from "@interfaces/product";

export const productApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => "/products",
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
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsByStorageTypeQuery,
  useCreateProductMutation,
  useCreateBulkProductsFromExcelMutation,
} = productApi;

interface CreateProductParams {
  name: string;
  storageType: string;
  amount: number;
  amountUnit: string;
}

interface CreateBulkProductsFromExcelParams {
  excel: File;
}
