import { emptyApi } from "./emptyApi";

export const deliveryAddressApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    createDeliveryAddress: build.mutation<any, CreateDeliveryAddressRequest>({
      query: (body) => ({
        url: "/delivery_addresses",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, _error, params) =>
        result ? [{ type: "Customer" as const, id: params.customerId }] : ["Customer"],
    }),
    updateDeliveryAddress: build.mutation<any, UpdateDeliveryAddressRequest>({
      query: (body) => ({
        url: `/delivery_addresses/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, _error, params) =>
        result ? [{ type: "Customer" as const, id: params.customerId }] : ["Customer"],
    }),
    deleteDeliveryAddress: build.mutation<any, { id: number; customerId: string }>({
      query: (body) => ({
        url: `/delivery_addresses/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, _error, params) =>
        result ? [{ type: "Customer" as const, id: params.customerId }] : ["Customer"],
    }),
  }),
});

export const {
  useCreateDeliveryAddressMutation,
  useUpdateDeliveryAddressMutation,
  useDeleteDeliveryAddressMutation,
} = deliveryAddressApi;

interface CreateDeliveryAddressRequest {
  customerId: string;
  title: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverCity: string;
  receiverProvince: string;
  isPrimary?: boolean;
}

interface UpdateDeliveryAddressRequest extends Partial<CreateDeliveryAddressRequest> {
  id: number;
  customerId: string;
}
