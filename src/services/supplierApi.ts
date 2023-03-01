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
    getSupplierById: builder.query<Omit<Supplier, "deliveries">, string>({
      query: (id) => `/suppliers/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Supplier", id }],
    }),
    createSupplier: builder.mutation<Supplier, CreateSupplierRequest>({
      query: (params) => ({
        url: "/suppliers",
        method: "POST",
        body: pickBy(params, (value) => value !== ""),
      }),
      invalidatesTags: ["Supplier"],
    }),
    updateSupplier: builder.mutation<Supplier, UpdateSupplierRequest>({
      query: (body) => ({
        url: `/suppliers/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, params) => [{ type: "Supplier", id: params.id }],
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useGetSupplierByIdQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
} = supplierApi;

interface GetSuppliersResponse {
  suppliers: Supplier[];
  totalPages: number;
  totalCount: number;
}

interface GetSuppliersRequest {
  page: number;
  limit: number;
}

interface CreateSupplierRequest {
  name: string;
  address: string | null;
  taxNo: string | null;
  taxOffice: string | null;
  contactName: string | null;
  contactPosition: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
}

interface UpdateSupplierRequest {
  id: string;
  address: string | null;
  taxNo: string | null;
  taxOffice: string | null;
  contactName: string | null;
  contactPosition: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
}
