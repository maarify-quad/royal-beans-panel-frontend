import { emptyApi } from "./emptyApi";

// Utils
import pickBy from "lodash/pickBy";

// Interfaces
import { Supplier } from "@interfaces/supplier";

export const supplierApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getSuppliers: builder.query<GetSuppliersResponse, GetSuppliersRequest | void>({
      query: (params) => ({
        url: "/suppliers",
        ...(Object.keys(params?.query || {}).length && {
          params: params?.query,
        }),
      }),
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
  query?: RequestQuery;
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

export interface RequestQuery {
  page?: number;
  limit?: number;
  sortBy?: keyof Supplier;
  sortOrder?: "ASC" | "DESC";
  search?: string;
}
