import { z } from "zod";

export const schema = z.object({
  productId: z.number(),
  taxRate: z.number(),
});
