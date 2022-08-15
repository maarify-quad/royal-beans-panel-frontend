import { emptyApi } from "./emptyApi";

// Interfaces
import { Order } from "@interfaces/order";

export const orderApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<GetOrdersResponse, void>({
      query: () => "/orders",
    }),
  }),
});

export const { useGetOrdersQuery } = orderApi;

interface GetOrdersResponse {
  orders: Order[];
}
