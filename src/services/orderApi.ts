import { emptyApi } from "./emptyApi";

// Interfaces
import { Order, OrderWithAll, OrderWithCustomer } from "@interfaces/order";
import { CreateOrderProductParams } from "@interfaces/orderProduct";

export const orderApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<GetOrdersResponse, number | void>({
      query: (page) => (page ? `/orders?page=${page}` : "/orders"),
      providesTags: ["Order"],
    }),
    getOrderByOrderNumber: builder.query<{ order: OrderWithAll }, number>({
      query: (orderNumber) => `/orders/orderNumber/${orderNumber}`,
      providesTags: (_result, _error, orderNumber) => [{ type: "Order", id: orderNumber }],
    }),
    getOrdersByCustomer: builder.query<GetOrdersResponse, GetOrdersByCustomerParams>({
      query: (params) => `/orders/customer/${params.customer}?page=${params.page}`,
      providesTags: (_result, _error, params) => [{ type: "Order", id: params.customer }],
    }),
    createOrder: builder.mutation<Order, CreateOrderParams>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrder: builder.mutation<Order, UpdateOrderParams>({
      query: (body) => ({
        url: `/orders`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, params) => [{ type: "Order", id: params.orderNumber }],
    }),
    updateOrderProducts: builder.mutation<Order, UpdateOrderProductsParams>({
      query: (body) => ({
        url: `/orders/order_products`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, params) => [{ type: "Order", id: params.orderNumber }],
    }),
    cancelOrder: builder.mutation<any, number>({
      query: (orderNumber) => ({
        url: `/orders/cancel/${orderNumber}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByOrderNumberQuery,
  useGetOrdersByCustomerQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useUpdateOrderProductsMutation,
  useCancelOrderMutation,
} = orderApi;

interface GetOrdersResponse {
  orders: OrderWithCustomer[];
  totalPage?: number;
}

interface GetOrdersByCustomerParams {
  customer: string;
  page: number;
}

interface CreateOrderParams {
  customerId: string;
  deliveryDate: Date;
  specialNote: string;
  deliveryType: string;
  orderProducts: CreateOrderProductParams[];
}

interface UpdateOrderParams extends Partial<Omit<OrderWithAll, "orderProducts">> {
  orderNumber: number;
  orderProducts: CreateOrderProductParams[];
}

interface UpdateOrderProductsParams {
  orderNumber: number;
  orderProducts: CreateOrderProductParams[];
}
