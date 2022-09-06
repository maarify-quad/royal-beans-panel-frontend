import { emptyApi } from "./emptyApi";

// Interfaces
import { Roast } from "@interfaces/roast";
import { Product } from "@interfaces/product";

export const roastApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoasts: builder.query<GetAllRoastsResponse, number | void>({
      query: (page) => (page ? `/roasts?page=${page}` : "/roasts"),
      providesTags: ["Roast"],
    }),
    getRoastById: builder.query<GetRoastResponse, string>({
      query: (id) => `/roasts/${id}`,
    }),
    createRoast: builder.mutation<Roast, CreateRoastParams>({
      query: (body) => ({
        url: "/roasts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Roast", "Product"],
    }),
  }),
});

export const { useGetAllRoastsQuery, useGetRoastByIdQuery, useCreateRoastMutation } = roastApi;

export interface GetAllRoastsResponse {
  roasts: Roast[];
  totalPage?: number;
}

export interface GetRoastResponse {
  roast: Roast;
}

export interface CreateRoastParams {
  roastDetails: {
    productId: number;
    inputAmount: number;
    outputAmount: number;
    product: Product;
  }[];
}
