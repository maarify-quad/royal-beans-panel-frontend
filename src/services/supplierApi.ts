import { emptyApi } from "./emptyApi";

// Utils
import pickBy from "lodash/pickBy";

// Interfaces
import { Supplier } from "@interfaces/supplier";

export const supplierApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSuppliers: builder.query<GetAllSuppliersResponse, number | void>({
      query: (page) => (page ? `/suppliers?page=${page}` : "/suppliers"),
      providesTags: ["Supplier"],
      extraOptions: {
        multipart: true,
      },
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

export const { useGetAllSuppliersQuery, useGetSupplierByIdQuery, useCreateSupplierMutation } =
  supplierApi;

interface GetAllSuppliersResponse {
  suppliers: Supplier[];
  totalPage?: number;
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
