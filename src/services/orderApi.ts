import { emptyApi } from "./emptyApi";

// Interfaces
import { Order, OrderType } from "@interfaces/order";
import { CreateManualOrderProductParams, CreateOrderProductParams } from "@interfaces/orderProduct";

export const orderApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<GetOrdersResponse, GetOrdersRequest | void>({
      query: (params) => ({
        url: `/orders${params?.type ? `?type=${params.type}` : ""}`,
        ...(Object.keys(params?.query || {}).length && {
          params: params?.query,
        }),
      }),
      providesTags: ["Order"],
    }),
    getOrderByOrderId: builder.query<{ order: Order }, string>({
      query: (orderId) => `/orders/orderId/${orderId}`,
      providesTags: (_result, _error, orderId) => [{ type: "Order", id: orderId }],
    }),
    getOrdersByCustomer: builder.query<GetOrdersResponse, GetOrdersByCustomerParams>({
      query: (params) => ({
        url: `/orders/customer/${params.customer}`,
        ...(Object.keys(params?.query || {}).length && {
          params: params?.query,
        }),
      }),
      providesTags: (_result, _error, params) => [{ type: "Order", id: params.customer }],
    }),
    createOrder: builder.mutation<Order, CreateOrderRequest>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    createManualOrder: builder.mutation<Order, CreateManualOrderRequest>({
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
    getOrdersExcelExport: builder.mutation<
      { success: true; url: string },
      GetOrdersExcelExportParams
    >({
      query: (body) => ({
        url: `/orders/excel-export`,
        method: "POST",
        body,
      }),
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
  useGetOrdersExcelExportMutation,
} = orderApi;

interface GetOrdersRequest {
  type?: OrderType;
  query: RequestQuery;
}

interface GetOrdersResponse {
  orders: Order[];
  totalPages: number;
  totalCount: number;
}

interface GetOrdersByCustomerParams {
  customer: string;
  query: RequestQuery;
}

interface CreateOrderRequest {
  customerId: string;
  deliveryDate: Date;
  specialNote: string;
  deliveryAddressId: number;
  deliveryType: string;
  orderProducts: CreateOrderProductParams[];
}

interface CreateManualOrderRequest {
  receiver: string;
  receiverNeighborhood: string | null;
  receiverAddress: string | null;
  receiverCity: string | null;
  receiverProvince: string | null;
  receiverPhone: string | null;
  manualInvoiceStatus: string;
  specialNote: string | null;
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

interface GetOrdersExcelExportParams {
  startDate: string | null;
  endDate: string | null;
}

export interface RequestQuery {
  page?: number;
  limit?: number;
  sortBy?: keyof Order;
  sortOrder?: "ASC" | "DESC";
}
