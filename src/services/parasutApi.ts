import { emptyApi } from "./emptyApi";

export const parasutApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    createParasutSalesInvoice: build.mutation<any, { orderId: string }>({
      query: (body) => ({
        url: `/parasut/sales_invoices/${body.orderId}`,
        method: "POST",
      }),
      invalidatesTags: (result, _error, params) =>
        result ? [{ type: "Order" as const, id: params.orderId }] : [],
    }),
  }),
});

export const { useCreateParasutSalesInvoiceMutation } = parasutApi;
