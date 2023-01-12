import { emptyApi } from "./emptyApi";

// Interfaces
import { Order, OrderType } from "@interfaces/order";
import { CreateManualOrderProductParams, CreateOrderProductParams } from "@interfaces/orderProduct";

export const orderApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<GetOrdersResponse, GetordersRequest | void>({
      query: (params) => {
        const url = new URL("/orders", import.meta.env.VITE_API_BASE_URL);
        url.searchParams.set("page", params?.page?.toString() || "1");
        url.searchParams.set("limit", params?.limit?.toString() || "50");
        if (params?.type) {
          url.searchParams.set("type", params.type);
        }
        return url.toString();
      },
      providesTags: ["Order"],
    }),
    getOrderByOrderId: builder.query<{ order: Order }, string>({
      query: (orderId) => `/orders/orderId/${orderId}`,
      providesTags: (_result, _error, orderId) => [{ type: "Order", id: orderId }],
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
    createManualOrder: builder.mutation<Order, CreateManualOrderParams>({
      query: (body) => ({
        url: "/orders/manual",
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
      invalidatesTags: (_result, _error, params) => [{ type: "Order", id: params.orderId }],
    }),
    updateOrderProducts: builder.mutation<Order, UpdateOrderProductsParams>({
      query: (body) => ({
        url: `/orders/order_products`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, params) => [{ type: "Order", id: params.orderId }],
    }),
    updateManualOrderProducts: builder.mutation<Order, UpdateManualOrderProductsParams>({
      query: (body) => ({
        url: `/orders/manual/order_products`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, params) => [{ type: "Order", id: params.orderId }],
    }),
    cancelOrder: builder.mutation<any, string>({
      query: (orderId) => ({
        url: `/orders/cancel/${orderId}`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, orderId) => [{ type: "Order", id: orderId }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByOrderIdQuery,
  useGetOrdersByCustomerQuery,
  useCreateOrderMutation,
  useCreateManualOrderMutation,
  useUpdateOrderMutation,
  useUpdateOrderProductsMutation,
  useUpdateManualOrderProductsMutation,
  useCancelOrderMutation,
} = orderApi;

interface GetordersRequest {
  page: number;
  limit?: number;
  type?: OrderType;
}

interface GetOrdersResponse {
  orders: Order[];
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
  deliveryAddressId: number;
  deliveryType: string;
  orderProducts: CreateOrderProductParams[];
}

interface CreateManualOrderParams {
  receiver: string;
  receiverNeighborhood: string;
  receiverAddress: string;
  receiverCity: string;
  receiverProvince: string;
  receiverPhone: string;
  manualInvoiceStatus: string;
  specialNote: string;
  orderProducts: CreateManualOrderProductParams[];
}

type UpdateOrderParams = Partial<Order> & { orderId: string };

interface UpdateOrderProductsParams {
  orderId: string;
  orderProducts: CreateOrderProductParams[];
}

interface UpdateManualOrderProductsParams {
  orderId: string;
  orderProducts: CreateManualOrderProductParams[];
}
