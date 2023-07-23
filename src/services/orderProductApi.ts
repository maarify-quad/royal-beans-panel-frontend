import { emptyApi } from "./emptyApi";

// Interfaces
import { OrderProduct } from "@interfaces/orderProduct";

export const orderProductApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderProductsByCustomer: builder.query<
      GetOrderProductsByCustomerResponse,
      GetOrderProductsByCustomerRequest
    >({
      query: (params) => `/order_products/customer/${params.customer}?limit=${params.limit}`,
    }),
    updateOrderProduct: builder.mutation<any, UpdateOrderProductRequest>({
      query: ({ id, quantity }) => ({
        url: `/order_products/${id}`,
        method: "PATCH",
        body: { quantity },
      }),
    }),
    deleteOrderProduct: builder.mutation<any, number>({
      query: (id) => ({
        url: `/order_products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetOrderProductsByCustomerQuery,
  useUpdateOrderProductMutation,
  useDeleteOrderProductMutation,
} = orderProductApi;

interface GetOrderProductsByCustomerRequest {
  customer: string;
  limit: number;
}

interface GetOrderProductsByCustomerResponse {
  orderProducts: OrderProduct[];
}

interface UpdateOrderProductRequest {
  id: number;
  quantity: number;
}
