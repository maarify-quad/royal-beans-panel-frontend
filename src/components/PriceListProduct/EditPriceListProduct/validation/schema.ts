import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1),
  unitPrice: z.number().min(0),
  taxRate: z.number().min(0),
});
