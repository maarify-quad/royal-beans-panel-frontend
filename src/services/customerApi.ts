import { emptyApi } from "./emptyApi";

// Utils
import pickBy from "lodash/pickBy";

// Interfaces
import { Customer } from "@interfaces/customer";

export const customerApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<GetCustomersResponse, GetCustomersRequest | void>({
      query: (params) => {
        const url = new URL("/customers", import.meta.env.VITE_API_BASE_URL);
        if (params?.pagination) {
          const { page, limit } = params.pagination;
          url.searchParams.append("page", page.toString());
          url.searchParams.append("limit", limit.toString());
        }
        if (params?.withDeleted) {
          url.searchParams.append("withDeleted", "true");
        }
        return url.toString();
      },
      providesTags: ["Customer"],
    }),
    getCustomerById: builder.query<Customer, string>({
      query: (id) => `/customers/${id}`,
      providesTags: (result, _error, id) => (result ? [{ type: "Customer" as const, id }] : []),
    }),
    createCustomer: builder.mutation<Customer, CreateCustomerParams>({
      query: (body) => ({
        url: "/customers",
        method: "POST",
        body: pickBy(body, (value) => value !== ""),
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation<Customer, UpdateCustomerParams>({
      query: (body) => ({
        url: "/customers",
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, params) =>
        params.priceListId
          ? ["Customer", { type: "PriceList" as const, id: params.priceListId }]
          : [{ type: "Customer" as const, id: params.id }],
    }),
    deleteCustomer: builder.mutation<void, string>({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, _error, id) =>
        result ? [{ type: "Customer" as const }, { type: "Customer" as const, id }] : [],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;

interface GetCustomersResponse {
  customers: Customer[];
  totalPages: number;
  totalCount: number;
}

interface GetCustomersRequest {
  withDeleted?: boolean;
  pagination?: {
    page: number;
    limit: number;
  };
}

interface CreateCustomerParams {
  name: string;
  priceListId?: number;
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

interface UpdateCustomerParams extends Partial<CreateCustomerParams> {
  id: string;
}
