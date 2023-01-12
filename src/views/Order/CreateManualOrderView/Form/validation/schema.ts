import { z } from "zod";

export const schema = z.object({
  receiver: z.string({}),
  receiverNeighborhood: z.string({}),
  receiverAddress: z.string({}),
  receiverCity: z.string({}),
  receiverProvince: z.string({}),
  receiverPhone: z.string({}),
  specialNote: z.string({}).optional(),
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
