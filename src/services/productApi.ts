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
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductsByStorageTypeQuery } = productApi;
