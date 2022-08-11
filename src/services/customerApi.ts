import { emptyApi } from "./emptyApi";

// Utils
import pickBy from "lodash/pickBy";

// Interfaces
import { Customer } from "@interfaces/customer";

export const customerApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<GetCustomersResponse, void>({
      query: () => "/customers",
      providesTags: ["Customer"],
    }),
    createCustomer: builder.mutation<Customer, CreateCustomerParams>({
      query: (body) => ({
        url: "/customers",
        method: "POST",
        body: pickBy(body, (value) => value !== ""),
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const { useGetCustomersQuery, useCreateCustomerMutation } = customerApi;

interface GetCustomersResponse {
  customers: Customer[];
}

interface CreateCustomerParams {
  name: string;
  companyTitle?: string;
  contactName?: string;
  contactTitle?: string;
  secondContactName?: string;
  secondContactTitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  province?: string;
  city?: string;
  cargoAddress?: string;
  cargoProvince?: string;
  cargoCity?: string;
  taxOffice?: string;
  taxNo?: string;
  startBalance?: number;
  commercialPrinciple?: string;
  comment?: string;
  specialNote?: string;
}
