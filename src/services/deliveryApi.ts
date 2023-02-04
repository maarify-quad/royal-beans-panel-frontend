import { emptyApi } from "./emptyApi";

// Interfaces
import { Delivery, CreateDeliveryDetail, DeliveryDetail } from "@interfaces/delivery";

export const deliveryApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getDeliveries: builder.query<GetDeliveriesResponse, GetDeliveriesRequest | void>({
      query: (params) => {
        const url = new URL("/deliveries", import.meta.env.VITE_API_BASE_URL);
        if (params) {
          const { page, limit } = params;
          url.searchParams.append("page", page.toString());
          url.searchParams.append("limit", limit.toString());
        }
        return url.toString();
      },
      providesTags: ["Delivery"],
    }),
    getDeliveryById: builder.query<Delivery, string>({
      query: (id) => `/deliveries/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Delivery" as const, id }],
    }),
    getProductDeliveries: builder.query<GetProductDeliveriesResponse, GetProductDeliveriesRequest>({
      query: (params) => {
        const url = new URL(
          `/deliveries/product/${params.stockCode}`,
          import.meta.env.VITE_API_BASE_URL
        );
        url.searchParams.append("page", params.page.toString());
        url.searchParams.append("limit", params.limit.toString());
        return url.toString();
      },
      providesTags: (result, _error, params) =>
        result
          ? [{ type: "Product" as const, id: `ProductDeliveries_${params.stockCode}` }]
          : ["Product"],
    }),
    getSupplierDeliveries: builder.query<GetDeliveriesResponse, GetSupplierDeliveriesRequest>({
      query: (params) => {
        const url = new URL(`/deliveries/supplier/${params.id}`, import.meta.env.VITE_API_BASE_URL);
        url.searchParams.append("page", params.page.toString());
        url.searchParams.append("limit", params.limit.toString());
        return url.toString();
      },
    }),
    createDelivery: builder.mutation<Delivery, CreateDeliveryPayload>({
      query: (body) => ({
        url: "/deliveries",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Delivery", "Product"],
    }),
  }),
});

export const {
  useGetDeliveriesQuery,
  useGetDeliveryByIdQuery,
  useGetProductDeliveriesQuery,
  useGetSupplierDeliveriesQuery,
  useCreateDeliveryMutation,
} = deliveryApi;

interface GetDeliveriesResponse {
  deliveries: Delivery[];
  totalPages: number;
  totalCount: number;
}

interface GetDeliveriesRequest {
  page: number;
  limit: number;
}

interface GetProductDeliveriesResponse {
  deliveryDetails: DeliveryDetail[];
  totalPages: number;
  totalCount: number;
}

interface GetProductDeliveriesRequest {
  stockCode: string;
  page: number;
  limit: number;
}

interface GetSupplierDeliveriesRequest {
  id: string;
  page: number;
  limit: number;
}

interface CreateDeliveryPayload {
  deliveryDate: Date;
  invoiceDate: Date;
  supplierId: string;
  deliveryDetails: CreateDeliveryDetail[];
}
