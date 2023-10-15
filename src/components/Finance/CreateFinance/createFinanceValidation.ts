import { z } from "zod";

export const createFinanceValidation = z.object({
  month: z.string().min(1, "Ay seçiniz"),
  totalConstantExpense: z.number(),
  marketingExpense: z.number(),
  generalCost: z.number(),
  //   cargoCost: z.number(),
  //   bulkOrderCargoCost: z.number(),
  //   manualOrderCargoCost: z.number(),
  //   shopifyOrderCargoCost: z.number(),
});

export type CreateFinanceValues = z.infer<typeof createFinanceValidation>;
