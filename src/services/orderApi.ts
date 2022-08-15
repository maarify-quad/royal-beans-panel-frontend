import { emptyApi } from "./emptyApi";

// Interfaces
import { Order } from "@interfaces/order";
import { CreateOrderProductParams } from "@interfaces/orderProduct";

export const orderApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<GetOrdersResponse, void>({
      query: () => "/orders",
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation<Order, CreateOrderParams>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation } = orderApi;

interface GetOrdersResponse {
  orders: Order[];
}

interface CreateOrderParams {
  customerId: number;
  deliveryDate: Date;
  specialNote: string;
  deliveryType: string;
  orderProducts: CreateOrderProductParams[];
}
