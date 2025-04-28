import { z } from "zod";

export const schema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  code: z.string().min(1, "Kod zorunludur"),
  finisherCode: z.string().min(1, "Bitiş kodu zorunludur"),
});
