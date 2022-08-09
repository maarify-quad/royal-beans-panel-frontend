import { emptyApi } from "./emptyApi";

// Interfaces
import { Delivery, CreateDeliveryDetail } from "@interfaces/delivery";

export const deliveryApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDeliveries: builder.query<GetAllDeliveriesResponse, number | void>({
      query: (page) => (page ? `/deliveries?page=${page}` : "/deliveries"),
      providesTags: ["Delivery"],
    }),
    getDeliveryById: builder.query<Delivery, string>({
      query: (id) => `/deliveries/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Delivery", id }],
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

export const { useGetAllDeliveriesQuery, useGetDeliveryByIdQuery, useCreateDeliveryMutation } =
  deliveryApi;

interface GetAllDeliveriesResponse {
  deliveries: Delivery[];
  totalPage?: number;
}

interface CreateDeliveryPayload {
  date: Date;
  supplierId: string;
  deliveryDetails: CreateDeliveryDetail[];
}
