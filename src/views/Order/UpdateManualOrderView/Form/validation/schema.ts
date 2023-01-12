import { z } from "zod";

export const schema = z.object({
  orderProducts: z
    .object({
      productId: z.number({}),
      grindType: z.string({}),
      quantity: z.number({}),
      unitPrice: z.number({}),
      taxRate: z.number({}),
      subTotal: z.number({}),
      total: z.number({}),
    })
    .array()
    .min(1),
});
