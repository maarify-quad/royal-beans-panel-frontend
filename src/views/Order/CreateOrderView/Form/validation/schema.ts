import { z } from "zod";

export const schema = z.object({
  customerId: z.string({}),
  deliveryDate: z.date({}),
  specialNote: z.string({}).optional(),
  deliveryAddressId: z.number({}),
  deliveryType: z.string({}),
  orderProducts: z
    .object({
      priceListProductId: z.number({}),
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
