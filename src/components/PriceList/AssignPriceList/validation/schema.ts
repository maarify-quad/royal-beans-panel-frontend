import { z } from "zod";

export const schema = z.object({
  customerId: z.string(),
});
