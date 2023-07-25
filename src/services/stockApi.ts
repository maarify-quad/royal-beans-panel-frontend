import { emptyApi } from "./emptyApi";

export const stockApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    updateDailyStock: builder.mutation<any, void>({
      query: () => ({
        url: "/stock/update-daily-stocks",
        method: "POST",
      }),
    }),
  }),
});

export const { useUpdateDailyStockMutation } = stockApi;
