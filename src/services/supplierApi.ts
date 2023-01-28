import { emptyApi } from "./emptyApi";

// Utils
import pickBy from "lodash/pickBy";

// Interfaces
import { Supplier } from "@interfaces/supplier";

export const supplierApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getSuppliers: builder.query<GetSuppliersResponse, GetSuppliersRequest | void>({
      query: (params) => {
        const url = new URL("/suppliers", import.meta.env.VITE_API_BASE_URL);
        if (params) {
          const { page, limit } = params;
          url.searchParams.append("page", page.toString());
          url.searchParams.append("limit", limit.toString());
        }
        return url.toString();
      },
      providesTags: ["Supplier"],
    }),
    getSupplierById: builder.query<Supplier, string>({
      query: (id) => `/suppliers/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Supplier", id }],
    }),
    createSupplier: builder.mutation<Supplier, CreateSupplierParams>({
      query: (params) => ({
        url: "/suppliers",
        method: "POST",
        body: pickBy(params, (value) => value !== ""),
      }),
      invalidatesTags: ["Supplier"],
    }),
  }),
});

export const { useGetSuppliersQuery, useGetSupplierByIdQuery, useCreateSupplierMutation } =
  supplierApi;

interface GetSuppliersResponse {
  suppliers: Supplier[];
  totalPages: number;
  totalCount: number;
}

interface GetSuppliersRequest {
  page: number;
  limit: number;
}

interface CreateSupplierParams {
  name: string;
  address: string;
  taxNo: string;
  taxOffice: string;
  contactName: string | null;
  contactPosition: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
}
