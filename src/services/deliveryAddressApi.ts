import { emptyApi } from "./emptyApi";

export const deliveryAddressApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    createDeliveryAddress: build.mutation<any, CreateDeliveryAddressParams>({
      query: (body) => ({
        url: "/delivery_addresses",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateDeliveryAddressMutation } = deliveryAddressApi;

interface CreateDeliveryAddressParams {
  customerId: string;
  title: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverCity: string;
  receiverProvince: string;
}
