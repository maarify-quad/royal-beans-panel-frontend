import { emptyApi } from "./emptyApi";

export const financeApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getFinance: builder.mutation<GetFinanceResponse, GetFinancePayload>({
      query: (body) => ({
        url: "/finance",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetFinanceMutation } = financeApi;

type GetFinanceResponse = {
  realProfit: number;
  theoryProfit: number;
  bulkOrdersProfit: number;
  shopifyProfit: number;
  theoryTotalExpense: number;
  totalBusinessExpense: number;
  totalConstantExpense: number;
  marketingExpense: number;
  totalDeliveriesCost: number;
  generalCost: number;
  totalOrderProductsCost: number;
  totalManualOrderProductsCost: number;
  totalShopifyOrderProductsCost: number;
  totalBulkOrderProductsCost: number;
  totalShopifyRevenue: number;
  totalBulkOrdersRevenue: number;
  totalManualOrdersRevenue: number;
  totalStoreSaleRevenue: number;
  totalTrendyolRevenue: number;
  totalHepsiBuradaRevenue: number;
  totalRevenue: number;
};

type GetFinancePayload = {
  month: number;
  totalConstantExpense: number;
  marketingExpense: number;
  generalCost: number;
  cargoCost: number;
  bulkOrderCargoCost: number;
  manualOrderCargoCost: number;
  shopifyOrderCargoCost: number;
};
