import { z } from "zod";

export const schema = z.object({
  name: z
    .string({
      required_error: "Fiyat listesi adı zorunludur.",
      invalid_type_error: "Fiyat listesi adı zorunludur.",
    })
    .min(1, "Fiyat listesi adı zorunludur."),
  description: z.string().optional(),
});
