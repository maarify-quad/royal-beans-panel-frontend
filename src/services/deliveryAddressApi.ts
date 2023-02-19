import { emptyApi } from "./emptyApi";

export const deliveryAddressApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    createDeliveryAddress: build.mutation<any, CreateDeliveryAddressParams>({
      query: (body) => ({
        url: "/delivery_addresses",
        method: "POST",
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

export const { useCreateDeliveryAddressMutation, useDeleteDeliveryAddressMutation } =
  deliveryAddressApi;

interface CreateDeliveryAddressParams {
  customerId: string;
  title: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverCity: string;
  receiverProvince: string;
}
