import { emptyApi } from "./emptyApi";

export const financeApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFinances: builder.query<Finance[], void>({
      query: () => "/finance",
      providesTags: (result) => (result ? ["Finance"] : []),
    }),
    calculateFinance: builder.mutation<CalculateFinanceResponse, CalculateFinancePayload>({
      query: (body) => ({
        url: "/finance",
        method: "POST",
        body,
      }),
      invalidatesTags: (result) => (result ? ["Finance"] : []),
    }),
  }),
});

export const { useGetAllFinancesQuery, useCalculateFinanceMutation } = financeApi;

export type Finance = {
  id: number;
  startDate: string;
  endDate: string;
  totalRevenue: number;
  totalCost: number;
  sentCost: number;
  financialStatus: number;
  profitLossRatio: number;
  createdAt: Date;
  updatedAt: Date;
};

type CalculateFinanceResponse = {
  id: number;
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
  bulkOrderBoxCost: number;
  shopifyOrderBoxCost: number;
  manualOrderBoxCost: number;
  totalAdditionalExpense: number;
  totalAdditionalRevenue: number;
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

type CalculateFinancePayload = {
  startDate: string;
  endDate: string;
  totalConstantExpense?: number;
  marketingExpense?: number;
  generalCost?: number;
  // cargoCost: number;
  // bulkOrderCargoCost: number;
  // manualOrderCargoCost: number;
  // shopifyOrderCargoCost: number;
};
