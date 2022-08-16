import { emptyApi } from "./emptyApi";

// Interfaces
import { OrderProduct } from "@interfaces/orderProduct";

export const orderProductApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getLatestOrderProductsByCustomer: builder.query<
      GetLatestOrderProductsByCustomerResponse,
      string
    >({
      query: (customer) => `/order_products/latest/${customer}`,
    }),
  }),
});

export const { useGetLatestOrderProductsByCustomerQuery } = orderProductApi;

interface GetLatestOrderProductsByCustomerResponse {
  orderProducts: OrderProduct[];
}
