import { z } from "zod";

export const createDeciSchema = z.object({
  value: z.number({
    required_error: "Desi değeri boş bırakılamaz",
    invalid_type_error: "Desi değeri sayı olmalıdır",
  }),
  price: z.number({
    required_error: "Fiyat boş bırakılamaz",
    invalid_type_error: "Fiyat sayı olmalıdır",
  }),
});

export type CreateDeciValues = z.infer<typeof createDeciSchema>;
