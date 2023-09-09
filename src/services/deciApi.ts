import { emptyApi } from "./emptyApi";

export const deciApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDecis: builder.query<Deci[], void>({
      query: () => "/decis",
      providesTags: (result) => (result ? ["Deci"] : []),
    }),
    createDeci: builder.mutation<Deci, CreateDeciRequest>({
      query: (body) => ({
        url: "/decis",
        method: "POST",
        body,
      }),
      invalidatesTags: (result) => (result ? ["Deci"] : []),
    }),
    updateDeci: builder.mutation<Deci, UpdateDeciRequest>({
      query: ({ id, ...body }) => ({
        url: `/decis/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result) => (result ? ["Deci"] : []),
    }),
  }),
});

export const { useGetAllDecisQuery, useCreateDeciMutation, useUpdateDeciMutation } = deciApi;

export type Deci = {
  id: number;
  value: number;
  price: number;
  createdAt: string;
  updatedAt: string;
};

type CreateDeciRequest = {
  value: number;
  price: number;
};

type UpdateDeciRequest = {
  id: number;
  price: number;
};
