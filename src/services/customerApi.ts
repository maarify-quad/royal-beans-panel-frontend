import { emptyApi } from "./emptyApi";

// Interfaces
import { Customer } from "@interfaces/customer";

export const customerApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<GetCustomersResponse, void>({
      query: () => "/customers",
      providesTags: ["Customer"],
    }),
  }),
});

export const { useGetCustomersQuery } = customerApi;

interface GetCustomersResponse {
  customers: Customer[];
}
