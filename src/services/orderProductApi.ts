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
  }),
});

export const { useGetOrderProductsByCustomerQuery } = orderProductApi;

interface GetOrderProductsByCustomerRequest {
  customer: string;
  limit: number;
}

interface GetOrderProductsByCustomerResponse {
  orderProducts: OrderProduct[];
}
